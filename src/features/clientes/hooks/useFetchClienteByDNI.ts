import { useEffect, useState } from "react";
import ClienteApi from "../../../api/Clientes.api";
import swalAlert from "../../../components/messages/swalAlert";
import type { ResponseGetClienteByDNI } from "../../../types/clientes.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  cliente: ResponseGetClienteByDNI | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (dni: string) => Promise<void>;
}

export const useFetchClienteByDNI = (dniCliente: string): FetchState => {
  const cliente_api = new ClienteApi();
  const [cliente, setCliente] = useState<ResponseGetClienteByDNI | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const getClienteByDNI = async (dni: string): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await cliente_api.getClienteByDNI(dni);

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Cliente obtenido exitosamente");
        setCliente(response.data ?? null); // Aseguramos que cliente sea null, incluso si data es undefined
        swalAlert({
          message: response.message ?? "Cliente obtenido exitosamente",
          status: response.status,
        })
        console.log("Cliente obtenido: ", response.data);
      } else {
        setIsError(true);
        setMessage("Error al obtener el cliente");
        swalAlert({
          message: response.message ?? "Error al obtener el cliente",
          status: response.status,
        })
      }
    } catch (error: any) {
      setIsError(true);
      setMessage("Se produjo un error al obtener el cliente en el frontend");
      swalAlert({
        message: "Se produjo un error al obtener el cliente en el frontend",
        status: "warning",
      })
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("dni del cliente seleccionado: ", dniCliente);
    getClienteByDNI(dniCliente);
  }, [dniCliente]);

  return {
    cliente,
    isLoading,
    isError,
    message,
    execute: getClienteByDNI
  };
};
