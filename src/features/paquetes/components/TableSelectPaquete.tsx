import { useState } from 'react';
import { CalendarDays, Plus } from 'lucide-react';
import Table from '../../../components/ui/Table';
import ContentSectionProcess from '../../../components/layouts/ContentSectionProcess';
import { useFetchPaquetes } from '../hooks/useFetchPaquetes';

function formatFechacreado(fecha: string): string {
  const date = new Date(fecha);

  if (Number.isNaN(date.getTime())) {
    return fecha;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

interface TableSelectPaqueteProps {
  idSalidaTransporte: number;
  SelectIdPaquete: (idPaquete: number | null) => void;
}

export default function TableSelectPaquete({
  idSalidaTransporte,
  SelectIdPaquete,
}: TableSelectPaqueteProps) {
  const [idSelected, setIdSelected] = useState<number | null>(null);
  const tableHeader = [
    'N°',
    'Destino',
    'Monto cobrado',
    'Estado',
    'Fecha creado',
    'Cantidad productos',
    'Acción',
  ];

  const {
    paquetes,
    isLoading: isLoadingPaquetes,
    isError: isErrorPaquetes,
    execute: obtenerPaquetes,
  } = useFetchPaquetes(idSalidaTransporte);

  return (
    <ContentSectionProcess
      isLoading={isLoadingPaquetes}
      isError={isErrorPaquetes}
      textError="Error al cargar los paquetes"
      textButtonError="Reintentar"
      fetchData={() => obtenerPaquetes(idSalidaTransporte)}
    >
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium text-white">
            Selecciona un paquete
          </h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => obtenerPaquetes(idSalidaTransporte)}
          >
            Recargar
          </button>
        </div>

        <Table tableHeader={tableHeader} cantidadDatos={paquetes.length}>
          {paquetes.map((paquete, index) => (
            <tr
              key={paquete.idpaquete}
              className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
            >
              <td className="px-6 py-4">
                <span className="font-medium text-sm text-white">
                  {index + 1}
                </span>
              </td>

              <td className="px-6 py-4">
                <span className="font-medium text-sm text-white text-ellipsis overflow-hidden whitespace-nowrap">
                  {paquete.destino}
                </span>
              </td>

              <td className="px-6 py-4 text-center">
                <span className="text-sm text-gray-300">
                  {paquete.montocobrado}
                </span>
              </td>

              <td className="px-6 py-4">
                <span className="inline-flex rounded-full bg-[#1f6feb]/15 px-3 py-1 text-xs font-medium text-[#58a6ff] text-center">
                  {paquete.estadopaquete}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  <span>{formatFechacreado(paquete.fechacreado)}</span>
                </div>
              </td>

              <td className="px-6 py-4 text-center">
                <span className="inline-flex rounded-full bg-[#1f6feb]/15 px-3 py-1 text-xs font-medium text-[#58a6ff] text-center">
                  {paquete.cantidadProductos}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  {idSelected === paquete.idpaquete ? (
                    <button
                      onClick={() => {
                        setIdSelected(null);
                        SelectIdPaquete(null);
                      }}
                      className="hover:text-red-400"
                    >
                      <span className="text-red-500 flex flex-row gap-2">
                        <span>Eliminar</span>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        SelectIdPaquete(paquete.idpaquete);
                        setIdSelected(paquete.idpaquete);
                      }}
                      className="text-green-500 hover:text-green-400 flex flex-row gap-2"
                    >
                      <span>Seleccionar</span>
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </ContentSectionProcess>
  );
}