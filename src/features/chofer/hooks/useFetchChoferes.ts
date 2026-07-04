import { useState, useEffect } from "react";
import Accesos from "../../../api/Accesos.api";
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
  const accesos_api = new Accesos();
  const [choferes, setChoferes] = useState<ResponseGetAllColaboradores[]>([]);
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

  const getChoferes = async (pagina: number): Promise<
    BodyResponseWithPagination<ResponseGetAllColaboradores[]>
  > => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await accesos_api.getAllColaboradores(pagina);
      const dataFiltered = response.data?.filter(item => item.tipos === "CHOFER") ?? [];

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Choferes obtenidos exitosamente");
        setChoferes(dataFiltered ?? []); // Aseguramos que choferes sea un array, incluso si data es undefined
        setInfoPaginacion(response.pagination);
        return response;
      } else {
        setIsError(true);
        setMessage("Error al obtener los choferes");
        return response;
      }
    } catch (error: any) {
      setIsError(true);
      setMessage("Se produjo un error al obtener los choferes en el frontend");
      return {
        status: "error",
        message: "Error al obtener los choferes",
        pagination: infoPaginacion,
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getChoferes(pagina);
  }, [pagina]);

  return {
    choferes,
    isLoading,
    isError,
    message,
    execute: getChoferes,
    setPagina,
    infoPaginacion,
  };
};
