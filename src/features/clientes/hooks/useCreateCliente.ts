import { useState } from "react";
import ClienteApi from "../../../api/Clientes.api";
import type {
  CreateCliente,
  ResponseCreateCliente,
} from "../../../types/clientes.type";
import type { BodyResponse } from "../../../types/bodyResponse.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (
    body: CreateCliente,
  ) => Promise<BodyResponse<ResponseCreateCliente>>;
}

export const useCreateCliente = (): FetchState => {
  const cliente_api = new ClienteApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const createCliente = async (
    body: CreateCliente,
  ): Promise<BodyResponse<ResponseCreateCliente>> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await cliente_api.createCliente(body);

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Acceso creado exitosamente");
        return response;
      } else {
        setIsError(true);
        setMessage("Error al crear el acceso");
        return response;
      }
    } catch (error: any) {
      setIsError(true);
      setMessage("Se produjo un error al crear el acceso en el frontend");
      return {
        status: "error",
        message: "Error al crear el acceso",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, message, execute: createCliente };
};
