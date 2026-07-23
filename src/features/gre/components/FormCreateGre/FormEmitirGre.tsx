import { useState, useEffect } from "react";
import InputSelect from "../../../../components/ui/InputSelect";
import ButtonSubmitForm from "../../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../../components/ui/ButtonCancelForm";
import swalAlert from "../../../../components/messages/swalAlert";
import Loading from "../../../../components/ui/Loading";
import { motivoTranslado, optionsTipoDocumento, numeroDeSerieGre } from "../../../../config/constantes";
import { useEmitirGre } from "../../hooks/useEmitirGre";
import { useGreContext } from "../../../../context/GreContext";
import type { EmitirGre } from "../../../../types/gre.type";
import SalidaTransporteApi from "../../../../api/SalidaTransporte.api";
import PaqueteApi from "../../../../api/Paquete.api";

const modalidadTransporte = [{ label: "Transporte público", value: "01" }];

const initialEmitirGre: EmitirGre = {
	motivoTraslado: "01",
	docDestinatario: "DNI",
	modalidadTransporte: "01",
	codigoTransporte: numeroDeSerieGre,
};

export default function FormEmitirGre() {
	const { idPaquete, dataEmitirGre, setDataEmitirGre } = useGreContext();
	const { execute: emitirGre, isLoading, isError } = useEmitirGre();
	const [formData, setFormData] = useState<EmitirGre>(initialEmitirGre);
	const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);

	useEffect(() => {
		const loadMissingDetails = async () => {
			setIsLoadingDetails(true);

			// 1. Load Salida details if missing
			if (dataEmitirGre.idSalidaTransporte && (!dataEmitirGre.salidaTransporte.idChoferAcceso || dataEmitirGre.salidaTransporte.idChoferAcceso === 0)) {
				const cacheKey = `salida_detalle_${dataEmitirGre.idSalidaTransporte}`;
				const cached = localStorage.getItem(cacheKey);
				let salidaData: any = null;
				if (cached) {
					try {
						salidaData = JSON.parse(cached);
					} catch (e) {
						console.error(e);
					}
				}
				if (!salidaData) {
					try {
						const api = new SalidaTransporteApi();
						const response = await api.getByID<any>(dataEmitirGre.idSalidaTransporte);
						if (response.status === "success" && response.data) {
							salidaData = response.data;
							localStorage.setItem(cacheKey, JSON.stringify(salidaData));
						}
					} catch (err) {
						console.error(err);
					}
				}
				if (salidaData && salidaData.salidaTransporte) {
					const t = salidaData.salidaTransporte;
					setDataEmitirGre(current => ({
						...current,
						salidaTransporte: {
							idChoferAcceso: t.idchoferacceso,
							idOrigenEstablecimiento: t.idorigenestablecimiento,
							idDestinoEstablecimiento: t.iddestinoestablecimiento,
							idVehiculo: t.idvehiculo,
							fechaSalida: t.fechasalida,
							horasalida: "",
						}
					}));
				}
			}

			// 2. Load Paquete details if missing
			if (dataEmitirGre.idPaquete && (!dataEmitirGre.paquete.idUsuario || dataEmitirGre.paquete.idUsuario === 0)) {
				try {
					const paqueteApi = new PaqueteApi();
					const response = await paqueteApi.obtenerDatosPaquete(dataEmitirGre.idPaquete);
					if (response.status === "success" && response.data) {
						const p = response.data;
						setDataEmitirGre(current => ({
							...current,
							paquete: {
								clave: p.paquete.clave || "",
								destino: p.paquete.destino || "",
								idSalidaTransporte: p.paquete.idSalidaTransporte || current.idSalidaTransporte || 0,
								idUsuario: p.paquete.idUsuario || 0,
								idUsuarioDestino: p.paquete.idUsuarioDestino || 0,
								montoCobrado: parseFloat(p.paquete.montoPagado) || 0,
								observacion: p.paquete.observacion || ""
							}
						}));
					}
				} catch (err) {
					console.error(err);
				}
			}

			setIsLoadingDetails(false);
		};

		loadMissingDetails();
	}, [dataEmitirGre.idSalidaTransporte, dataEmitirGre.idPaquete, setDataEmitirGre]);

	const syncEmitirGre = (nextValues: Partial<EmitirGre>) => {
		setFormData((prev) => {
			const updatedFormData = {
				...prev,
				...nextValues,
			};

			setDataEmitirGre((current) => ({
				...current,
				emitir: updatedFormData,
			}));

			return updatedFormData;
		});
	};

	const handleEmitirGre = async () => {
		const paqueteSeleccionado = idPaquete ?? dataEmitirGre.idPaquete;

		if (!paqueteSeleccionado) {
			swalAlert({
				status: "warning",
				message: "Debe seleccionar o registrar un paquete antes de emitir la GRE",
			});
			return;
		}

		setDataEmitirGre((current) => ({
			...current,
			emitir: formData,
			idPaquete: paqueteSeleccionado,
		}));

		await emitirGre(formData, paqueteSeleccionado);
	};

	if (isLoadingDetails) {
		return (
			<div className="flex items-center justify-center p-12 bg-gray-900 mx-6 rounded-xl border border-gray-800">
				<Loading w={8} h={8} color="blue" />
				<span className="ml-3 text-slate-300">Cargando detalles de contexto...</span>
			</div>
		);
	}

	return (
		<div className="px-6 py-4 bg-gray-900 mx-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<InputSelect
					label="Motivo de traslado"
					options={motivoTranslado}
					placeholder="Seleccione un motivo"
					valueSelected={formData.motivoTraslado}
					onSelect={(value) => syncEmitirGre({ motivoTraslado: String(value) })}
				/>

				<InputSelect
					label="Documento destinatario"
					options={optionsTipoDocumento}
					placeholder="Seleccione tipo de documento"
					valueSelected={formData.docDestinatario}
					onSelect={(value) => syncEmitirGre({ docDestinatario: String(value) })}
				/>

				<InputSelect
					label="Modalidad de transporte"
					options={modalidadTransporte}
					placeholder="Modalidad"
					valueSelected={formData.modalidadTransporte}
					onSelect={() => syncEmitirGre({ modalidadTransporte: "01" })}
				/>

				<div className="md:col-span-2">
					<div className="rounded-lg border border-gray-700 bg-gray-950 p-4">
						<h2 className="text-lg font-semibold text-white mb-4">
							Datos registrados en contexto
						</h2>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm text-gray-300">
							<div className="space-y-2 rounded-md border border-gray-800 bg-gray-900/70 p-4">
								<p className="text-white font-medium">Emisión</p>
								<p>Motivo: {dataEmitirGre.emitir.motivoTraslado || "-"}</p>
								<p>Documento: {dataEmitirGre.emitir.docDestinatario || "-"}</p>
								<p>Modalidad: {dataEmitirGre.emitir.modalidadTransporte || "-"}</p>
								<p>Código transporte: {dataEmitirGre.emitir.codigoTransporte || 0}</p>
							</div>

							<div className="space-y-2 rounded-md border border-gray-800 bg-gray-900/70 p-4">
								<p className="text-white font-medium">Paquete</p>
								<p>Clave: {dataEmitirGre.paquete.clave || "-"}</p>
								<p>Destino: {dataEmitirGre.paquete.destino || "-"}</p>
								<p>Id salida transporte: {dataEmitirGre.paquete.idSalidaTransporte}</p>
								<p>Id usuario destino: {dataEmitirGre.paquete.idUsuarioDestino}</p>
								<p>Monto cobrado: {dataEmitirGre.paquete.montoCobrado}</p>
							</div>

							<div className="space-y-2 rounded-md border border-gray-800 bg-gray-900/70 p-4">
								<p className="text-white font-medium">Salida de transporte</p>
								<p>Chofer: {dataEmitirGre.salidaTransporte.idChoferAcceso}</p>
								<p>Origen: {dataEmitirGre.salidaTransporte.idOrigenEstablecimiento}</p>
								<p>Destino: {dataEmitirGre.salidaTransporte.idDestinoEstablecimiento}</p>
								<p>Vehículo: {dataEmitirGre.salidaTransporte.idVehiculo}</p>
								<p>Fecha: {dataEmitirGre.salidaTransporte.fechaSalida || "-"}</p>
								<p>Hora: {dataEmitirGre.salidaTransporte.horasalida || "-"}</p>
							</div>

							<div className="space-y-2 rounded-md border border-gray-800 bg-gray-900/70 p-4">
								<p className="text-white font-medium">Productos en paquete</p>
								<p>Cantidad de productos: {dataEmitirGre.productosEnPaquete.length}</p>
								<div className="max-h-48 overflow-auto space-y-2 pr-1">
									{dataEmitirGre.productosEnPaquete.length > 0 ? (
										dataEmitirGre.productosEnPaquete.map((producto) => (
											<div key={producto.idproductdefect} className="rounded border border-gray-700 px-3 py-2">
												<p className="text-white">{producto.nombreproducto}</p>
												<p>Cantidad: {producto.cantidad}</p>
												<p>Peso unitario: {producto.pesounitario}</p>
												<p>Observación: {producto.observacion}</p>
											</div>
										))
									) : (
										<p className="text-gray-500">No hay productos registrados.</p>
									)}
								</div>
							</div>

							<div className="space-y-2 rounded-md border border-gray-800 bg-gray-900/70 p-4 lg:col-span-2">
								<p className="text-white font-medium">Identificadores</p>
								<p>Id salida transporte: {dataEmitirGre.idSalidaTransporte}</p>
								<p>Id paquete: {dataEmitirGre.idPaquete}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex gap-2">
				<ButtonCancelForm
					handleCancel={() => {
						setFormData(initialEmitirGre);
						setDataEmitirGre((current) => ({
							...current,
							emitir: initialEmitirGre,
						}));
					}}
					isLoading={isLoading}
					textButton="Cancelar"
					color="red"
				/>
				<ButtonSubmitForm
					handleSubmit={handleEmitirGre}
					isError={isError}
					isLoading={isLoading}
					textButton="Emitir guia de remision"
					textError="Error al emitir guia de remision"
					color="green"
				/>
			</div>
		</div>
	);
}
