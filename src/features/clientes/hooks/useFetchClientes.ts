import { useState, useEffect } from "react";
import ClienteApi from "../../../api/Clientes.api";
import type { ResponseGetAllClientes } from "../../../types/clientes.type";
import type {
  BodyResponseWithPagination,
  PaginationInfo,
} from "../../../types/bodyResponse.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  clientes: ResponseGetAllClientes[];
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (pagina: number) => Promise<
    BodyResponseWithPagination<ResponseGetAllClientes[]>
  >;
  setPagina: (pagina: number) => void;
  infoPaginacion: PaginationInfo;
}

export const useFetchClientes = (): FetchState => {
  const cliente_api = new ClienteApi();
  const [clientes, setClientes] = useState<ResponseGetAllClientes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [pagina, setPagina] = useState<number>(1);
  const [infoPaginacion, setInfoPaginacion] = useState<PaginationInfo>({
    total_data: 0,
    total_paginas: 0,
    pagina_actual: 1,
    datos_por_pagina: 0,
  });

  const getClientes = async (pagina: number): Promise<
    BodyResponseWithPagination<ResponseGetAllClientes[]>
  > => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await cliente_api.getClientes(pagina);

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Accesos obtenidos exitosamente");
        setClientes(response.data ?? []); // Aseguramos que accesos sea un array, incluso si data es undefined
        setInfoPaginacion(response.pagination);
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
        pagination: infoPaginacion,
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClientes(pagina);
  }, [pagina]);

  return {
    clientes,
    isLoading,
    isError,
    message,
    execute: getClientes,
    setPagina,
    infoPaginacion,
  };
};
