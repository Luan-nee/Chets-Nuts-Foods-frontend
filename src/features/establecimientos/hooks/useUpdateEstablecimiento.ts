import { useState } from "react";
import EstablecimientosApi from "../../../api/Establecimientos.api";
import type { BodyResponse } from "../../../types/bodyResponse.type";
import type { UpdateEstablecimiento } from "../../../types/establecimiento.type";

interface FetchState {
	isLoading: boolean;
	isError: boolean;
	message: string;
	execute: (body: UpdateEstablecimiento) => Promise<BodyResponse<UpdateEstablecimiento>>;
}

export const useUpdateEstablecimiento = (): FetchState => {
	const establecimientos_api = new EstablecimientosApi();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const updateEstablecimiento = async (
		body: UpdateEstablecimiento,
	): Promise<BodyResponse<UpdateEstablecimiento>> => {
		try {
			setIsLoading(true);
			setIsError(false);
			setMessage("");

			const response = await establecimientos_api.actualizarEstablecimiento(body);

			if (response.status === "success") {
				setMessage("Establecimiento actualizado exitosamente");
			} else {
				setIsError(true);
				setMessage("Error al actualizar el establecimiento");
			}

			return response;
		} catch (error: any) {
			setIsError(true);
			setMessage("Se produjo un error al actualizar el establecimiento en el frontend");

			return {
				status: "error",
				message: "Error al actualizar el establecimiento",
			};
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, isError, message, execute: updateEstablecimiento };
};
