import Table from "../../../components/ui/Table";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import { useFetchGuiasRemision } from "../hooks/useFetchGuiasRemision";

export default function TableGre() {
  const tableHeader: string[] = [
    "Estado",
    "Número",
    "QR",
    "Confirmado",
    "Fecha Confirmación"
  ];

  const {
    guias: guiasRemision,
    isLoading: isLoadingGuias,
    isError : isErrorGuias,
    execute: recargarGuiasRemision,
    setPagina,
    infoPaginacion,
  } = useFetchGuiasRemision();

  return (
    <ContentSectionProcess
      isLoading={isLoadingGuias}
      isError={isErrorGuias}
      textError="Error al cargar las guías de remisión."
      textButtonError="Reintentar"
      fetchData={() => recargarGuiasRemision()}
    >
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="p-4 flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => recargarGuiasRemision()}
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

        <Table tableHeader={tableHeader} cantidadDatos={guiasRemision?.length || 0}>
          {guiasRemision?.map((guia, index) => (
            <tr key={index} className="hover:bg-gray-800/50 transition-colors">
              <td className="px-6 py-4">
                <span className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-300">
                  {guia.estadoguia}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="font-medium text-gray-200">{guia.numero}</span>
              </td>
              <td className="px-6 py-4">
                <a
                  href={guia.qrUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 underline-offset-4 hover:underline"
                >
                  Abrir QR
                </a>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    guia.confirmado
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-amber-500/10 text-amber-300"
                  }`}
                >
                  {guia.confirmado ? "Sí" : "No"}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-300">
                {guia.fechaConfirmacion ?? "Sin confirmar"}
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </ContentSectionProcess>
  );
}
