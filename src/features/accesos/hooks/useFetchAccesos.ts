import { useState, useEffect } from "react";
import { useAccesosContext } from "../../../context/AccesosContext";
import type { ResponseGetAllColaboradores } from "../../../types/accesos.type";
import type {
  PaginationInfo,
} from "../../../types/bodyResponse.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  accesos: ResponseGetAllColaboradores[];
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: () => Promise<void>;
  setPagina: (pagina: number) => void;
  infoPaginacion: PaginationInfo;
}

export const useFetchAccesos = (): FetchState => {
  const { accesos: contextAccesos, getAllAccesos, paginacion: contextPaginacion, loading } = useAccesosContext();
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [pagina, setPagina] = useState<number>(1);

  const getAccesos = async (): Promise<void> => {
    try {
      setIsError(false);
      setMessage("");

      const response = await getAllAccesos(pagina);

      if (response.status) {
        setMessage(response.message);
      } else {
        setIsError(true);
        setMessage(response.message || "Error al obtener los accesos");
      }
    } catch (error: any) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getAccesos();
  }, [pagina]);

  const inicio = (pagina - 1) * 10;
  const final = inicio + 10;
  const pageAccesos = contextAccesos.slice(inicio, final);

  return {
    accesos: pageAccesos as ResponseGetAllColaboradores[],
    isLoading: loading,
    isError,
    message,
    execute: getAccesos,
    setPagina,
    infoPaginacion: contextPaginacion,
  };
};
