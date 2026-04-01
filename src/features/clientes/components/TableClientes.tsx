import { useFetchClientes } from "../hooks/useFetchClientes";
import Loading from "../../../components/ui/Loading";
import Table from "../../../components/ui/Table";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";

interface TableClientesProps {
  setSelectedClienteId: (id: number) => void;
}

export default function TableClientes({ setSelectedClienteId }: TableClientesProps) {
  const { data: clientes, isLoading: clientesLoading, isError: clientesError, fetchData: fetchClientes, infoPaginacion: pageClientes } = useFetchClientes();

  const tableHeader: string[] = [
    "Nr.",
    "Tipo Documento",
    "Número Documento",
    "Nombre/Razón Social",
    "Acciones",
  ];

  if (clientesLoading) {
    // has uso del componente de carga Loading.tsx
    return (
      <div className="flex justify-center items-center py-10">
        <Loading w={6} h={6} color="blue" />
      </div>
    );
  }

  if (clientesError) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500">Error al cargar los clientes.</p>
        {/* agrega un botón para reintentar la carga */}
        <button
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={() => fetchClientes(1)}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (clientes === null || clientes.length === 0) {
    return <div>No hay clientes disponibles.</div>;
  }

  return (
    <div className="flex-1 overflow-auto p-2">
      <div className="p-4 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => fetchClientes(pageClientes.pagina_actual)}
        >
          Recargar
        </button>
      </div>

      <ButtonsPagination 
        total_paginas={pageClientes.total_paginas} 
        pivote={pageClientes.pagina_actual} 
        fetchData={fetchClientes} 
        datos_por_pagina={pageClientes.datos_por_pagina} 
        total_data={pageClientes.total_data} 
      />

      <Table tableHeader={tableHeader}>
        {clientes?.map((cliente, index) => (
          <tr
            key={index}
            className="hover:bg-gray-800/50 transition-colors"
          >
            {/* NUMERO */}
            <td className="px-6 py-4">
              <span className="text-sm text-gray-400">{index}</span>
            </td>

            {/* Tipo Documento */}
            <td className="px-6 py-4">
              <span className="font-medium text-sm text-white">
                {cliente.tipoDocumento}
              </span>
            </td>

            {/* Numero Documento */}
            <td className="px-6 py-4">
              <span className="text-sm text-gray-300">{cliente.numeroDocumento}</span>
            </td>

            {/* Nombre/Razón Social */}
            <td className="px-6 py-4">
              <span className="text-sm text-gray-300">{cliente.nombre_razonSocial}</span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedClienteId(cliente.id);
                    console.log("Cliente seleccionado ID:", cliente.id);
                  }}
                  className="p-2 bg-blue-600 text-white rounded"
                >
                  <p>Seleccionar</p>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}