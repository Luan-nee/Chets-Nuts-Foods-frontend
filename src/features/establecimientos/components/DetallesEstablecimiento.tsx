import { ArrowLeft, Building2, CalendarClock, ClipboardList, MapPin, User2 } from "lucide-react";
import ContentPage from "../../../components/layouts/ContentPage";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import { useFetchEstablecimiento } from "../hooks/useFetchEstablecimiento";

interface DetallesEstablecimientoProps {
	idEstablecimiento: number | null;
	setShowDetallesEstablecimiento: (value: boolean) => void;
}

const tipoEstablecimientoLabels: Record<string, string> = {
	fiscal: "Fiscal",
	anexo: "Anexo",
	almacen: "Almacén",
	oficina: "Oficina",
	no_registrado: "No registrado",
};

const booleanLabel = (value: boolean): string => (value ? "Activo" : "Inactivo");

const formatDate = (dateValue?: Date | string): string => {
	if (!dateValue) return "No registrado";

	const date = new Date(dateValue);

	if (Number.isNaN(date.getTime())) return "No registrado";

	return new Intl.DateTimeFormat("es-PE", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
};

export default function DetallesEstablecimiento({
	idEstablecimiento,
	setShowDetallesEstablecimiento,
}: DetallesEstablecimientoProps) {
	const establecimientoId = idEstablecimiento ?? 0;
	const {
		establecimiento,
		isLoading,
		isError,
		message,
		execute: recargarEstablecimiento,
	} = useFetchEstablecimiento(establecimientoId);

	return (
		<ContentPage>
			<div className="flex gap-4 border bg-gray-900 border-gray-700 rounded-lg px-6 py-4 mb-8">
				<button
					onClick={() => setShowDetallesEstablecimiento(false)}
					className="p-2 bg-blue-700 hover:bg-blue-500 rounded-lg transition-colors"
				>
					<ArrowLeft className="w-6 h-6" />
				</button>
				<div className="min-w-0">
					<h1 className="text-3xl font-bold mb-1">Detalles del establecimiento</h1>
					<p className="text-gray-400">
						Revisa la información principal, ubicación y estado del establecimiento registrado.
					</p>
				</div>
			</div>

			<ContentSectionProcess
				isLoading={isLoading}
				isError={isError}
				textError="Error al cargar los detalles del establecimiento."
				textButtonError="Reintentar"
				fetchData={() => recargarEstablecimiento(establecimientoId)}
			>
				{establecimiento ? (
					<div className="space-y-6">
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
							<section className="lg:col-span-8 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
								<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-gray-800 pb-5 mb-5">
									<div className="min-w-0 flex items-start gap-4">
										<div className="rounded-2xl bg-blue-500/15 p-3 border border-blue-500/20">
											<Building2 className="w-7 h-7 text-blue-400" />
										</div>
										<div className="min-w-0">
											<p className="text-sm uppercase tracking-[0.2em] text-gray-500">
												Establecimiento #{establecimiento.idEst}
											</p>
											<h2 className="text-2xl font-semibold text-white truncate">
												{establecimiento.nombres || "Sin nombre registrado"}
											</h2>
											<p className="text-sm text-gray-400 mt-1">
												{establecimiento.descripcion || "Sin descripción registrada"}
											</p>
										</div>
									</div>

									<div className="flex flex-wrap gap-2">
										<span
											className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
												establecimiento.activo
													? "bg-emerald-500/15 text-emerald-300 border-emerald-500/25"
													: "bg-rose-500/15 text-rose-300 border-rose-500/25"
											}`}
										>
											{booleanLabel(establecimiento.activo)}
										</span>
										<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-slate-500/15 text-slate-300 border-slate-500/25">
											{tipoEstablecimientoLabels[establecimiento.tipoestablecimiento] ?? establecimiento.tipoestablecimiento}
										</span>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="rounded-xl border border-gray-800 bg-gray-950/40 p-4">
										<p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Código SUNAT</p>
										<p className="text-sm text-white">
											{establecimiento.codigoSunat ?? "No registrado"}
										</p>
									</div>

									<div className="rounded-xl border border-gray-800 bg-gray-950/40 p-4">
										<p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Ubigeo</p>
										<p className="text-sm text-white">{establecimiento.ubigeo || "No registrado"}</p>
									</div>

									<div className="rounded-xl border border-gray-800 bg-gray-950/40 p-4">
										<p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Ubicación</p>
										<p className="text-sm text-white">
											{establecimiento.distrito}, {establecimiento.provincia}
										</p>
									</div>

									<div className="rounded-xl border border-gray-800 bg-gray-950/40 p-4">
										<p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Fecha de registro</p>
										<p className="text-sm text-white">{formatDate(establecimiento.fechaCreacion)}</p>
									</div>
								</div>
							</section>

							<section className="lg:col-span-4 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg space-y-4">
								<div className="flex items-center gap-3">
									<div className="rounded-xl bg-emerald-500/15 p-3 border border-emerald-500/20">
										<User2 className="w-6 h-6 text-emerald-300" />
									</div>
									<div>
										<p className="text-xs uppercase tracking-[0.2em] text-gray-500">Responsable</p>
										<h3 className="text-lg font-semibold text-white">{establecimiento.nombres}</h3>
									</div>
								</div>

								<div className="space-y-3 pt-2">
									<div className="rounded-xl border border-gray-800 bg-gray-950/40 p-4">
										<p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Documento</p>
										<p className="text-sm text-white">{establecimiento.dniuser || "No registrado"}</p>
									</div>
									<div className="rounded-xl border border-gray-800 bg-gray-950/40 p-4">
										<p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Teléfono</p>
										<p className="text-sm text-white">{establecimiento.numero || "No registrado"}</p>
									</div>
									<div className="rounded-xl border border-gray-800 bg-gray-950/40 p-4">
										<p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Departamento</p>
										<p className="text-sm text-white">{establecimiento.departamento || "No registrado"}</p>
									</div>
								</div>
							</section>
						</div>

						<section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
							<div className="flex items-center gap-2 mb-5">
								<ClipboardList className="w-5 h-5 text-blue-400" />
								<h3 className="text-lg font-semibold text-white">Información técnica</h3>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="rounded-xl border border-gray-800 bg-gray-950/40 p-4">
									<p className="text-xs uppercase tracking-widest text-gray-500 mb-2">ID usuario</p>
									<p className="text-sm text-white">{establecimiento.iduser}</p>
								</div>
								<div className="rounded-xl border border-gray-800 bg-gray-950/40 p-4">
									<p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Latitud</p>
									<p className="text-sm text-white">{establecimiento.latitud || "No registrada"}</p>
								</div>
								<div className="rounded-xl border border-gray-800 bg-gray-950/40 p-4">
									<p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Longitud</p>
									<p className="text-sm text-white">{establecimiento.longitud || "No registrada"}</p>
								</div>
							</div>

							<div className="mt-4 rounded-xl border border-gray-800 bg-gray-950/40 p-4">
								<div className="flex items-center gap-2 mb-2">
									<MapPin className="w-4 h-4 text-gray-400" />
									<p className="text-xs uppercase tracking-widest text-gray-500">Dirección completa</p>
								</div>
								<p className="text-sm text-white leading-relaxed">
									{establecimiento.descripcion || establecimiento.ubigeo || "Sin información adicional"}
								</p>
							</div>
						</section>

						{message ? (
							<p className="text-sm text-gray-400 text-center">{message}</p>
						) : null}

						<div className="flex justify-end">
							<ButtonCancelForm
								handleCancel={() => setShowDetallesEstablecimiento(false)}
								isLoading={false}
								textButton="Cerrar"
								color="gray"
							/>
						</div>
					</div>
				) : null}
			</ContentSectionProcess>
		</ContentPage>
	);
}
