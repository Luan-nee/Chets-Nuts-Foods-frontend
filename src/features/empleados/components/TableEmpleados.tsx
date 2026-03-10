// importación de componentes UI
import { Edit2, Eye } from "lucide-react";
import Table from "../../../components/ui/Table";
import Loading from "../../../components/ui/Loading";
// importación de custom hooks
import { useFetchEmpleados } from "../hooks/useFetchEmpleados";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";

interface PropTableEmpleados {
  setShowDetallesEmpleado: (p: boolean) => void;
  setSelectEmpleadoId: (p: number | null) => void;
  setShowFormUpdate: (p: boolean) => void;
}

export default function TableEmpleados({
  setShowDetallesEmpleado,
  setSelectEmpleadoId,
  setShowFormUpdate
}: PropTableEmpleados) {
  const {
    data: empleados,
    isLoading,
    isError,
    fetchData: recargarEmpleados,
    setPagina,
    infoPaginacion,
  } = useFetchEmpleados();

  const tableHeader: string[] = [
    "ID",
    "Nombres y Apellidos",
    "Rol",
    "Acciones",
  ];

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
        <p className="text-red-500">Error al cargar los empleados.</p>
        {/* agrega un botón para reintentar la carga */}
        <button
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={() => recargarEmpleados(1)}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (empleados === null || empleados.length === 0) {
    return <div>No hay empleados disponibles.</div>;
  }

  return (
    <div className="flex-1 overflow-auto px-8 py-6">
      <div className="p-4 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => recargarEmpleados(infoPaginacion.pagina_actual)}
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
        {empleados?.map((empleado, index) => (
          <tr
            key={index}
            className="hover:bg-gray-800/50 transition-colors"
          >
            {/* ID */}
            <td className="px-6 py-4">
              <span className="text-sm text-gray-400">{empleado.id}</span>
            </td>

            {/* Name with Avatar */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-sm font-bold text-white">
                    {empleado.nombres?.charAt(0) +
                      empleado.apellidos?.charAt(0)}
                  </span>
                </div>
                <span className="font-medium text-sm text-white">
                  {empleado.nombres} {empleado.apellidos}
                </span>
              </div>
            </td>

            {/* Role */}
            <td className="px-6 py-4">
              <span className="text-sm text-gray-300">{empleado.rol}</span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectEmpleadoId(empleado.id);
                    setShowFormUpdate(true);
                  }}
                  className="p-2 hover:bg-[#21262d] rounded-lg transition-colors"
                  aria-label="Editar empleado"
                >
                  <Edit2 className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => {
                    setShowDetallesEmpleado(true);
                    setSelectEmpleadoId(empleado.id);
                  }}
                  className="p-2 hover:bg-[#21262d] rounded-lg transition-colors"
                  aria-label="Ver detalles"
                >
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
