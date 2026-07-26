import { useState } from "react";
import Seguimiento from "../../../api/Seguimiento.api";
import type { 
  ResponseGetAll
} from "../../../types/seguimiento.type";

interface FetchState {
  infoSeguimiento: ResponseGetAll[];
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (idSalidaTransporte: number) => Promise<void>;
}

export const useFetchSeguimientoSalidaTransporte = (): FetchState => {
  const seguimiento_api = new Seguimiento();
  const [seguimientoSalidaTransporte, setseguimientoSalidaTransporte] = useState<ResponseGetAll[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const getSeguimientoSalidaTransporte = async (idSalidaTransporte: number): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await seguimiento_api.seguimientoSalidaTransporte(idSalidaTransporte);

      if (response.status === "success") {
        setMessage("Paquetes obtenidos exitosamente");
        setseguimientoSalidaTransporte(response.data ?? []);
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

  return {
    infoSeguimiento: seguimientoSalidaTransporte,
    isLoading,
    isError,
    message,
    execute: getSeguimientoSalidaTransporte,
  };
};
