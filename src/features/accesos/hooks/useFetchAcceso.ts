import { useEffect, useState } from "react";
import Accesos from "../../../api/Accesos.api";
import type { ResponseGetByID } from "../../../types/accesos.type";
import type {
  BodyResponse
} from "../../../types/bodyResponse.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  acceso: ResponseGetByID | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (idAcceso: number) => Promise<
    BodyResponse<ResponseGetByID>
  >;
}

export const useFetchAcceso = (idAccesoConsulta: number): FetchState => {
  const accesos_api = new Accesos();
  const [acceso, setAcceso] = useState<ResponseGetByID | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const getAcceso = async (idAcceso: number = idAccesoConsulta): Promise<
    BodyResponse<ResponseGetByID>
  > => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await accesos_api.getByID(idAcceso);

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Datos del acceso obtenidos exitosamente");
        setAcceso(response.data ?? null); // Aseguramos que acceso sea un objeto, incluso si data es undefined
        return response;
      } else {
        setIsError(true);
        setMessage("Error al obtener los datos del acceso");
        return response;
      }
    } catch (error: any) {
      setIsError(true);
      setMessage("Se produjo un error al obtener los datos del acceso en el frontend");
      return {
        status: "error",
        message: "Error al obtener los datos del acceso",
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAcceso(idAccesoConsulta);
  }, [idAccesoConsulta]);

  return {
    acceso,
    isLoading,
    isError,
    message,
    execute: getAcceso,
  };
};
