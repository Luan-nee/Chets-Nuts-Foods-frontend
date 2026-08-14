import { useState } from "react";
import { Plus, Building2, Eye, Edit2 } from "lucide-react";
import ContentPageMain from "../components/layouts/ContentPageMain";
import Table from "../components/ui/table/Table";
import DetallesEstablecimiento from "../features/establecimientos/components/DetallesEstablecimiento";
import FormCreateEstablecimiento from "../features/establecimientos/components/FormCreateEstablecimiento";
import FormUpdateEstablecimiento from "../features/establecimientos/components/FormUpdateEstablecimiento";
import { useFetchEstablecimientos } from "../features/establecimientos/hooks/useFetchEstablecimientos";

export default function Establecimientos() {
	const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
	const [showFormUpdate, setShowFormUpdate] = useState<boolean>(false);
	const [showDetallesEstablecimiento, setShowDetallesEstablecimiento] = useState<boolean>(false);
	const [selectEstablecimientoId, setSelectEstablecimientoId] = useState<number | null>(null);

	const {
		establecimientos,
		isLoading: isLoadingEstablecimientos,
		isError: isErrorEstablecimientos,
		execute: recargarEstablecimientos,
	} = useFetchEstablecimientos();

	return (
		<ContentPageMain>
		{
			showFormCreate ? (
				<FormCreateEstablecimiento
					setShowFormCreateEstablecimiento={setShowFormCreate}
					onEstablecimientoCreado={recargarEstablecimientos}
				/>
			) : showFormUpdate && selectEstablecimientoId !== null ? (
				<FormUpdateEstablecimiento
					idEstablecimiento={selectEstablecimientoId}
					setShowFormUpdateEstablecimiento={setShowFormUpdate}
					onEstablecimientoActualizado={recargarEstablecimientos}
				/>
			) : showDetallesEstablecimiento && selectEstablecimientoId !== null ? (
				<DetallesEstablecimiento
					idEstablecimiento={selectEstablecimientoId}
					setShowDetallesEstablecimiento={setShowDetallesEstablecimiento}
				/>
			) : (
				<>
					{/* Header */}
					<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-gray-900 border-b border-gray-800 px-8 py-6">
						<div>
							<div className="flex items-center gap-3 mb-2">
								<div className="rounded-xl bg-blue-600/20 p-2 border border-blue-500/20">
									<Building2 className="w-6 h-6 text-blue-300" />
								</div>
								<h2 className="text-3xl font-bold text-white">Gestión de establecimientos</h2>
							</div>
							<p className="text-sm text-gray-400 max-w-3xl">
								Administra los establecimientos registrados en el sistema, revisa sus datos y realiza altas o actualizaciones cuando sea necesario.
							</p>
						</div>

						<button
							onClick={() => setShowFormCreate(true)}
							className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
						>
							<Plus className="w-5 h-5" />
							Nuevo establecimiento
						</button>
					</div>
				
					{/* Tabla */}
					<div className="p-4">
						<Table
							tableHeader={[
								"ESTABLECIMIENTO",
								"UBICACIÓN",
								"DIRECCIÓN",
								"ACCIONES",
							]}
							cantidadDatos={establecimientos.length}
							dataIsError={isErrorEstablecimientos}
							dataIsLoading={isLoadingEstablecimientos}
							reload={recargarEstablecimientos}
						>
							{establecimientos?.map((establecimiento, index) => (
								<tr
									key={index}
									className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
								>
									{/* Establecimiento */}
									<td className="px-6 py-4">
										<div className="flex items-start gap-3">
											<div className="mt-0.5 rounded-lg bg-[#1f6feb]/15 p-2">
												<Building2 className="w-5 h-5 text-[#1f6feb]" />
											</div>
											<div className="min-w-0">
												<span className="block font-medium text-sm text-white truncate">
													{establecimiento.nombreEst}
												</span>
												<span className="block text-xs text-gray-400 truncate">
													{establecimiento.descripcion}
												</span>
											</div>
										</div>
									</td>

									{/* Ubicación */}
									<td className="px-6 py-4">
										<div className="flex gap-2">
											<span className="text-sm text-gray-300">{establecimiento.distrito} / {establecimiento.provincia}</span>
										</div>
									</td>

									{/* Dirección */}
									<td className="px-6 py-4">
										<span className="text-sm text-gray-300">{establecimiento.direccion}</span>
									</td>

									{/* Actions */}
									<td className="px-6 py-4">
										<div className="flex items-center justify-end gap-2">
											<button
												className="p-2 hover:bg-[#21262d] rounded-lg transition-colors"
												aria-label="Ver establecimiento"
												onClick={() => {
													setSelectEstablecimientoId(establecimiento.idEst);
													setShowDetallesEstablecimiento(true);
												}}
											>
												<Eye className="w-4 h-4 text-gray-400" />
											</button>
											<button
												className="p-2 hover:bg-[#21262d] rounded-lg transition-colors"
												aria-label="Editar establecimiento"
												onClick={() => {
													setSelectEstablecimientoId(establecimiento.idEst);
													setShowFormUpdate(true);
												}}
											>
												<Edit2 className="w-4 h-4 text-gray-400" />
											</button>
										</div>
									</td>
								</tr>
							))}
						</Table>
					</div>
				</>
			)
		}
		</ContentPageMain>
	);
}
