import { useState } from "react";
import { ArrowLeft, Building2 } from "lucide-react";
import ContentPage from "../../../components/layouts/ContentPage";
import InputText from "../../../components/ui/InputText";
import InputNumber from "../../../components/ui/InputNumber";
import InputSelect from "../../../components/ui/InputSelect";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import { useCreateEstablecimiento } from "../hooks/useCreateEstablecimiento";
import type { CreateEstablecimiento } from "../../../types/establecimiento.type";
import type { TipoEstablecimiento } from "../../../types/constantes.type";

interface FormCreateEstablecimientoProps {
	setShowFormCreateEstablecimiento: (value: boolean) => void;
}

const tipoEstablecimientoOptions: Array<{ value: TipoEstablecimiento; label: string }> = [
	{ value: "fiscal", label: "Fiscal" },
	{ value: "anexo", label: "Anexo" },
	{ value: "almacen", label: "Almacén" },
	{ value: "oficina", label: "Oficina" },
	{ value: "no_registrado", label: "No registrado" },
];

export default function FormCreateEstablecimiento({
	setShowFormCreateEstablecimiento,
}: FormCreateEstablecimientoProps) {
	const {
		isLoading: cargandoCreate,
		isError: errorCreate,
		message: messageCreate,
		execute: registrarEstablecimiento,
	} = useCreateEstablecimiento();

	const [formData, setFormData] = useState<CreateEstablecimiento>({
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
		codigoSunat: "",
	});

	const handleSubmit = async (): Promise<void> => {
		const response = await registrarEstablecimiento({
			...formData,
			codigoSunat: formData.codigoSunat?.trim() ? formData.codigoSunat : undefined,
			tipoEstado: formData.tipoEstado ?? "no_registrado",
		});

		if (response.status === "success") {
			setShowFormCreateEstablecimiento(false);
		}
	};

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
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<InputNumber
							defaultValue={formData.idResponsable}
							label="ID responsable"
							simbol="usuario"
							onChange={(value) => setFormData((prev) => ({ ...prev, idResponsable: value }))}
							placeholder="Ingresa el ID del responsable"
						/>
						<InputText
							label="Código SUNAT (opcional)"
							value={formData.codigoSunat ?? ""}
							htmlForm="codigoSunat"
							onChange={(value) => setFormData((prev) => ({ ...prev, codigoSunat: value }))}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<InputText
							label="Nombre del establecimiento"
							value={formData.nombreEstablecimiento}
							htmlForm="nombreEstablecimiento"
							onChange={(value) => setFormData((prev) => ({ ...prev, nombreEstablecimiento: value }))}
						/>
						<InputSelect
							label="Tipo de establecimiento"
							options={tipoEstablecimientoOptions}
							placeholder="Selecciona el tipo de establecimiento"
							onSelect={(value) => setFormData((prev) => ({ ...prev, tipoEstado: value as TipoEstablecimiento }))}
							valueSelected={formData.tipoEstado}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<InputText
							label="Departamento"
							value={formData.departamento}
							htmlForm="departamento"
							onChange={(value) => setFormData((prev) => ({ ...prev, departamento: value }))}
						/>
						<InputText
							label="Provincia"
							value={formData.provincia}
							htmlForm="provincia"
							onChange={(value) => setFormData((prev) => ({ ...prev, provincia: value }))}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<InputText
							label="Distrito"
							value={formData.distrito}
							htmlForm="distrito"
							onChange={(value) => setFormData((prev) => ({ ...prev, distrito: value }))}
						/>
						<InputText
							label="Ubigeo"
							value={formData.ubigeo}
							htmlForm="ubigeo"
							onChange={(value) => setFormData((prev) => ({ ...prev, ubigeo: value }))}
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
							label="Descripción"
							value={formData.descripcion}
							htmlForm="descripcion"
							onChange={(value) => setFormData((prev) => ({ ...prev, descripcion: value }))}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<InputText
							label="Latitud"
							value={formData.latitud}
							htmlForm="latitud"
							onChange={(value) => setFormData((prev) => ({ ...prev, latitud: value }))}
						/>
						<InputText
							label="Longitud"
							value={formData.longitud}
							htmlForm="longitud"
							onChange={(value) => setFormData((prev) => ({ ...prev, longitud: value }))}
						/>
					</div>
				</div>

				{messageCreate ? (
					<p className={`mt-5 text-sm ${errorCreate ? "text-rose-300" : "text-emerald-300"}`}>
						{messageCreate}
					</p>
				) : null}

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
								handleSubmit={handleSubmit}
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
