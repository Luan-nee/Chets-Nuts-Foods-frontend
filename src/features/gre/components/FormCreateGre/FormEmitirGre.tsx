import { useState } from "react";
import InputSelect from "../../../../components/ui/InputSelect";
import ButtonSubmitForm from "../../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../../components/ui/ButtonCancelForm";
import swalAlert from "../../../../components/messages/swalAlert";
import { motivoTranslado, optionsTipoDocumento, numeroDeSerieGre, modalidadTransporte } from "../../../../config/constantes";
import { useEmitirGre } from "../../hooks/useEmitirGre";
import { useGreContext } from "../../../../context/GreContext";
import type { EmitirGre } from "../../../../types/gre.type";

export default function FormEmitirGre() {
	const { idPaquete } = useGreContext();
	const { execute: emitirGre, isLoading, isError } = useEmitirGre();
	const [formData, setFormData] = useState<EmitirGre>({
		motivoTraslado: "01",
		docDestinatario: "DNI",
		modalidadTransporte: "01",
		codigoTransporte: numeroDeSerieGre,
	});

	const handleEmitirGre = async () => {
		if (idPaquete === null) {
			swalAlert({
				status: "warning",
				message: "Debe seleccionar o registrar un paquete antes de emitir la GRE",
			});
			return;
		}

		await emitirGre(formData, idPaquete);
	};

	return (
		<div className="px-6 py-4 bg-gray-900 mx-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<InputSelect
					label="Motivo de traslado"
					options={motivoTranslado}
					placeholder="Seleccione un motivo"
					valueSelected={formData.motivoTraslado}
					onSelect={(value) =>
						setFormData((prev) => ({
							...prev,
							motivoTraslado: String(value),
						}))
					}
				/>

				<InputSelect
					label="Documento destinatario"
					options={optionsTipoDocumento}
					placeholder="Seleccione tipo de documento"
					valueSelected={formData.docDestinatario}
					onSelect={(value) =>
						setFormData((prev) => ({
							...prev,
							docDestinatario: String(value),
						}))
					}
				/>

				<InputSelect
					label="Modalidad de transporte"
					options={modalidadTransporte}
					placeholder="Modalidad"
					valueSelected={formData.modalidadTransporte}
					onSelect={() =>
						setFormData((prev) => ({
							...prev,
							modalidadTransporte: "01",
						}))
					}
				/>
			</div>

			<div className="flex gap-2">
				<ButtonSubmitForm
					handleSubmit={handleEmitirGre}
					isError={isError}
					isLoading={isLoading}
					textButton="Emitir guia de remision"
					textError="Error al emitir guia de remision"
					color="green"
				/>
				<ButtonCancelForm
					handleCancel={() => {
						setFormData({
							motivoTraslado: "01",
							docDestinatario: "DNI",
							modalidadTransporte: "01",
							codigoTransporte: numeroDeSerieGre,
						});
					}}
					isLoading={isLoading}
					textButton="Cancelar"
					color="red"
				/>
			</div>
		</div>
	);
}
