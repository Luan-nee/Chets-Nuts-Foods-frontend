import { useState } from "react";
import { Plus, Building2 } from "lucide-react";
import ContentPageMain from "../components/layouts/contentPageMain";
import TableEstablecimientos from "../features/establecimientos/components/TableEstablecimientos";
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
		isLoading,
		isError,
		execute: recargarEstablecimientos,
	} = useFetchEstablecimientos();

	return (
		<ContentPageMain>
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

			<TableEstablecimientos
				establecimientos={establecimientos}
				isLoading={isLoading}
				isError={isError}
				recargarEstablecimientos={recargarEstablecimientos}
				setShowFormUpdate={setShowFormUpdate}
				setShowDetallesEstablecimiento={setShowDetallesEstablecimiento}
				setSelectEstablecimientoId={setSelectEstablecimientoId}
			/>

			{showFormCreate && (
				<FormCreateEstablecimiento
					setShowFormCreateEstablecimiento={setShowFormCreate}
					onEstablecimientoCreado={recargarEstablecimientos}
				/>
			)}
			{showFormUpdate && selectEstablecimientoId !== null && (
				<FormUpdateEstablecimiento
					idEstablecimiento={selectEstablecimientoId}
					setShowFormUpdateEstablecimiento={setShowFormUpdate}
					onEstablecimientoActualizado={recargarEstablecimientos}
				/>
			)}
			{showDetallesEstablecimiento && selectEstablecimientoId !== null && (
				<DetallesEstablecimiento
					idEstablecimiento={selectEstablecimientoId}
					setShowDetallesEstablecimiento={setShowDetallesEstablecimiento}
				/>
			)}
		</ContentPageMain>
	);
}
