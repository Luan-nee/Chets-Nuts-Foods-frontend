import { Edit } from "lucide-react";

import { useFetchEstablecimientos } from "../hooks/useFetchEstablecimientos";
// importación de tipos
import Loading from "../../../components/ui/Loading";
import Table from "../../../components/ui/Table";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";

interface PropTableEstablecimientos {
  setSelectEstablecimientoId: (p: number | null) => void;
  showFormEdit: (p: boolean) => void;
}

export default function TableEstablecimientos({
  setSelectEstablecimientoId,
  showFormEdit,
}: PropTableEstablecimientos) {
  const tableHeader: string[] = [
    "Nombre",
    "Dirección",
    "Departamento",
    "Provincia",
    "Distrito",
    "Acciones",
  ];
  const {
    data: establecimientos,
    isLoading,
    isError,
    fetchData: recargarEstablecimientos,
    setPagina,
    infoPaginacion
  } = useFetchEstablecimientos();

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
        <p className="text-red-500">Error al cargar los establecimientos.</p>
        {/* agrega un botón para reintentar la carga */}
        <button
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={() => recargarEstablecimientos(1)}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (establecimientos === null || establecimientos.length === 0) {
    return <div>No hay establecimientos disponibles.</div>;
  }

  return (
    <div className="flex-1 overflow-auto px-8 py-6">
      <div className="p-4 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => recargarEstablecimientos(infoPaginacion.pagina_actual)}
        >
          Recargar
        </button>
      </div>

      <ButtonsPagination 
        total_paginas={infoPaginacion.total_paginas} 
        pivote={infoPaginacion.pagina_actual} 
        fetchData={setPagina} 
        datos_por_pagina={infoPaginacion.datos_por_pagina} 
        total_data={infoPaginacion.total_data} 
      />

      <Table tableHeader={tableHeader}>
        {establecimientos?.map((establecimiento, index) => (
          <tr key={index} className="hover:bg-gray-800/50 transition-colors">
            <td className="px-6 py-4">
              <span className="text-blue-400">
                {establecimiento.nombreEst}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className="text-white font-medium">
                {establecimiento.direccion}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className="text-white">
                {establecimiento.departamento}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className="text-white">
                {establecimiento.provincia}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className="text-white">
                {establecimiento.distrito}
              </span>
            </td>
            <td className="px-6 py-4">
              <button
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                title="Editar"
                onClick={() => {
                  setSelectEstablecimientoId(establecimiento.idEst);
                  showFormEdit(true);
                }}
              >
                <Edit className="w-4 h-4 text-gray-400" />
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}