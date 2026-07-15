import { useState } from "react";
import { Building2 } from "lucide-react";
import ContentPage from "../../../components/layouts/ContentPage";
import InputText from "../../../components/ui/InputText";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import HeaderFormPage from "../../../components/layouts/HeaderFormPage";
import InputSelect from "../../../components/ui/InputSelect";
import {
	departamentos,
	getDistritosByProvincia,
	getProvinciasByDepartamento,
} from "../../../config/infoUbicacion";
import { useCreateEstablecimiento } from "../hooks/useCreateEstablecimiento";
import type { CreateEstablecimiento } from "../../../types/establecimiento.type";

interface FormCreateEstablecimientoProps {
	setShowFormCreateEstablecimiento: (value: boolean) => void;
}

export default function FormCreateEstablecimiento({
	setShowFormCreateEstablecimiento,
}: FormCreateEstablecimientoProps) {
	const {
		isLoading: cargandoCreate,
		isError: errorCreate,
		execute: registrarEstablecimiento,
	} = useCreateEstablecimiento();

	const [formData, setFormData] = useState<CreateEstablecimiento>({
		idResponsable: 1,
		nombreEstablecimiento: "",
		direccion: "",
		descripcion: "",
		latitud: "-12.589880",
		longitud: "-69.210107",
		distrito: "",
		provincia: "",
		departamento: "",
		ubigeo: "211102",
		tipoEstado: "oficina",
		codigoSunat: "affe",
	});

	const provinciasDisponibles = getProvinciasByDepartamento(formData.departamento);
	const distritosDisponibles = getDistritosByProvincia(formData.departamento, formData.provincia);

	return (
		<ContentPage>
			<HeaderFormPage 
				title="Registrar nuevo establecimiento"
				description="Completa la información principal, ubicación y datos técnicos para crear el establecimiento."
				setShowForm={() => setShowFormCreateEstablecimiento(false)}
			/>

			<div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mx-8 my-6 shadow-lg">
				<div className="flex items-center gap-3 mb-6">
					<div className="rounded-xl bg-blue-500/15 p-3 border border-blue-500/20">
						<Building2 className="w-6 h-6 text-blue-400" />
					</div>
					<div>
						<h2 className="text-xl font-semibold text-white">Datos del establecimiento</h2>
						<p className="text-sm text-gray-400">Usa nombres claros y una ubicación precisa para evitar inconsistencias.</p>
					</div>
				</div>

				<div className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
						<InputText
							label="Nombre del establecimiento"
							value={formData.nombreEstablecimiento}
							htmlForm="nombreEstablecimiento"
							onChange={(value) => setFormData((prev) => ({ ...prev, nombreEstablecimiento: value }))}
						/>
					</div>

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
				</div>

				<div className="flex gap-4 mt-8">
					<div className="flex flex-row gap-4 w-full justify-end">
						<div className="flex flex-row gap-4">
							<ButtonCancelForm
								handleCancel={() => setShowFormCreateEstablecimiento(false)}
								isLoading={cargandoCreate}
								textButton="Cancelar"
								color="red"
							/>
							<ButtonSubmitForm
								handleSubmit={async () => {
									await registrarEstablecimiento(formData);
									setShowFormCreateEstablecimiento(false);
								}}
								isLoading={cargandoCreate}
								isError={errorCreate}
								textButton="Guardar establecimiento"
								textError="Error al guardar"
								color="blue"
							/>
						</div>
					</div>
				</div>
			</div>
		</ContentPage>
	);
}
