import { useEffect, useState } from "react";
import EstablecimientosApi from "../../../api/Establecimientos.api";
import type { ResponseGetByID } from "../../../types/establecimiento.type";

interface FetchState {
	establecimiento: ResponseGetByID | null;
	isLoading: boolean;
	isError: boolean;
	message: string;
	execute: (idEstablecimiento: number) => void;
}

export const useFetchEstablecimiento = (
	idEst: number,
): FetchState => {
	const establecimientos_api = new EstablecimientosApi();
	const [establecimiento, setEstablecimiento] = useState<ResponseGetByID | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const fetchEstablecimiento = async (
		id: number,
	) => {
		try {
			setIsLoading(true);
			setIsError(false);
			setMessage("");

			const response = await establecimientos_api.detallesEstablecimiento(id);

			if (response.status === "success") {
				setMessage("Datos del establecimiento obtenidos exitosamente");
				setEstablecimiento(response.data?.[0] ?? null);
			} else {
				setIsError(true);
				setMessage("Error al obtener los datos del establecimiento");
			}
		} catch (error: any) {
			setIsError(true);
			setMessage("Se produjo un error al obtener los datos del establecimiento en el frontend");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchEstablecimiento(idEst);
	}, [idEst]);

	return {
		establecimiento,
		isLoading,
		isError,
		message,
		execute: fetchEstablecimiento,
	};
};
