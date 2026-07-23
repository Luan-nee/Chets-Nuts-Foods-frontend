import { useState } from 'react';
import PaqueteApi from '../../../api/Paquete.api';
import swalAlert from "../../../components/messages/swalAlert";
import type { CreatePaquete } from '../../../types/paquete.type';

interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (idPaquete: number, body: Partial<CreatePaquete> & { observacion?: string }) => Promise<boolean>;
}

export const useActualizarPaquete = (): FetchState => {
  const paquete_api = new PaqueteApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const actualizarPaquete = async (
    idPaquete: number,
    body: Partial<CreatePaquete> & { observacion?: string },
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await paquete_api.actualizarPaquete(idPaquete, body);

      if (response.status === "success") {
        setMessage("Paquete actualizado exitosamente");
        swalAlert({
          status: response.status,
          message: "Paquete actualizado exitosamente"
        });
        return true;
      } else {
        setIsError(true);
        setMessage("Error al actualizar el paquete");
        swalAlert({
          status: response.status,
          message: response.message ?? "Error al actualizar el paquete"
        });
        return false;
      }
    } catch (error) {
      setIsError(true);
      setMessage("Se produjo un error al actualizar el paquete en el frontend");
      swalAlert({
        status: "error",
        message: "Se produjo un error al actualizar el paquete en el frontend"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, message, execute: actualizarPaquete };
};
