import { useState } from "react";
import GreApi from "../../../api/gre.api";
import type { EmitirGre } from "../../../types/gre.type";
import swalAlert from "../../../components/messages/swalAlert";
import { useNavigate } from "react-router-dom";

interface FetchState {
	isLoading: boolean;
	isError: boolean;
	message: string;
	execute: (body: EmitirGre, idPaquete: number) => Promise<void>;
}

export const useEmitirGre = (): FetchState => {
	const gre_api = new GreApi();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const navigate = useNavigate();

	const emitirGre = async (body: EmitirGre, idPaquete: number): Promise<void> => {
		try {
			setIsLoading(true);
			setIsError(false);
			setMessage("");

			const response = await gre_api.emitirGre(body, idPaquete);

			if (response.status === "success") {
				setMessage("GRE emitida exitosamente");
				swalAlert({
					status: "success",
					message: `${response.message || "Guia de remision emitida exitosamente"}`,
				});
				window.open(response.data?.pdf || "https://www.google.com", "_blank");
				navigate("/guias");
			} else {
				setIsError(true);
				setMessage("Error al emitir la GRE");
				swalAlert({
					status: "error",
					message: `${response.message || "Error al emitir la guia de remision"}`,
				});
			}
		} catch (error: any) {
			setIsError(true);
			setMessage("Se produjo un error al emitir la GRE en el frontend");
			swalAlert({
				status: "error",
				message: "Se produjo un error al emitir la GRE en el frontend",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		isError,
		message,
		execute: emitirGre,
	};
};
