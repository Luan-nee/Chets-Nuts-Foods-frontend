// importación de componentes UI
import { Edit, Eye, Plus } from 'lucide-react';
import Table from '../../../components/ui/Table';
import Loading from '../../../components/ui/Loading';
// importación de custom hooks
import { useFetchGuiasRemision } from '../hooks/useFetchGuiasRemision';
import { useAutorizacion } from '../../../config/useAutorizacion';
import ButtonsPagination from '../../../components/ui/ButtonsPagination';

interface PropTableGre {
  setShowDetallesGre: (p: boolean) => void;
  setShowFormCreateGre: (p: boolean) => void;
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

export default function TableGre({ setShowDetallesGre, setShowFormCreateGre, setSelectGreId }: PropTableGre) {
  const { data: guiasRemision, isLoading, isError, fetchData: recargarGuiasRemision, setPagina, infoPaginacion } = useFetchGuiasRemision();
  const { tienePermiso } = useAutorizacion();
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
        <button className="ml-4 px-4 py-2 bg-red-600 text-white rounded" onClick={() => recargarGuiasRemision(0)}>
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
      <div className="p-4 flex justify-end gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => recargarGuiasRemision(infoPaginacion.pagina_actual)}>
          Recargar
        </button>
        { tienePermiso('PUEDE_CREAR_GUIA_DE_REMISION') && (
          <button onClick={() => setShowFormCreateGre(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded font-medium transition-colors">
              <Plus className="w-5 h-5" />
              Nueva Guía
          </button>
        )}
      </div>

      <ButtonsPagination total_paginas={infoPaginacion.total_paginas} pivote={infoPaginacion.pagina_actual} fetchData={setPagina}/>

      <Table tableHeader={tableHeader}>
        {guiasRemision?.map((guia, index) => (
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
                {tienePermiso('PUEDE_VER_DETALLES_DE_LA_GUIA_DE_REMISION') && (
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors" title="Ver" onClick={() => { setShowDetallesGre(true); setSelectGreId(guia.id); }}>
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                )}
                {tienePermiso('PUEDE_EDITAR_GUIA_DE_REMISION') && (
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors" title="Editar">
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
}
