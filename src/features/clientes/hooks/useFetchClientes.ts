import { useState, useEffect } from "react";
import ClienteApi from "../../../api/Clientes.api";
import type { ResponseGetAllClientes } from "../../../types/clientes.type";
import type { BodyResponse } from "../../../types/bodyResponse.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  clientes: ResponseGetAllClientes[];
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: () => Promise<
    BodyResponse<ResponseGetAllClientes[]>
  >;
}

export const useFetchClientes = (): FetchState => {
  const cliente_api = new ClienteApi();
  const [clientes, setClientes] = useState<ResponseGetAllClientes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const getClientes = async (): Promise<
    BodyResponse<ResponseGetAllClientes[]>
  > => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await cliente_api.getClientes();

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Accesos obtenidos exitosamente");
        setClientes(response.data ?? []); // Aseguramos que accesos sea un array, incluso si data es undefined
        return response;
      } else {
        setIsError(true);
        setMessage("Error al obtener los accesos");
        return response;
      }
    } catch (error: any) {
      setIsError(true);
      setMessage("Se produjo un error al obtener los accesos en el frontend");
      return {
        status: "error",
        message: "Error al obtener los accesos",
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  return {
    clientes,
    isLoading,
    isError,
    message,
    execute: getClientes
  };
};
