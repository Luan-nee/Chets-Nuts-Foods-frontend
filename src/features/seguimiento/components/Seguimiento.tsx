import { useState } from "react";
import ButtonSubmitFrom from "../../../components/ui/ButtonSubmitForm";
import { useFetchSeguimientoSalidaTransporte } from "../../../features/seguimiento/hooks/useFetchSeguimientoSalidaTransporte";
import TableSelectSalidaTransporte from "../../../features/transporte/components/TableSelectSalidaTransporte";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import { Calendar, CheckCircle } from "lucide-react";

export default function Seguimiento() {
  const [selectIdSalidaTransporte, setSelectIdSalidaTransporte] = useState<number | null>(null);
  const {
    infoSeguimiento,
    isLoading: isLoadingInfoSeguimiento,
    isError: isErrorInfoSeguimiento,
    execute: realizarSeguimientoSalidaTransporte,
  } = useFetchSeguimientoSalidaTransporte();
  const currentEventIndex = 0;
  
  return (
    <div className="relative flex-1 flex flex-col">
      <TableSelectSalidaTransporte 
        onChange={(idSalidaTransporte) => setSelectIdSalidaTransporte(idSalidaTransporte)}
        selectIdSalidaTransporte={(idSalidaTransporte) => setSelectIdSalidaTransporte(idSalidaTransporte)}
      />

      <div className="flex justify-center items-center p-4">
        <ButtonSubmitFrom 
          handleSubmit={() => {
            realizarSeguimientoSalidaTransporte(selectIdSalidaTransporte as number);
          }}
          isError={isErrorInfoSeguimiento}
          isLoading={isLoadingInfoSeguimiento}
          textButton="Consultar"
          textError="Error al realizar seguimiento"
          color="blue"
        />
      </div>

      <ContentSectionProcess
        fetchData={() =>
          realizarSeguimientoSalidaTransporte(
            selectIdSalidaTransporte as number,
          )
        }
        isError={isErrorInfoSeguimiento}
        isLoading={isLoadingInfoSeguimiento}
        textButtonError="Reintentar"
        textError="No se pudo obtener la información de seguimiento. Por favor, inténtalo de nuevo."
      >
        {/* Timeline */}
        <div className="mb-6 p-4">
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
  )
}