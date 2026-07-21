import { useState } from "react";
import { CalendarDays, Hash, Plus } from "lucide-react";
import Table from "../../../components/ui/Table";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import { useFetchSalidaTransportes } from "../hooks/useFechSalidasTransporte";

interface TableSelectSalidaTransporteProps {
  selectIdSalidaTransporte: (idSalidaTransporte: number | null) => void;
  onChange: (idSalidaTransporte: number | null) => void;
}

export default function TableSelectSalidaTransporte({
  selectIdSalidaTransporte,
  onChange,
}: TableSelectSalidaTransporteProps) {
  const [idSelected, setIdSelected] = useState<number | null>(null);
  const tableHeader = ["ID Salida", "Estado", "Fecha de salida", ""];
  const {
    salidaTransportes,
    isLoading: isLoadingSalidaTransportes,
    isError: isErrorSalidaTransportes,
    execute: obtenerSalidaTransportes,
    setPagina,
    infoPaginacion,
  } = useFetchSalidaTransportes();

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

  return (
    <ContentSectionProcess
      isLoading={isLoadingSalidaTransportes}
      isError={isErrorSalidaTransportes}
      textError="Error al cargar las salidas de transporte"
      textButtonError="Reintentar"
      fetchData={() => obtenerSalidaTransportes(1)}
    >
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2
            className="inline-flex px-8 py-2 rounded-r-xl
              backdrop-blur-sm
              font-semibold
              text-xl
              text-blue-100
              bg-gray-900
            "
          >
            Selecciona una salida de transporte
          </h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => obtenerSalidaTransportes(1)}
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
        <Table
          tableHeader={tableHeader}
          cantidadDatos={salidaTransportes.length}
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
                  {idSelected === salidaTransporte.idsalidatransporte ? (
                    <button
                      onClick={() => {
                        setIdSelected(null);
                        selectIdSalidaTransporte(null);
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
                        selectIdSalidaTransporte(
                          salidaTransporte.idsalidatransporte,
                        );
                        setIdSelected(salidaTransporte.idsalidatransporte);
                        onChange(salidaTransporte.idsalidatransporte);
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
