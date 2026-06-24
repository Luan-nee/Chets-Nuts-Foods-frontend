import { useState } from "react";
import EstablecimientosApi from "../../../api/Establecimientos.api";
import type { BodyResponse } from "../../../types/bodyResponse.type";
import type { CreateEstablecimiento } from "../../../types/establecimiento.type";

interface FetchState {
	isLoading: boolean;
	isError: boolean;
	message: string;
	execute: (body: CreateEstablecimiento) => Promise<BodyResponse<number>>;
}

export const useCreateEstablecimiento = (): FetchState => {
	const establecimientos_api = new EstablecimientosApi();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const createEstablecimiento = async (
		body: CreateEstablecimiento,
	): Promise<BodyResponse<number>> => {
		try {
			setIsLoading(true);
			setIsError(false);
			setMessage("");

			const response = await establecimientos_api.registrarEstablecimiento(body);

			if (response.status === "success") {
				setMessage("Establecimiento registrado exitosamente");
			} else {
				setIsError(true);
				setMessage("Error al registrar el establecimiento");
			}

			return response;
		} catch (error: any) {
			setIsError(true);
			setMessage("Se produjo un error al registrar el establecimiento en el frontend");

			return {
				status: "error",
				message: "Error al registrar el establecimiento",
			};
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, isError, message, execute: createEstablecimiento };
};
