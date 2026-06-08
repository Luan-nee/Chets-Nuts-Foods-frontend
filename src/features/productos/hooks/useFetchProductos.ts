import { useState, useEffect } from "react";
// importación de clases como servicios
import ProductoApi from "../../../api/producto.api";
// importación de tipos
import type { ResponseGetAllProductos } from "../../../types/producto.type";
import type {
  BodyResponseWithPagination,
  PaginationInfo,
} from "../../../types/bodyResponse.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  productos: ResponseGetAllProductos[];
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (
    pagina: number,
  ) => Promise<BodyResponseWithPagination<ResponseGetAllProductos[]>>;
  setPagina: (pagina: number) => void;
  infoPaginacion: PaginationInfo;
}

export const useFetchProductos = (): FetchState => {
  const producto_api = new ProductoApi();
  const [productos, setProductos] = useState<ResponseGetAllProductos[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [infoPaginacion, setInfoPaginacion] = useState<PaginationInfo>({
    total_data: 0,
    total_paginas: 0,
    pagina_actual: 1,
    datos_por_pagina: 0,
  });
  const [pagina, setPagina] = useState<number>(1); // Estado para la página actual

  // Función asíncrona para obtener los datos
  const obtenerProductos = async (nueva_pagina: number) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await producto_api.get(nueva_pagina);

      if (response.status == "success") {
        setMessage("Productos obtenidos exitosamente");
        setProductos(response.data ?? []);
        setInfoPaginacion(response.pagination);
        return response;
      } else {
        setIsError(true);
        setMessage("Error al obtener los productos");
        return response;
      }
    } catch (error) {
      setIsError(true);
      setMessage("Se produjo un error al obtener los productos en el frontend");
      return {
        status: "error",
        message: "Error al obtener los productos",
        data: [],
        pagination: {
          total_data: 0,
          total_paginas: 0,
          pagina_actual: nueva_pagina,
          datos_por_pagina: 0,
        },
      } as BodyResponseWithPagination<ResponseGetAllProductos[]>;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    obtenerProductos(pagina);
  }, [pagina]);

  return {
    productos,
    isLoading,
    isError,
    message,
    setPagina,
    execute: obtenerProductos,
    infoPaginacion,
  };
};
