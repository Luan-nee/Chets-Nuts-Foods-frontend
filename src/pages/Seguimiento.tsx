import { useState } from "react";
import { Calendar, CalendarDays, CheckCircle, Hash, Plus } from "lucide-react";
import ContentPageMain from "../components/layouts/ContentPageMain";
import Table from "../components/ui/table/Table";
import TableSelectSalidaTransporte from "../features/transporte/components/TableSelectSalidaTransporte";
import ContentSectionProcess from "../components/layouts/ContentSectionProcess";
import { useFetchSeguimientoSalidaTransporte } from "../features/seguimiento/hooks/useFetchSeguimientoSalidaTransporte";
import { useFetchSalidaTransportes } from "../features/transporte/hooks/useFechSalidasTransporte";

const formatFechaSalida = (fechaSalida: string) => {
  const fecha = new Date(fechaSalida);
  if (Number.isNaN(fecha.getTime())) {
    return fechaSalida;
  }
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(fecha);
};

export default function Seguimiento() {
  const [selectedSalidaTransporte, setSelectedSalidaTransporte] = useState<
    number | null
  >(null);
  const [idSelected, setIdSelected] = useState<number | null>(null);

  const {
    infoSeguimiento,
    isLoading: isLoadingInfoSeguimiento,
    isError: isErrorInfoSeguimiento,
    execute: realizarSeguimientoSalidaTransporte,
  } = useFetchSeguimientoSalidaTransporte();

  const {
    salidaTransportes,
    isLoading: isLoadingSalidaTransportes,
    isError: isErrorSalidaTransportes,
    execute: obtenerSalidaTransportes,
    setPagina: setPaginaSalidaTransportes,
    infoPaginacion: infoPaginacionSalidaTransportes,
  } = useFetchSalidaTransportes();

  const currentEventIndex = 0;

  return (
    <ContentPageMain>
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            Consulta de seguimiento
          </h2>
          <p className="text-sm text-gray-400 text-center">
            Rastrea tu mercancía en tiempo real con el número de Guía de
            Remisión.
          </p>
        </div>
      </div>
      
      {/* Tabla */}
      <div className="p-4">
        <Table
          cantidadDatos={salidaTransportes.length}
          dataIsError={isErrorSalidaTransportes}
          dataIsLoading={isLoadingSalidaTransportes}
          reload={obtenerSalidaTransportes}
          tableHeader={[
            "ID Salida", 
            "Estado", 
            "Fecha de salida",
            ""
          ]}
          changePage={setPaginaSalidaTransportes}
          dataPagination={infoPaginacionSalidaTransportes}
        >
          {salidaTransportes.map((salidaTransporte, index) => (
            <tr
              key={index}
              className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
            >
              {/* ID */}
              <td className="px-6 py-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-[#1f6feb]/15 p-2">
                    <Hash className="w-5 h-5 text-[#1f6feb]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-medium text-sm text-white truncate">
                      Salida #{salidaTransporte.idsalidatransporte}
                    </span>
                    <span className="block text-xs text-gray-400 truncate">
                      Registro de transporte
                    </span>
                  </div>
                </div>
              </td>

              {/* Estado */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="inline-flex rounded-full bg-[#1f6feb]/15 px-3 py-1 text-xs font-medium text-[#58a6ff]">
                    {salidaTransporte.estadotransporte}
                  </span>
                </div>
              </td>

              {/* Fecha */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  <span>{formatFechaSalida(salidaTransporte.fechasalida)}</span>
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setIdSelected(salidaTransporte.idsalidatransporte);
                    }}
                    className="text-green-500 hover:text-green-400 flex flex-row gap-2"
                  >
                    <span>Seleccionar</span>
                    <Plus className="w-5 h-5" />
                  </button>
                  
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
      
      {/* Seguimiento */}
      <div className="flex flex-col p-6">
        <button
          onClick={() => {
            realizarSeguimientoSalidaTransporte(
              selectedSalidaTransporte as number,
            );
          }}
          className="px-8 py-4 my-4 bg-[#1f6feb] hover:bg-[#1a5cd9] rounded-lg transition-colors font-bold flex justify-center gap-2"
        >
          Consultar
        </button>
        <ContentSectionProcess
          fetchData={() =>
            realizarSeguimientoSalidaTransporte(
              selectedSalidaTransporte as number,
            )
          }
          isError={isErrorInfoSeguimiento}
          isLoading={isLoadingInfoSeguimiento}
          textButtonError="Reintentar"
          textError="No se pudo obtener la información de seguimiento. Por favor, inténtalo de nuevo."
        >
          {/* Timeline */}
          <div className="mb-6">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#30363d]"></div>

              {/* Active Progress Line */}
              <div
                className="absolute left-6 top-0 w-0.5 bg-[#1f6feb] transition-all duration-500"
                style={{ height: `${100}%` }}
              ></div>

              {/* Events */}
              <div className="space-y-0">
                {infoSeguimiento.length === 0 && !isLoadingInfoSeguimiento ? (
                  <div className="text-center text-gray-400 py-8">
                    Aún no hay información de seguimiento disponible para la
                    guía seleccionada.
                  </div>
                ) : (
                  infoSeguimiento.map((event, index) => {
                    const isCurrent = index === currentEventIndex;
                    return (
                      <div key={index} className="relative">
                        {/* Event Item */}
                        <div className={`flex gap-6 pb-8`}>
                          {/* Icon */}
                          <div className="relative flex-shrink-0">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all bg-[#1f6feb] border-[#1f6feb]`}
                            >
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                          </div>

                          {/* Content */}
                          <div
                            className={`flex-1 ${
                              isCurrent
                                ? "bg-[#1f6feb]/10 border border-[#1f6feb]/30 rounded-lg p-5"
                                : "pt-2"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4
                                  className={`font-bold mb-1 ${isCurrent ? "text-[#1f6feb]" : "text-white"}`}
                                >
                                  <span className="flex items-center gap-2">
                                    {isCurrent && (
                                      <span className="px-2 py-1 bg-[#1f6feb] text-white text-xs font-bold rounded uppercase">
                                        Actual
                                      </span>
                                    )}
                                    {event.titulo}
                                  </span>
                                  <span className="block text-sm text-gray-400">
                                    {event.comentario}
                                  </span>
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </ContentSectionProcess>
      </div>
    </ContentPageMain>
  );
}
