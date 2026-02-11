// importación de componentes UI
import { Edit, Eye } from 'lucide-react';
import Table from '../../../components/ui/Table';
import Loading from '../../../components/ui/Loading';
// importación de custom hooks
import { useFetchGuiasRemision } from '../hooks/useFetchGuiasRemision';
// importación de tipos
import type { simpleGreType } from '../../../types/gre.type';
import type { User } from '../../../types/usuario.type';

interface PropTableGre {
  rolUser: User | null;
  setShowDetallesGre: (p: boolean) => void;
  setSelectGreId: (p: number | null) => void;
}

type ColorsEstadoType = {
  entregado: string;
  'en tránsito': string;
  pendiente: string;
}

const colorsEstado: ColorsEstadoType = {
  entregado: 'bg-green-600',
  'en tránsito': 'bg-blue-500',
  pendiente: 'bg-yellow-500',
}

export default function TableGre({ rolUser, setShowDetallesGre, setSelectGreId }: PropTableGre) {
  const { data: guiasRemision, isLoading, isError, fetchData: recargarGuiasRemision } = useFetchGuiasRemision();

  const tableHeader: string[] = [
    'Nº Guía',
    'Fecha Emisión',
    'Cliente / Destinatario',
    'Punto de Partida / Llegada',
    'Estado',
    'Acciones'
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
        <p className="text-red-500">Error al cargar las guías de remisión.</p>
        {/* agrega un botón para reintentar la carga */}
        <button className="ml-4 px-4 py-2 bg-red-600 text-white rounded" onClick={recargarGuiasRemision}>
          Reintentar
        </button>
      </div>
    );
  }

  if (guiasRemision===null || guiasRemision.length === 0) {
    return <div>No hay guías de remisión disponibles.</div>;
  }

  return (
    <>
      <div className="p-4 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={recargarGuiasRemision}>
          Recargar
        </button>
      </div>
      <Table tableHeader={tableHeader}>
        {guiasRemision?.map((guia, index) => (
          <RowTable key={index} guia={guia} index={index} setShowDetallesGre={setShowDetallesGre} setSelectGreId={setSelectGreId} rolUser={rolUser} />
        ))}
      </Table>
    </>
  );
}

interface PropTable {
  guia: simpleGreType;
  index: number;
  setShowDetallesGre: (p: boolean) => void;
  setSelectGreId: (p: number | null) => void;
  rolUser: User | null;
}

function RowTable({guia, index, setShowDetallesGre, setSelectGreId, rolUser}: PropTable) {
  return (
    <tr key={index} className="hover:bg-gray-800/50 transition-colors">
      <td className="px-6 py-4">
        <span className="text-blue-400 font-medium">{guia.numero}</span>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <div className="text-gray-300">{guia.fecha_emision}</div>
          <div className="text-gray-500">{guia.hora}</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <div className="text-gray-300 font-medium">{guia.destinatario.nombre_razonSocial}</div>
          <div className="text-gray-500">{guia.destinatario.tipo_documento}: {guia.destinatario.numero_documento}</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{guia.punto_de_partida}</span>
          <span>→</span>
          <span>{guia.punto_de_llegada}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold 
          ${colorsEstado[guia.estado]} text-white`}>
          {guia.estado}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {
            (rolUser?.role === 'administrador') ? (
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors" title="Ver" onClick={() => { setShowDetallesGre(true); setSelectGreId(guia.id); }}>
                <Eye className="w-4 h-4 text-gray-400" />
              </button>
            ) : rolUser?.role === 'trabajador' ? (
              <>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors" title="Ver" onClick={() => { setShowDetallesGre(true); setSelectGreId(guia.id); }}>
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors" title="Editar">
                  <Edit className="w-4 h-4 text-gray-400" />
                </button>
              </>
            ) : null
          }
        </div>
      </td>
    </tr>
  );
}