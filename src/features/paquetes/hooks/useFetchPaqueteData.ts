import { useState, useEffect } from "react";
import PaqueteApi from "../../../api/Paquete.api";
import type { ResponseGetPaqueteData } from "../../../types/paquete.type";

interface FetchState {
  paqueteData: ResponseGetPaqueteData | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (idPaquete: number) => Promise<ResponseGetPaqueteData | null>;
}

export const useFetchPaqueteData = (idPaquete?: number): FetchState => {
  const paquete_api = new PaqueteApi();
  const [paqueteData, setPaqueteData] = useState<ResponseGetPaqueteData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const getPaqueteData = async (id: number): Promise<ResponseGetPaqueteData | null> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await paquete_api.obtenerDatosPaquete(id);

      if (response.status === "success" && response.data) {
        setMessage("Datos del paquete obtenidos exitosamente");
        setPaqueteData(response.data);
        return response.data;
      } else {
        setIsError(true);
        setMessage("Error al obtener los datos del paquete");
        return null;
      }
    } catch (error: unknown) {
      setIsError(true);
      setMessage("Se produjo un error al obtener los datos del paquete en el frontend");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (idPaquete !== undefined && idPaquete !== 0) {
      getPaqueteData(idPaquete);
    }
  }, [idPaquete]);

  return {
    paqueteData,
    isLoading,
    isError,
    message,
    execute: getPaqueteData,
  };
};
