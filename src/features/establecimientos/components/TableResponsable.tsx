import Table from "../../../components/ui/Table";
import Loading from "../../../components/ui/Loading";
import { useFetchResponsableEstablecimiento } from "../hooks/useFetchResponsableEstablecimiento";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";

interface PropTableResponsable {
  setIdResponsable: (id: number) => void;
  selectedId: number | null;
}

export default function TableResponsable ({ setIdResponsable, selectedId }: PropTableResponsable) {
  const { data: responsables, isLoading, isError, setPagina, fetchData, infoPaginacion } = useFetchResponsableEstablecimiento();

  if (isLoading) {
    // has uso del componente de carga Loading.tsx
    return (
      <div className="flex justify-center items-center py-10">
        <Loading w={6} h={6} color="blue" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500">Error al cargar los responsables de establecimientos.</p>
        {/* agrega un botón para reintentar la carga */}
        <button
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={() => fetchData(1)}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (responsables === null || responsables.length === 0) {
    return <div>No hay empleados disponibles para ser responsable de un establecimiento.</div>;
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex justify-between">        
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Seleccione un responsable para el establecimiento.
        </label>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => fetchData(infoPaginacion.pagina_actual)}
        >
          Recargar
        </button>
      </div>

      <div className="border border-gray-500 rounded-md mt-2 px-2">
        <div className="border-gray-300 rounded-lg overflow-hidden mt-4">
          <Table tableHeader={[
            "Nombre",
            "Apellido Paterno",
            "Apellido Materno",
            "DNI",
            "Seleccionado"
          ]}>
            {responsables?.map((responsable, index) => (
              <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-blue-400">
                    {responsable.nombres}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white font-medium">
                    {responsable.apellidoPaterno}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white">
                    {responsable.apellidoMaterno}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white">
                    {responsable.dni}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <label className="flex justify-center">
                    <input
                      type="radio"
                      name="responsable-seleccionado"
                      className="h-4 w-4 cursor-pointer accent-blue-600"
                      checked={selectedId === responsable.id}
                      onChange={() => setIdResponsable(responsable.id)}
                    />
                  </label>
                </td>
              </tr>
            ))}
          </Table>
        </div>

        <ButtonsPagination 
          total_paginas={infoPaginacion.total_paginas} 
          pivote={infoPaginacion.pagina_actual} 
          fetchData={setPagina} 
          datos_por_pagina={infoPaginacion.datos_por_pagina} 
          total_data={infoPaginacion.total_data} 
        />
      </div>
    </div>
  );
}