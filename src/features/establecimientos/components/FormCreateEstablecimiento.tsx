import { useState } from "react";
import { ArrowLeft, Building2 } from "lucide-react";
import ContentPage from "../../../components/layouts/ContentPage";
import InputText from "../../../components/ui/InputText";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
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

	return (
		<ContentPage>
			<div className="flex gap-4 border bg-gray-900 border-gray-700 rounded-lg px-6 py-4 mb-8">
				<button
					onClick={() => setShowFormCreateEstablecimiento(false)}
					className="p-2 bg-blue-700 hover:bg-blue-500 rounded-lg transition-colors"
				>
					<ArrowLeft className="w-6 h-6" />
				</button>
				<div className="min-w-0">
					<h1 className="text-3xl font-bold mb-1">Registrar nuevo establecimiento</h1>
					<p className="text-gray-400">
						Completa la información principal, ubicación y datos técnicos para crear el establecimiento.
					</p>
				</div>
			</div>

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

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<InputText
							label="Departamento"
							value={formData.departamento}
							htmlForm="departamento"
							onChange={(value) => setFormData((prev) => ({ ...prev, departamento: value.toUpperCase() }))}
						/>
						<InputText
							label="Dirección"
							value={formData.direccion}
							htmlForm="direccion"
							onChange={(value) => setFormData((prev) => ({ ...prev, direccion: value }))}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<InputText
							label="Distrito"
							value={formData.distrito}
							htmlForm="distrito"
							onChange={(value) => setFormData((prev) => ({ ...prev, distrito: value.toUpperCase() }))}
						/>
						<InputText
							label="Referencias"
							value={formData.descripcion}
							htmlForm="descripcion"
							onChange={(value) => setFormData((prev) => ({ ...prev, descripcion: value }))}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<InputText
							label="Provincia"
							value={formData.provincia}
							htmlForm="provincia"
							onChange={(value) => setFormData((prev) => ({ ...prev, provincia: value.toUpperCase() }))}
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
