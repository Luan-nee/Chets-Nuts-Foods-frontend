import { useState } from "react";
import ClienteApi from "../../../api/Clientes.api";
import type {
  CreateCliente
} from "../../../types/clientes.type";
import swalAlert from "../../../components/messages/swalAlert";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (
    body: CreateCliente,
  ) => Promise<boolean>;
}

export const useCreateCliente = (): FetchState => {
  const cliente_api = new ClienteApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const createCliente = async (
    body: CreateCliente,
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      if (!body.ruc || body.ruc.trim() === "") {
        delete body.ruc;
      }

      if (!body.tipo || body.tipo.trim() === "") {
        delete body.tipo;
      }

      const response = await cliente_api.createCliente(body);

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Acceso creado exitosamente");
        swalAlert({
          status: "success",
          message: `${response.message || "Cliente registrador exitosamente"}`
        })
        return true;
      } else {
        setIsError(true);
        setMessage("Error al crear el acceso");
        swalAlert({
          status: "error",
          message: `${response.message || "Error al registrar al cliente"}`
        })
        return false;
      }
    } catch (error: any) {
      setIsError(true);
      setMessage("Se produjo un error al crear el acceso en el frontend");
      swalAlert({
        status: "error",
        message: "Se produjo un error al registrar un cliente en el frontend"
      })
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    isError, 
    message, 
    execute: createCliente 
  };
};
