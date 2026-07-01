import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import ContentPage from "../../../components/layouts/ContentPage";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import InputText from "../../../components/ui/InputText";
import InputSelect from "../../../components/ui/InputSelect";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import HeaderFormPage from "../../../components/layouts/HeaderFormPage";
import { useFetchEstablecimiento } from "../hooks/useFetchEstablecimiento";
import { useUpdateEstablecimiento } from "../hooks/useUpdateEstablecimiento";
import type { UpdateEstablecimiento } from "../../../types/establecimiento.type";
import type { TipoEstablecimiento } from "../../../types/constantes.type";

interface FormUpdateEstablecimientoProps {
	idEstablecimiento: number | null;
	setShowFormUpdateEstablecimiento: (value: boolean) => void;
}

const tipoEstablecimientoOptions: Array<{ value: TipoEstablecimiento; label: string }> = [
	{ value: "fiscal", label: "Fiscal" },
	{ value: "anexo", label: "Anexo" },
	{ value: "almacen", label: "Almacén" },
	{ value: "oficina", label: "Oficina" },
	{ value: "no_registrado", label: "No registrado" },
];

export default function FormUpdateEstablecimiento({
	idEstablecimiento,
	setShowFormUpdateEstablecimiento,
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
		message: messageUpdate,
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
		codigoSunat: "",
	});

	useEffect(() => {
		if (establecimiento) {
			setFormData({
				idEstablecimiento: establecimiento.idEst,
				idResponsable: establecimiento.iduser,
				nombreEstablecimiento: establecimiento.nombres ?? "",
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
			setShowFormUpdateEstablecimiento(false);
		}
	};

	return (
		<ContentPage>
			<HeaderFormPage
				title="Actualizar establecimiento"
				description="Modifica la información registrada y guarda los cambios cuando termines."
				setShowForm={() => setShowFormUpdateEstablecimiento(false)}
			/>

			<ContentSectionProcess
				isLoading={cargandoDatos || !formReady}
				isError={errorDatos}
				textError={messageDatos || "Error al cargar los datos del establecimiento."}
				textButtonError="Reintentar"
				fetchData={() => recargarDatos(establecimientoId)}
			>
				<div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mx-8 my-6 shadow-lg">
					<div className="flex items-center gap-3 mb-6">
						<div className="rounded-xl bg-blue-500/15 p-3 border border-blue-500/20">
							<Building2 className="w-6 h-6 text-blue-400" />
						</div>
						<div>
							<h2 className="text-xl font-semibold text-white">
								{formData.nombreEstablecimiento || "Datos del establecimiento"}
							</h2>
							<p className="text-sm text-gray-400">
								Actualiza responsable, ubicación, coordenadas y tipo de establecimiento.
							</p>
						</div>
					</div>

					<div className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<InputText
								label="Nombre del establecimiento"
								value={formData.nombreEstablecimiento ?? ""}
								htmlForm="nombreEstablecimientoUpdate"
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
								value={formData.departamento ?? ""}
								htmlForm="departamentoUpdate"
								onChange={(value) => setFormData((prev) => ({ ...prev, departamento: value }))}
							/>
							<InputText
								label="Provincia"
								value={formData.provincia ?? ""}
								htmlForm="provinciaUpdate"
								onChange={(value) => setFormData((prev) => ({ ...prev, provincia: value }))}
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<InputText
								label="Distrito"
								value={formData.distrito ?? ""}
								htmlForm="distritoUpdate"
								onChange={(value) => setFormData((prev) => ({ ...prev, distrito: value }))}
							/>
							<InputText
								label="Ubigeo"
								value={formData.ubigeo ?? ""}
								htmlForm="ubigeoUpdate"
								onChange={(value) => setFormData((prev) => ({ ...prev, ubigeo: value }))}
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<InputText
								label="Descripción"
								value={formData.descripcion ?? ""}
								htmlForm="descripcionUpdate"
								onChange={(value) => setFormData((prev) => ({ ...prev, descripcion: value }))}
							/>
							<InputText
								label="Código SUNAT (opcional)"
								value={formData.codigoSunat ?? ""}
								htmlForm="codigoSunatUpdate"
								onChange={(value) => setFormData((prev) => ({ ...prev, codigoSunat: value }))}
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<InputText
								label="Latitud"
								value={formData.latitud ?? ""}
								htmlForm="latitudUpdate"
								onChange={(value) => setFormData((prev) => ({ ...prev, latitud: value }))}
							/>
							<InputText
								label="Longitud"
								value={formData.longitud ?? ""}
								htmlForm="longitudUpdate"
								onChange={(value) => setFormData((prev) => ({ ...prev, longitud: value }))}
							/>
						</div>
					</div>

					{messageUpdate ? (
						<p className={`mt-5 text-sm ${errorUpdate ? "text-rose-300" : "text-emerald-300"}`}>
							{messageUpdate}
						</p>
					) : null}

					<div className="flex gap-4 mt-8">
						<div className="flex flex-row gap-4 w-full justify-end">
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
					</div>
				</div>
			</ContentSectionProcess>
		</ContentPage>
	);
}
