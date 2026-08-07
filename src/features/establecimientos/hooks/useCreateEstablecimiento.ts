import { useState } from "react";
import EstablecimientosApi from "../../../api/Establecimientos.api";
import swalAlert from "../../../components/messages/swalAlert";
import type { CreateEstablecimiento } from "../../../types/establecimiento.type";

interface FetchState {
	isLoading: boolean;
	isError: boolean;
	message: string;
	execute: (body: CreateEstablecimiento) => Promise<boolean>;
}

export const useCreateEstablecimiento = (): FetchState => {
	const establecimientos_api = new EstablecimientosApi();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const createEstablecimiento = async (
		body: CreateEstablecimiento,
	): Promise<boolean> => {
		try {
			setIsLoading(true);
			setIsError(false);
			setMessage("");

			const response = await establecimientos_api.registrarEstablecimiento(body);

			if (response.status === "success") {
				setMessage("Establecimiento registrado exitosamente");
				swalAlert({
					status: "success",
					message: response.message || "Establecimiento registrado exitosamente",
				});
				return true;
			} else {
				setIsError(true);
				setMessage("Error al registrar el establecimiento");
				swalAlert({
					status: "error",
					message: response.message || "Error al registrar el establecimiento",
				});
				return false;
			}
		} catch {
			setIsError(true);
			setMessage("Se produjo un error al registrar el establecimiento en el frontend");
			swalAlert({
				status: "warning",
				message: "Se produjo un error al registrar el establecimiento en el frontend",
			});
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	return { 
		isLoading, 
		isError, 
		message, 
		execute: createEstablecimiento 
	};
};
