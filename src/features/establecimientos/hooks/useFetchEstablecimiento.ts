import { useEffect, useState } from "react";
import EstablecimientosApi from "../../../api/Establecimientos.api";
import type { BodyResponse } from "../../../types/bodyResponse.type";
import type { ResponseGetByID } from "../../../types/establecimiento.type";

interface FetchState {
	establecimiento: ResponseGetByID | null;
	isLoading: boolean;
	isError: boolean;
	message: string;
	execute: (idEstablecimiento: number) => Promise<BodyResponse<ResponseGetByID>>;
}

export const useFetchEstablecimiento = (
	idEstablecimiento: number,
): FetchState => {
	const establecimientos_api = new EstablecimientosApi();
	const [establecimiento, setEstablecimiento] = useState<ResponseGetByID | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const fetchEstablecimiento = async (
		id: number,
	): Promise<BodyResponse<ResponseGetByID>> => {
		try {
			setIsLoading(true);
			setIsError(false);
			setMessage("");

			const response = await establecimientos_api.detallesEstablecimiento(id);

			if (response.status === "success") {
				setMessage("Datos del establecimiento obtenidos exitosamente");
				setEstablecimiento(response.data ?? null);
			} else {
				setIsError(true);
				setMessage("Error al obtener los datos del establecimiento");
			}

			return response;
		} catch (error: any) {
			setIsError(true);
			setMessage("Se produjo un error al obtener los datos del establecimiento en el frontend");

			return {
				status: "error",
				message: "Error al obtener los datos del establecimiento",
			};
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (idEstablecimiento > 0) {
			void fetchEstablecimiento(idEstablecimiento);
		}
	}, [idEstablecimiento]);

	return {
		establecimiento,
		isLoading,
		isError,
		message,
		execute: fetchEstablecimiento,
	};
};
