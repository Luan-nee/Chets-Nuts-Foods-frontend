import { useState } from "react";
import ClienteApi from "../../../api/Clientes.api";
import type { UpdateCliente } from "../../../types/clientes.type";
import swalAlert from "../../../components/messages/swalAlert";

interface FetchState {
	isLoading: boolean;
	isError: boolean;
	message: string;
	execute: (body: UpdateCliente) => Promise<boolean>;
}

export const useUpdateCliente = (): FetchState => {
	const cliente_api = new ClienteApi();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const updateCliente = async (body: UpdateCliente): Promise<boolean> => {
		try {
			setIsLoading(true);
			setIsError(false);
			setMessage("");

			const response = await cliente_api.updateCliente(body);

			if (response.status === "success") {
				setMessage("Cliente actualizado exitosamente");
				swalAlert({
					status: response.status,
					message: response.message ?? "Cliente actualizado exitosamente",
				});
				return true;
			} else {
				setIsError(true);
				setMessage("Error al actualizar el cliente");
				swalAlert({
					status: response.status,
					message: response.message ?? "Error al actualizar el cliente",
				});
				return false;
			}
		} catch (error: any) {
			setIsError(true);
			setMessage("Se produjo un error al actualizar el cliente en el frontend");
			swalAlert({
				status: "warning",
				message: "Se produjo un error al actualizar el cliente en el frontend",
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
		execute: updateCliente,
	};
};
