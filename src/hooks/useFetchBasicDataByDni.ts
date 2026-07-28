import { useEffect, useState } from "react";
import { useUsuariosContext } from "../context/usuariosContext";
import swalAlert from '../components/messages/swalAlert';
import type { ResponseGetDataBasicByDni } from "../types/usuarios.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
	basicData: ResponseGetDataBasicByDni | null;
	isLoading: boolean;
	isError: boolean;
	message: string;
	execute: (dni: string) => Promise<ResponseGetDataBasicByDni | null>;
}

export const useFetchBasicDataByDni = (dni: string = ""): FetchState => {
	const { getBasicDataByDNI } = useUsuariosContext();
	const [basicData, setBasicData] = useState<ResponseGetDataBasicByDni | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const getBasicDataByDni = async (dniParam: string): Promise<ResponseGetDataBasicByDni | null> => {
		if (!dniParam) {
			setBasicData(null);
			setMessage("Debes proporcionar un DNI válido");
			setIsError(true);
			return null;
		}

		try {
			setIsLoading(true);
			setIsError(false);
			setMessage("");
			setBasicData(null);

			const response = await getBasicDataByDNI(dniParam);

			if (response.status) {
				setMessage(response.message || "Datos básicos obtenidos exitosamente");
				setBasicData(response.data ?? null);
				swalAlert({
					status: "success",
					message: response.message || "Datos básicos obtenidos exitosamente"
				});
				return response.data ?? null;
			}

			setIsError(true);
			setBasicData(null);
			setMessage(response.message || "Error al obtener los datos básicos");
			swalAlert({
				status: "error",
				message: response.message || "Error al obtener los datos básicos"
			});
			return null;
		} catch (error: any) {
			setIsError(true);
			setBasicData(null);
			setMessage("Se produjo un error al obtener los datos básicos en el frontend");
			swalAlert({
				status: "warning",
				message: "Se produjo un error al obtener los datos básicos en el frontend"
			});
			return null;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (dni) {
			getBasicDataByDni(dni);
			return;
		}

		setBasicData(null);
		setIsError(false);
		setMessage("");
	}, [dni]);

	return {
		basicData,
		isLoading,
		isError,
		message,
		execute: getBasicDataByDni,
	};
};
