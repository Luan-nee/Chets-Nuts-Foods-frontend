import { Edit, Eye } from "lucide-react";
import Table from "../../../components/ui/Table";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import { useFetchGuiasRemision } from "../hooks/useFetchGuiasRemision";

export default function TableGre() {
  const tableHeader: string[] = [
    "Nº Guía",
    "Fecha Emisión",
    "Cliente / Destinatario",
    "Punto de Partida / Llegada",
    "Estado",
    "Acciones",
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
      fetchData={() => recargarGuiasRemision(1)}
    >
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="p-4 flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => recargarGuiasRemision(infoPaginacion.pagina_actual)}
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
                <span className="text-blue-400 font-medium">
                  {guia.informacion}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Ver"
                  >
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </ContentSectionProcess>
  );
}
