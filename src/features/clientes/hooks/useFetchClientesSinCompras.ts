import { useState, useEffect } from "react";
import ClienteApi from "../../../api/Clientes.api";
import type { GetClienteSinCompras } from "../../../types/clientes.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  clientes: GetClienteSinCompras[];
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: () => Promise<void>;
}

export const useFetchClientesSinCompras = (): FetchState => {
  const cliente_api = new ClienteApi();
  const [clientes, setClientes] = useState<GetClienteSinCompras[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const getClientesSinCompras = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await cliente_api.getClientesSinCompras();

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Accesos obtenidos exitosamente");
        setClientes(response.data ?? []); // Aseguramos que accesos sea un array, incluso si data es undefined
      } else {
        setIsError(true);
        setMessage("Error al obtener los accesos");
      }
    } catch (error: any) {
      setIsError(true);
      setMessage("Se produjo un error al obtener los accesos en el frontend");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClientesSinCompras();
  }, []);

  return {
    clientes,
    isLoading,
    isError,
    message,
    execute: getClientesSinCompras
  };
};
