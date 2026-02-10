// importación de componentes UI
import { Edit2, Eye } from 'lucide-react';
import Table from '../../../components/ui/Table';
import Loading from '../../../components/ui/Loading';
// importación de custom hooks
import { useFetchEmpleados } from '../hooks/useFetchEmpleados';
// importación de tipos
import type { empleado } from '../../../types/empleado.type';

interface PropTableEmpleados {
  setShowDetallesEmpleado: (p: boolean) => void;
  setSelectEmpleadoId: (p: number | null) => void;
}

export default function TableEmpleados({ setShowDetallesEmpleado, setSelectEmpleadoId }: PropTableEmpleados) {
  const { data: empleados, isLoading, isError, fetchData: recargarEmpleados } = useFetchEmpleados();

  const tableHeader: string[] = [
    'ID',
    'Nombres y Apellidos',
    'Rol',
    'Acciones',
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
        <button className="ml-4 px-4 py-2 bg-red-600 text-white rounded" onClick={recargarEmpleados}>
          Reintentar
        </button>
      </div>
    );
  }

  if (empleados===null || empleados.length === 0) {
    return <div>No hay empleados disponibles.</div>;
  }

  return (
    <>
      <div className="p-4 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={recargarEmpleados}>
          Recargar
        </button>
      </div>
      <Table tableHeader={tableHeader}>
        {empleados?.map((empleado, index) => (
          <RowTable key={index} empleado={empleado} index={index} setShowDetallesEmpleado={setShowDetallesEmpleado} setSelectEmpleadoId={setSelectEmpleadoId} />
        ))}
      </Table>
    </>
  );
}

interface PropTable {
  empleado: empleado;
  index: number;
  setShowDetallesEmpleado: (p: boolean) => void;
  setSelectEmpleadoId: (p: number | null) => void;
}

function RowTable({empleado, index, setShowDetallesEmpleado, setSelectEmpleadoId}: PropTable) {
  return (
    <tr
      key={index}
      className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
    >
      {/* ID */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-400">{empleado.id}</span>
      </td>

      {/* Name with Avatar */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0`}>
            <span className="text-sm font-bold text-white">{
              empleado.nombres?.charAt(0) + empleado.apellidos?.charAt(0)
            }</span>
          </div>
          <span className="font-medium text-sm text-white">{empleado.nombres} {empleado.apellidos}</span>
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
          }}
          className="p-2 hover:bg-[#21262d] rounded-lg transition-colors" aria-label="Editar empleado">
            <Edit2 className="w-4 h-4 text-gray-400" />
          </button>
          <button 
          onClick={()=>{
            setShowDetallesEmpleado(true);
            setSelectEmpleadoId(empleado.id);
          }}
          className="p-2 hover:bg-[#21262d] rounded-lg transition-colors" aria-label="Ver detalles">
            <Eye className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </td>
    </tr>
  );
}