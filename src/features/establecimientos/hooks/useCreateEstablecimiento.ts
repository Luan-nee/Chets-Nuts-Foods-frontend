import { useState } from "react";
import EstablecimientosApi from "../../../api/Establecimientos.api";
import { InfoSuccess } from '../../../components/messages/InfoSuccess';
import { InfoError } from '../../../components/messages/InfoError';
import type { CreateEstablecimiento } from "../../../types/establecimiento.type";

interface FetchState {
	isLoading: boolean;
	isError: boolean;
	message: string;
	execute: (body: CreateEstablecimiento) => void;
}

export const useCreateEstablecimiento = (): FetchState => {
	const establecimientos_api = new EstablecimientosApi();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const createEstablecimiento = async (
		body: CreateEstablecimiento,
	): Promise<void> => {
		try {
			setIsLoading(true);
			setIsError(false);
			setMessage("");

			const response = await establecimientos_api.registrarEstablecimiento(body);

			if (response.status === "success") {
				setMessage("Establecimiento registrado exitosamente");
				InfoSuccess("ESTABLECIMIENTO", "Establecimiento registrado exitosamente");
			} else {
				setIsError(true);
				setMessage("Error al registrar el establecimiento");
				InfoError("ESTABLECIMIENTO", `${response.message ?? "El error no está especificado por el backend"}`);
			}
		} catch (error: any) {
			setIsError(true);0
			setMessage("Se produjo un error al registrar el establecimiento en el frontend");
			InfoError("ESTABLECIMIENTO", "Se produjo un error al registrar el establecimiento en el frontend");
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, isError, message, execute: createEstablecimiento };
};
