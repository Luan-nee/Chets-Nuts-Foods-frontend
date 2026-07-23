import { useState } from "react";
import SalidaTransporteApi from "../../../api/SalidaTransporte.api";
import swalAlert from "../../../components/messages/swalAlert";
import type { CreateSalidaTransporte } from "../../../types/salidaTransporte.type";

interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: CreateSalidaTransporte) => Promise<number>;
}

export const useRegistrarSalidaTransporte = (): FetchState => {
  const salida_transporte_api = new SalidaTransporteApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const createSalidaTransporte = async (
    body: CreateSalidaTransporte,
  ): Promise<number> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await salida_transporte_api.create(body);

      if (response.status === "success") {
        setMessage("Salida de transporte registrado exitosamente");
        swalAlert({
          status: "success",
          message: `${response.message || "Salida de transporte registrado exitosamente"}`
        })
        return response.data?.idSalidaTransporte || 777;
      } else {
        setIsError(true);
        setMessage("Error al registrar la salida de transporte");
        swalAlert({
          status: "error",
          message: `${response.message || "Error al registrar la salida de transporte"}`
        })
        return 0;
      }
    } catch {
      setIsError(true);
      setMessage("Se produjo un error al registrar la salida de transporte en el frontend");
      swalAlert({
        status: "error",
        message: "Se produjo un error al registrar la salida de transporte en el frontend"
      })
      return 0;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    isError, 
    message, 
    execute: createSalidaTransporte 
  };
};
