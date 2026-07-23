import { useState } from 'react';
import PaqueteApi from '../../../api/Paquete.api';
import swalAlert from "../../../components/messages/swalAlert";

interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (idPaquete: number, estado: "CANCELADO" | "HOME") => Promise<boolean>;
}

export const useActualizarEstadoPaquete = (): FetchState => {
  const paquete_api = new PaqueteApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const actualizarEstado = async (
    idPaquete: number,
    estado: "CANCELADO" | "HOME",
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await paquete_api.actualizarEstadoPaquete(idPaquete, estado);

      if (response.status === "success") {
        const actionStr = estado === "CANCELADO" ? "eliminado (cancelado)" : "reactivado";
        setMessage(`Paquete ${actionStr} exitosamente`);
        swalAlert({
          status: response.status,
          message: `Paquete ${actionStr} exitosamente`
        });
        return true;
      } else {
        setIsError(true);
        setMessage("Error al actualizar el estado del paquete");
        swalAlert({
          status: response.status,
          message: response.message ?? "Error al actualizar el estado del paquete"
        });
        return false;
      }
    } catch (error) {
      setIsError(true);
      setMessage("Se produjo un error al actualizar el estado del paquete en el frontend");
      swalAlert({
        status: "error",
        message: "Se produjo un error al actualizar el estado del paquete en el frontend"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, message, execute: actualizarEstado };
};
