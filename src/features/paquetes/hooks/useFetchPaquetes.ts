import { useState, useEffect } from "react";
import PaqueteApi from "../../../api/Paquete.api";
import type { ResponseGetAllPaquetes } from "../../../types/paquete.type";

interface FetchState {
	paquetes: ResponseGetAllPaquetes[];
	isLoading: boolean;
	isError: boolean;
	message: string;
	execute: (idSalidaTransporte: number) => Promise<void>;
}

export const useFetchPaquetes = (
	idSalidaTransporte?: number,
): FetchState => {
	const paquete_api = new PaqueteApi();
	const [paquetes, setPaquetes] = useState<ResponseGetAllPaquetes[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const getPaquetes = async (idSalidaTransporte: number): Promise<void> => {
		try {
			setIsLoading(true);
			setIsError(false);
			setMessage("");

			const response = await paquete_api.obtenerPaquetes(idSalidaTransporte);

			if (response.status === "success") {
				setMessage("Paquetes obtenidos exitosamente");
				setPaquetes(response.data ?? []);
			} else {
				setIsError(true);
				setMessage("Error al obtener los paquetes");
			}
		} catch (error: unknown) {
			setIsError(true);
			setMessage("Se produjo un error al obtener los paquetes en el frontend");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (idSalidaTransporte !== undefined) {
			getPaquetes(idSalidaTransporte);
		}
	}, [idSalidaTransporte]);

	return {
		paquetes,
		isLoading,
		isError,
		message,
		execute: getPaquetes,
	};
};
