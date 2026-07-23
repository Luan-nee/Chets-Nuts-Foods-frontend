import { useState } from "react";
import SalidaTransporteApi from "../../../api/SalidaTransporte.api";
import swalAlert from "../../../components/messages/swalAlert";
import type { UpdateSalidaTransporte } from "../../../types/salidaTransporte.type";

interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: UpdateSalidaTransporte) => Promise<boolean>;
}

export const useActualizarSalidaTransporte = (): FetchState => {
  const api = new SalidaTransporteApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const updateSalida = async (body: UpdateSalidaTransporte): Promise<boolean> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await api.update(body);

      if (response.status === "success") {
        setMessage("Salida de transporte actualizada exitosamente");
        swalAlert({
          status: "success",
          message: response.message || "Salida de transporte actualizada exitosamente"
        });
        return true;
      } else {
        setIsError(true);
        setMessage("Error al actualizar la salida de transporte");
        swalAlert({
          status: "error",
          message: response.message || "Error al actualizar la salida de transporte"
        });
        return false;
      }
    } catch {
      setIsError(true);
      setMessage("Se produjo un error al actualizar la salida de transporte en el frontend");
      swalAlert({
        status: "error",
        message: "Se produjo un error al actualizar la salida de transporte en el frontend"
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
    execute: updateSalida
  };
};
