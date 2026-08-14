import { UserCheck, User, X, Check } from "lucide-react";
import { useFetchAccesos } from "../../accesos/hooks/useFetchAccesos";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";
import Loading from "../../../components/ui/Loading";
import type { ResponseGetAllColaboradores } from "../../../types/accesos.type";

interface ModalSelectResponsableProps {
	isOpen: boolean;
	isAnimatingClose: boolean;
	selectedId: number | null;
	onClose: () => void;
	onSelect: (acceso: ResponseGetAllColaboradores) => void;
}

export default function ModalSelectResponsable({
	isOpen,
	isAnimatingClose,
	selectedId,
	onClose,
	onSelect,
}: ModalSelectResponsableProps) {
	const {
		accesos,
		isLoading: cargandoAccesos,
		isError: errorAccesos,
		execute: recargarAccesos,
		setPagina,
		infoPaginacion,
	} = useFetchAccesos();

	if (!isOpen) return null;

	return (
		<div className={`modal-overlay ${isAnimatingClose ? "close" : "open"}`}>
			<style>{`
				.modal-overlay {
					position: fixed;
					inset: 0;
					background-color: rgba(0, 0, 0, 0.6);
					backdrop-filter: blur(4px);
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 1000;
					opacity: 0;
					transition: opacity 250ms ease-out;
				}
				.modal-overlay.open {
					opacity: 1;
				}
				.modal-overlay.close {
					opacity: 0;
				}
				.modal-container {
					background: rgba(17, 24, 39, 0.85);
					backdrop-filter: blur(16px);
					-webkit-backdrop-filter: blur(16px);
					border: 1px solid rgba(255, 255, 255, 0.08);
					border-radius: 20px;
					box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
					width: 90%;
					max-width: 550px;
					padding: 28px;
					color: #f3f4f6;
					transform: scale(0.94) translateY(-12px);
					filter: blur(6px);
					opacity: 0;
					animation: modalOpenAnim 250ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
				}
				.modal-container.close {
					animation: modalCloseAnim 250ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
				}
				@keyframes modalOpenAnim {
					to {
						opacity: 1;
						transform: scale(1) translateY(0);
						filter: blur(0);
					}
				}
				@keyframes modalCloseAnim {
					from {
						opacity: 1;
						transform: scale(1) translateY(0);
						filter: blur(0);
					}
					to {
						opacity: 0;
						transform: scale(0.94) translateY(-12px);
						filter: blur(6px);
					}
				}
				.stagger-item {
					opacity: 0;
					transform: translateX(-18px);
					animation: itemFadeIn 300ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
					transition: transform 200ms ease, background-color 200ms ease, border-color 200ms ease;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 14px 18px;
					background-color: rgba(255, 255, 255, 0.02);
					border: 1px solid rgba(255, 255, 255, 0.05);
					border-radius: 12px;
					margin-bottom: 10px;
					cursor: pointer;
				}
				.stagger-item:hover {
					transform: translateX(4px);
					background-color: rgba(255, 255, 255, 0.05);
					border-color: rgba(59, 130, 246, 0.4);
				}
				.stagger-item.selected {
					background-color: rgba(59, 130, 246, 0.12);
					border-color: rgba(59, 130, 246, 0.7);
				}
				.stagger-item.selected:hover {
					border-color: rgba(59, 130, 246, 0.9);
					background-color: rgba(59, 130, 246, 0.16);
				}
				.stagger-item:hover .icon-scale {
					transform: scale(1.08);
				}
				.icon-scale {
					transition: transform 200ms ease;
				}
				@keyframes itemFadeIn {
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}
				.stagger-item:nth-child(1) { animation-delay: 0ms; }
				.stagger-item:nth-child(2) { animation-delay: 50ms; }
				.stagger-item:nth-child(3) { animation-delay: 100ms; }
				.stagger-item:nth-child(4) { animation-delay: 150ms; }
				.stagger-item:nth-child(5) { animation-delay: 200ms; }
				.stagger-item:nth-child(6) { animation-delay: 250ms; }
				.stagger-item:nth-child(7) { animation-delay: 300ms; }
				.stagger-item:nth-child(8) { animation-delay: 350ms; }
				.stagger-item:nth-child(9) { animation-delay: 400ms; }
				.stagger-item:nth-child(10) { animation-delay: 450ms; }

				.modal-container.close .stagger-item {
					animation: itemFadeOut 200ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
				}
				@keyframes itemFadeOut {
					from {
						opacity: 1;
						transform: translateX(0);
					}
					to {
						opacity: 0;
						transform: translateX(-18px);
					}
				}
				.modal-container.close .stagger-item:nth-child(1) { animation-delay: 180ms; }
				.modal-container.close .stagger-item:nth-child(2) { animation-delay: 160ms; }
				.modal-container.close .stagger-item:nth-child(3) { animation-delay: 140ms; }
				.modal-container.close .stagger-item:nth-child(4) { animation-delay: 120ms; }
				.modal-container.close .stagger-item:nth-child(5) { animation-delay: 100ms; }
				.modal-container.close .stagger-item:nth-child(6) { animation-delay: 80ms; }
				.modal-container.close .stagger-item:nth-child(7) { animation-delay: 60ms; }
				.modal-container.close .stagger-item:nth-child(8) { animation-delay: 40ms; }
				.modal-container.close .stagger-item:nth-child(9) { animation-delay: 20ms; }
				.modal-container.close .stagger-item:nth-child(10) { animation-delay: 0ms; }
			`}</style>

			<div className={`modal-container ${isAnimatingClose ? "close" : ""}`}>
				{/* Header */}
				<div className="flex justify-between items-center mb-6">
					<div className="flex items-center gap-2">
						<UserCheck className="w-5 h-5 text-blue-400 icon-scale" />
						<h3 className="text-lg font-bold text-white">Seleccionar Responsable</h3>
					</div>
					<button onClick={onClose} className="p-1 hover:bg-gray-800 rounded-lg transition-colors">
						<X className="w-5 h-5 text-gray-400" />
					</button>
				</div>

				{/* List of accesses (staggered items) */}
				{cargandoAccesos ? (
					<div className="flex justify-center items-center py-10">
						<Loading w={6} h={6} color="blue" />
					</div>
				) : errorAccesos ? (
					<div className="text-center py-6">
						<p className="text-red-400 mb-2">Error al cargar los accesos</p>
						<button onClick={() => recargarAccesos()} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">
							Reintentar
						</button>
					</div>
				) : (
					<div className="mb-6 max-h-[350px] overflow-y-auto pr-1">
						{accesos.length === 0 ? (
							<p className="text-gray-400 text-center py-4">No hay accesos disponibles.</p>
						) : (
							accesos.map((acceso) => {
								const isSelected = acceso.idacceso === selectedId;
								return (
									<div
										key={acceso.idacceso}
										className={`stagger-item ${isSelected ? "selected" : ""}`}
										onClick={() => onSelect(acceso)}
									>
										<div className="flex items-center gap-3">
											<div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${isSelected ? "bg-blue-600/20 border-blue-500/50" : "bg-gray-800 border-gray-700"}`}>
												<User className={`w-4 h-4 icon-scale ${isSelected ? "text-blue-400" : "text-gray-400"}`} />
											</div>
											<div className="text-left">
												<p className="text-sm font-medium text-white">{acceso.nombres}</p>
												<p className="text-xs text-gray-500">DNI: {acceso.dniuser}</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${acceso.estado ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
												{acceso.estado ? "Activo" : "Inactivo"}
											</span>
											{isSelected && (
												<div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white border border-blue-500 shadow-sm animate-scaleIn">
													<Check className="w-3 h-3 text-white" />
												</div>
											)}
										</div>
									</div>
								);
							})
						)}
					</div>
				)}

				{/* Pagination */}
				{!cargandoAccesos && !errorAccesos && accesos.length > 0 && (
					<ButtonsPagination
						total_paginas={infoPaginacion.total_paginas}
						pivote={infoPaginacion.pagina_actual}
						fetchData={setPagina}
						datos_por_pagina={infoPaginacion.datos_por_pagina}
						total_data={infoPaginacion.total_data}
					/>
				)}
			</div>
		</div>
	);
}
