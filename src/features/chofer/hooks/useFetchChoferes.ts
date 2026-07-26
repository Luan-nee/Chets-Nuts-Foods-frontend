import { useState, useEffect } from "react";
import { useAccesosContext } from "../../../context/AccesosContext";
import type { ResponseGetAllColaboradores } from "../../../types/accesos.type";
import type {
  BodyResponseWithPagination,
  PaginationInfo,
} from "../../../types/bodyResponse.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  choferes: ResponseGetAllColaboradores[];
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (pagina: number) => Promise<
    BodyResponseWithPagination<ResponseGetAllColaboradores[]>
  >;
  setPagina: (pagina: number) => void;
  infoPaginacion: PaginationInfo;
}

export const useFetchChoferes = (): FetchState => {
  const { getAllAccesos, paginacion: contextPaginacion, loading } = useAccesosContext();
  const [choferes, setChoferes] = useState<ResponseGetAllColaboradores[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [pagina, setPagina] = useState<number>(1);

  const getChoferes = async (paginaNum: number): Promise<
    BodyResponseWithPagination<ResponseGetAllColaboradores[]>
  > => {
    try {
      setIsError(false);
      setMessage("");

      const response = await getAllAccesos(paginaNum);
      const dataFiltered = (response.data?.filter(item => item.tipos === "CHOFER") ?? []) as ResponseGetAllColaboradores[];

      if (response.status) {
        setMessage("Choferes obtenidos exitosamente");
        setChoferes(dataFiltered);
        return {
          status: "success",
          message: "Choferes obtenidos exitosamente",
          data: dataFiltered,
          pagination: response.pagination || contextPaginacion,
        };
      } else {
        setIsError(true);
        setMessage(response.message || "Error al obtener los choferes");
        return {
          status: "error",
          message: response.message || "Error al obtener los choferes",
          pagination: contextPaginacion,
        };
      }
    } catch (error: any) {
      setIsError(true);
      return {
        status: "error",
        message: "Error al obtener los choferes",
        pagination: contextPaginacion,
      };
    }
  };

  useEffect(() => {
    getChoferes(pagina);
  }, [pagina]);

  return {
    choferes,
    isLoading: loading,
    isError,
    message,
    execute: getChoferes,
    setPagina,
    infoPaginacion: contextPaginacion,
  };
};
