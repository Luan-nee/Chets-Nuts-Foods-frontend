import Table from "../../../components/ui/Table";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";
import { useFetchClientes } from "../hooks/useFetchClientes";

interface TableClientesProps {
  setSelectedClienteId: (id: number) => void;
}

export default function TableClientes({
  setSelectedClienteId,
}: TableClientesProps) {
  const {
    clientes,
    isLoading: clientesLoading,
    isError: clientesError,
    execute: fetchClientes,
    infoPaginacion: pageClientes,
    setPagina: setPageClientes,
  } = useFetchClientes();

  const tableHeader: string[] = [
    "Nr.",
    "Nombres",
    "Apellido Paterno",
    "Apellido Materno",
    "DNI",
    "Número teléfono",
    "ruc",
    "Acciones",
  ];

  return (
    <ContentSectionProcess
      isLoading={clientesLoading}
      isError={clientesError}
      textError="Error al cargar los clientes."
      textButtonError="Reintentar"
      fetchData={() => fetchClientes}
    >
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
          fetchData={setPageClientes}
          datos_por_pagina={pageClientes.datos_por_pagina}
          total_data={pageClientes.total_data}
        />

        <Table tableHeader={tableHeader}>
          {clientes?.map((cliente, index) => (
            <tr key={index} className="hover:bg-gray-800/50 transition-colors">
              {/* NUMERO */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-400">{index}</span>
              </td>

              {/* Nombres */}
              <td className="px-6 py-4">
                <span className="font-medium text-sm text-white">
                  {cliente.nombres}
                </span>
              </td>

              {/* Apellido paterno */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">
                  {cliente.apellidopaterno}
                </span>
              </td>

              {/* Apellido materno */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">
                  {cliente.apellidomaterno}
                </span>
              </td>

              {/* DNI */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">
                  {cliente.dniuser}
                </span>
              </td>

              {/* Numero telefónico */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">
                  {cliente.numero}
                </span>
              </td>

              {/* RUC */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">
                  {cliente.rucuser ? cliente.rucuser : "Sin ruc"}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedClienteId(cliente.iduser);
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
    </ContentSectionProcess>
  );
}
