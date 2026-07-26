import { useEffect, useState } from "react";
import { useAccesosContext } from "../../../context/AccesosContext";
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
  const { getByID, loading } = useAccesosContext();
  const [acceso, setAcceso] = useState<ResponseGetByID | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const getAcceso = async (idAcceso: number = idAccesoConsulta): Promise<
    BodyResponse<ResponseGetByID>
  > => {
    try {
      setIsError(false);
      setMessage("");

      const response = await getByID(idAcceso);

      if (response.status && response.data) {
        setMessage(response.message);
        setAcceso(response.data);
        return {
          status: "success",
          message: response.message,
          data: response.data,
        };
      } else {
        setIsError(true);
        setMessage(response.message || "Error al obtener los datos del acceso");
        return {
          status: "error",
          message: response.message || "Error al obtener los datos del acceso",
        };
      }
    } catch (error: any) {
      setIsError(true);
      return {
        status: "error",
        message: "Error al obtener los datos del acceso",
      };
    }
  };

  useEffect(() => {
    getAcceso(idAccesoConsulta);
  }, [idAccesoConsulta]);

  return {
    acceso,
    isLoading: loading,
    isError,
    message,
    execute: getAcceso,
  };
};
