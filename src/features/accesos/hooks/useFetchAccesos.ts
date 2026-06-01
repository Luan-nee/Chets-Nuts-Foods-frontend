import { useState, useEffect } from "react";
import Accesos from "../../../api/Accesos.api";
import type { ResponseGetAllColaboradores } from "../../../types/accesos.type";
import type {
  BodyResponseWithPagination,
  PaginationInfo,
} from "../../../types/bodyResponse.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  accesos: ResponseGetAllColaboradores[];
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (pagina: number) => Promise<
    BodyResponseWithPagination<ResponseGetAllColaboradores[]>
  >;
  setPagina: (pagina: number) => void;
  infoPaginacion: PaginationInfo;
}

export const useFetchAccesos = (): FetchState => {
  const accesos_api = new Accesos();
  const [accesos, setAccesos] = useState<ResponseGetAllColaboradores[]>([]);
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

  const getAccesos = async (pagina: number): Promise<
    BodyResponseWithPagination<ResponseGetAllColaboradores[]>
  > => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await accesos_api.getAllColaboradores(pagina);

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Accesos obtenidos exitosamente");
        setAccesos(response.data ?? []); // Aseguramos que accesos sea un array, incluso si data es undefined
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
    getAccesos(pagina);
  }, [pagina]);

  return {
    accesos,
    isLoading,
    isError,
    message,
    execute: getAccesos,
    setPagina,
    infoPaginacion,
  };
};
