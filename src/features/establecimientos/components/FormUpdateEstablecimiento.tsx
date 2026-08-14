import { useEffect, useState } from "react";
import { Building2, User } from "lucide-react";
import ContentForm from "../../../components/layouts/ContentForm"
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import InputText from "../../../components/ui/InputText";
import InputSelect from "../../../components/ui/InputSelect";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ModalSelectEmpleado from "./ModalSelectEmpleado";
import {
	departamentos,
	getDistritosByProvincia,
	getProvinciasByDepartamento,
} from "../../../config/infoUbicacion";
import { useFetchEstablecimiento } from "../hooks/useFetchEstablecimiento";
import { useUpdateEstablecimiento } from "../hooks/useUpdateEstablecimiento";
import type { UpdateEstablecimiento } from "../../../types/establecimiento.type";
import type { ResponseGetAllColaboradores } from "../../../types/accesos.type";

interface FormUpdateEstablecimientoProps {
	idEstablecimiento: number | null;
	setShowFormUpdateEstablecimiento: (value: boolean) => void;
	onEstablecimientoActualizado: () => Promise<void> | void;
}

export default function FormUpdateEstablecimiento({
	idEstablecimiento,
	setShowFormUpdateEstablecimiento,
	onEstablecimientoActualizado,
}: FormUpdateEstablecimientoProps) {
	const establecimientoId = idEstablecimiento ?? 0;
	const {
		establecimiento,
		isLoading: cargandoDatos,
		isError: errorDatos,
		message: messageDatos,
		execute: recargarDatos,
	} = useFetchEstablecimiento(establecimientoId);
	const {
		isLoading: cargandoUpdate,
		isError: errorUpdate,
		execute: actualizarEstablecimiento,
	} = useUpdateEstablecimiento();

	const [formReady, setFormReady] = useState<boolean>(false);
	const [formData, setFormData] = useState<UpdateEstablecimiento>({
		idEstablecimiento: establecimientoId,
		idResponsable: 0,
		nombreEstablecimiento: "",
		direccion: "",
		descripcion: "",
		latitud: "",
		longitud: "",
		distrito: "",
		provincia: "",
		departamento: "",
		ubigeo: "",
		tipoEstado: "no_registrado",
		codigoSunat: "affe",
	});
	const provinciasDisponibles = getProvinciasByDepartamento(formData.departamento ?? "");
	const distritosDisponibles = getDistritosByProvincia(formData.departamento ?? "", formData.provincia ?? "");

	const [showModal, setShowModal] = useState<boolean>(false);
	const [responsable, setResponsable] = useState<ResponseGetAllColaboradores>({
		correo: "",
		dniuser: "",
		estado: false,
		estadoacceso: "OCUPADO",
		idacceso: 0,
		nombres: "",
		tipos: "SIN ROL",
	});

	useEffect(() => {
		if (establecimiento) {
			setFormData({
				idEstablecimiento: establecimiento.idEst,
				idResponsable: establecimiento.iduser,
				nombreEstablecimiento: establecimiento.nombreEstablecimiento ?? "",
				direccion: establecimiento.descripcion ?? "",
				descripcion: establecimiento.descripcion ?? "",
				latitud: establecimiento.latitud ?? "",
				longitud: establecimiento.longitud ?? "",
				distrito: establecimiento.distrito ?? "",
				provincia: establecimiento.provincia ?? "",
				departamento: establecimiento.departamento ?? "",
				ubigeo: establecimiento.ubigeo ?? "",
				tipoEstado: establecimiento.tipoestablecimiento ?? "no_registrado",
				codigoSunat: establecimiento.codigoSunat ?? "",
			});
			setResponsable({
				correo: "",
				dniuser: establecimiento.dniuser ?? "",
				estado: establecimiento.activo,
				estadoacceso: establecimiento.activo ? "DISPONIBLE" : "OCUPADO",
				idacceso: establecimiento.iduser,
				nombres: establecimiento.nombreUsuario ?? "",
				tipos: "SIN ROL",
			});
			setFormReady(true);
		}
	}, [establecimiento]);

	const handleSubmit = async (): Promise<void> => {
		const response = await actualizarEstablecimiento({
			...formData,
			idEstablecimiento: establecimientoId,
			codigoSunat: formData.codigoSunat?.trim() ? formData.codigoSunat : undefined,
			tipoEstado: formData.tipoEstado ?? "no_registrado",
		});

		if (response.status === "success") {
			await onEstablecimientoActualizado();
			setShowFormUpdateEstablecimiento(false);
		}
	};

	return (
		<ContentForm>
			{/* Header */}
			<div className="flex flex-row gap-2">
				<div className="rounded-xl bg-blue-500/15 p-3 border border-blue-500/20">
					<Building2 className="w-6 h-6 text-blue-400" />
				</div>
				<div className="flex flex-col">
					<h2 className="text-xl font-semibold text-white">Datos del establecimiento</h2>
					<p className="text-sm text-gray-400">Edita la información del establecimiento.</p>
				</div>
			</div>
			
			<ContentSectionProcess
				isLoading={cargandoDatos || !formReady}
				isError={errorDatos}
				textError={messageDatos || "Error al cargar los datos del establecimiento."}
				textButtonError="Reintentar"
				fetchData={() => recargarDatos(establecimientoId)}
			>
				{/* Nombre del establecimiento y responsable */}
				<div className="flex flex-row gap-4">
					<InputText
						label="Nombre del establecimiento"
						value={formData.nombreEstablecimiento ?? ""}
						htmlForm="nombreEstablecimientoUpdate"
						onChange={(value) => setFormData((prev) => ({ ...prev, nombreEstablecimiento: value }))}
					/>
					{/* Selector de responsable */}
					<button 
						onClick={() => setShowModal(true)}
						className="flex items-center gap-2 p-4 rounded-lg bg-gray-950 transition-colors border border-gray-800 gap-3"
					>
						<User className="w-5 h-5 text-blue-400"/>
						<div className="text-left">
							{	(responsable.idacceso === 0) ? (
								<p className="text-sm font-medium text-white text-nowrap">Selecciona un responsable</p>
							) : (
								<>
									<p className="text-sm font-medium text-white text-nowrap">{responsable.nombres}</p>
									<div className="flex flex-row gap-2">
										<p className="text-xs text-gray-500 text-nowrap">
											DNI: {responsable.dniuser}
										</p>
									</div>
								</>
							)}
						</div>
					</button>
				</div>
				
				{/* Departamento, Provincia y Distrito */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<InputSelect
						label="Departamento"
						options={departamentos}
						placeholder="Selecciona un departamento"
						valueSelected={formData.departamento ?? ""}
						onSelect={(value) =>
							setFormData((prev) => ({
								...prev,
								departamento: value as string,
								provincia: "",
								distrito: "",
							}))
						}
					/>
					<InputSelect
						label="Provincia"
						options={provinciasDisponibles}
						placeholder="Selecciona una provincia"
						valueSelected={formData.provincia ?? ""}
						onSelect={(value) =>
							setFormData((prev) => ({
								...prev,
								provincia: value as string,
								distrito: "",
							}))
						}
					/>
					<InputSelect
						label="Distrito"
						options={distritosDisponibles}
						placeholder="Selecciona un distrito"
						valueSelected={formData.distrito ?? ""}
						onSelect={(value) => setFormData((prev) => ({ ...prev, distrito: value as string }))}
					/>
				</div>

				{/* Dirección y Referencias */}	
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<InputText
						label="Descripción"
						value={formData.descripcion ?? ""}
						htmlForm="descripcionUpdate"
						onChange={(value) => setFormData((prev) => ({ ...prev, descripcion: value }))}
					/>
					<InputText 
						htmlForm="deferencia"
						label="Referencia"
						onChange={(value) => setFormData((prev) => ({ ...prev, direccion: value }))}
						value={formData.direccion ?? ""}
					/>
				</div>
			</ContentSectionProcess>

			{/* Botones */}
			<div className="flex gap-4 mt-8 justify-end">
				<div className="flex flex-row gap-4">
					<ButtonCancelForm
						handleCancel={() => setShowFormUpdateEstablecimiento(false)}
						isLoading={cargandoUpdate}
						textButton="Cancelar"
						color="red"
					/>
					<ButtonSubmitForm
						handleSubmit={handleSubmit}
						isLoading={cargandoUpdate}
						isError={errorUpdate}
						textButton="Guardar cambios"
						textError="Error al guardar"
						color="blue"
					/>
				</div>
			</div>

			{ showModal && (
				<ModalSelectEmpleado
					onSelect={() => {
						setFormData((prev) => ({ ...prev, idResponsable: responsable.idacceso }));
					}}
					setShowModal={setShowModal}
					objectSelected={(value) => setResponsable(value)}
					selectedId={formData.idResponsable}
				/>
			)}
		</ContentForm>
	);
}

