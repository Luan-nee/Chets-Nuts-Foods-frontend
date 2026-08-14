import { useState } from 'react';
import { Plus } from 'lucide-react';
import ContentPageMain from '../components/layouts/ContentPageMain';
import Table from '../components/ui/table/Table';
import FormCreateGre from '../features/gre/components/FormCreateGre';
import { useFetchGuiasRemision } from '../features/gre/hooks/useFetchGuiasRemision';

export default function ListaGre() {
  const [showFormCreateGre, setShowFormCreateGre] = useState<boolean>(false);
	const {
		guias,
		isLoading: isLoadingGuias,
		isError : isErrorGuias,
		execute: recargarGuiasRemision,
		setPagina,
		infoPaginacion,
	} = useFetchGuiasRemision();
	
  return (
    <ContentPageMain>
			{/* Header */}
			<div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
            <h2 className="text-3xl font-bold text-white mb-2">Gestión de Guías de remisión</h2>
            <p className="text-sm text-gray-400">Administra las guías de remisión de la empresa.</p>
          </div>

					<button
						onClick={() => setShowFormCreateGre(true)}
						className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
					>
						<Plus className="w-5 h-5" />
						Nueva guía de remisión
					</button>
				</div>
			</div>

			<div className="p-4">
				<Table
					cantidadDatos={guias?.length ?? 0}
					dataIsError={isErrorGuias}
					dataIsLoading={isLoadingGuias}
					reload={recargarGuiasRemision}
					changePage={setPagina}
					tableHeader={[
						"Estado",
						"Número",
						"QR",
						"Confirmado",
						"Fecha Confirmación"
					]}
					dataPagination={infoPaginacion}
				>
					{guias?.map((guia, index) => (
            <tr key={index} className="hover:bg-gray-800/50 transition-colors">
							{/* Estado de la guía */}
              <td className="px-6 py-4">
                <span className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-300">
                  {guia.estadoguia}
                </span>
              </td>
							{/* Número de la guía */}
              <td className="px-6 py-4">
                <span className="font-medium text-gray-200">{guia.numero}</span>
              </td>
							{/* Enlace al PDF */}
              <td className="px-6 py-4">
                <a
                  href={guia.qrUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 underline-offset-4 hover:underline"
                >
                  Abrir Enlace
                </a>
              </td>
							{/* Estado de confirmación */}
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
							{/* Fecha de confirmación */}
              <td className="px-6 py-4 text-gray-300">
                {guia.fechaConfirmacion ?? "Sin confirmar"}
              </td>
            </tr>
          ))}
				</Table>
			</div>

      {showFormCreateGre && (
        <FormCreateGre setShowFormCreateGre={setShowFormCreateGre} />
      )}
    </ContentPageMain>
  );
}