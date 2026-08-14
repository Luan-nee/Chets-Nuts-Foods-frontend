import { useState } from "react";
import { Building2, User } from "lucide-react";
import ContentForm from "../../../components/layouts/ContentForm";
import InputText from "../../../components/ui/InputText";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import InputSelect from "../../../components/ui/InputSelect";
import ModalSelectEmpleado from "./ModalSelectEmpleado";
import {
	departamentos,
	getDistritosByProvincia,
	getProvinciasByDepartamento,
} from "../../../config/infoUbicacion";
import { useGenerarCoordenadasUnicas } from "../../../hooks/useGenerarCoordenadasUnicas";
import { useCreateEstablecimiento } from "../hooks/useCreateEstablecimiento";
import type { ResponseGetAllColaboradores } from "../../../types/accesos.type";
import type { CreateEstablecimiento } from "../../../types/establecimiento.type";

interface FormCreateEstablecimientoProps {
	setShowFormCreateEstablecimiento: (value: boolean) => void;
	onEstablecimientoCreado: () => Promise<void> | void;
}

export default function FormCreateEstablecimiento({
	setShowFormCreateEstablecimiento,
	onEstablecimientoCreado,
}: FormCreateEstablecimientoProps) {
	const coordenadasIniciales = useGenerarCoordenadasUnicas();
	const {
		isLoading: cargandoCreate,
		isError: errorCreate,
		execute: registrarEstablecimiento,
	} = useCreateEstablecimiento();

	const [formData, setFormData] = useState<CreateEstablecimiento>({
		idResponsable: 0,
		nombreEstablecimiento: "",
		direccion: "",
		descripcion: "",
		latitud: coordenadasIniciales.latitud,
		longitud: coordenadasIniciales.longitud,
		distrito: "",
		provincia: "",
		departamento: "",
		ubigeo: "123456", // esto puede repetirse.
		tipoEstado: "oficina", // esto puede repetirse.
		codigoSunat: "",
	});

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

	const provinciasDisponibles = getProvinciasByDepartamento(formData.departamento);
	const distritosDisponibles = getDistritosByProvincia(formData.departamento, formData.provincia);

	return (
		<ContentForm>
			{/* Header */}
			<div className="flex flex-row gap-2">
				<div className="rounded-xl bg-blue-500/15 p-3 border border-blue-500/20">
					<Building2 className="w-6 h-6 text-blue-400" />
				</div>
				<div className="flex flex-col">
					<h2 className="text-xl font-semibold text-white">Datos del establecimiento</h2>
					<p className="text-sm text-gray-400">Registra la información del nuevo establecimiento.</p>
				</div>
			</div>
			
			{/* Nombre del establecimiento y responsable */}
			<div className="flex flex-row gap-4">
				{/* Nombre del establecimiento */}
				<InputText 
					value={formData.nombreEstablecimiento}
					label="Nombre del establecimiento"
					htmlForm="nombreEstablecimiento"
					onChange={(value) => setFormData((prev) => ({ ...prev, nombreEstablecimiento: value }))}
				/>
				{/* Selector de responsable */}
				<button 
					onClick={() => setShowModal(true)}
					className="flex items-center gap-2 p-4 rounded-lg bg-gray-950 transition-colors border border-gray-800 gap-3"
				>
					<User className="w-5 h-5 text-blue-400"/>
					<div className="text-left">
						{	responsable.idacceso === 0 ? (
							<p className="text-sm font-medium text-white text-nowrap">Selecciona un responsable</p>
						) : (
							<>
								<p className="text-sm font-medium text-white">{responsable.nombres}</p>
								<div className="flex flex-row gap-2">
									<p className="text-xs text-gray-500 text-nowrap">
										DNI: {responsable.dniuser}
									</p>
									<p className="text-xs text-gray-500 text-nowrap">
										ROL: {responsable.tipos}
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
					valueSelected={formData.departamento}
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
					valueSelected={formData.provincia}
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
					valueSelected={formData.distrito}
					onSelect={(value) => setFormData((prev) => ({ ...prev, distrito: value as string }))}
				/>
			</div>

			{/* Dirección y Referencias */}	
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<InputText
					label="Dirección"
					value={formData.direccion}
					htmlForm="direccion"
					onChange={(value) => setFormData((prev) => ({ ...prev, direccion: value }))}
				/>
				<InputText
					label="Referencias"
					value={formData.descripcion}
					htmlForm="descripcion"
					onChange={(value) => setFormData((prev) => ({ ...prev, descripcion: value }))}
				/>
			</div>

			{/* Botones */}
			<div className="flex gap-4 justify-end">
				<ButtonCancelForm
					handleCancel={() => setShowFormCreateEstablecimiento(false)}
					isLoading={cargandoCreate}
					textButton="Cancelar"
					color="red"
				/>
				<ButtonSubmitForm
					handleSubmit={async () => {
						const wasCreated = await registrarEstablecimiento(formData);
						if (wasCreated) {
							await onEstablecimientoCreado();
							setShowFormCreateEstablecimiento(false);
						}
					}}
					isLoading={cargandoCreate}
					isError={errorCreate}
					textButton="Guardar establecimiento"
					textError="Error al guardar"
					color="blue"
				/>
			</div>

			{ showModal && (
				<ModalSelectEmpleado 
					onSelect={(idSelect) => setFormData((prev) => ({ ...prev, idResponsable: idSelect }))}
					setShowModal={setShowModal}
					objectSelected={setResponsable}
					selectedId={formData.idResponsable}
				/>
			)}
		</ContentForm>
	);
}


