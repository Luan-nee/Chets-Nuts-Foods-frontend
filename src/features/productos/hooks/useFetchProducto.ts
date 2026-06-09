import { useState, useEffect } from "react";
// importación de clases como servicios
import ProductoApi from "../../../api/producto.api";
// importación de tipos
import type { ResponseGetProductoById } from "../../../types/producto.type";
import type {
  BodyResponse,
} from "../../../types/bodyResponse.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  producto: ResponseGetProductoById | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (
    idProducto: number,
    nueva_pagina: number
  ) => Promise<BodyResponse<ResponseGetProductoById | null>>;
}

export const useFetchProducto = (idProducto: number, pagina: number): FetchState => {
  const producto_api = new ProductoApi();
  const [producto, setProducto] = useState<ResponseGetProductoById | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const obtenerProducto = async (idProducto: number, nueva_pagina: number) => {
    try {
      setIsLoading(true);
      setIsError(false);
      
      const response = await producto_api.get(nueva_pagina);

      if (response.status == "success") {
        setMessage("Producto obtenido exitosamente");
        // buscamos el producto específico por su ID dentro de la pagina actual.
        const producto = response.data?.find((prod) => prod.idproductdefect === idProducto) ?? null;
        setProducto(producto);
        // Estructurando el resultado para que tenga relacion con el tipo BodyResponse<ResponseGetProductoById | null>.
        return {
          status: "success",
          message: "Producto obtenido exitosamente",
          data: producto
        } as BodyResponse<ResponseGetProductoById>;
      } else {
        setIsError(true);
        setMessage("Error al obtener el producto");
        return {
          status: "error",
          message: "Error al obtener el producto",
          data: null
        } as BodyResponse<null>;
      }
    } catch (error) {
      setIsError(true);
      setMessage("Se produjo un error al obtener el producto en el frontend");
      return {
        status: "error",
        message: "Error al obtener el producto",
        data: null
      } as BodyResponse<null>;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    obtenerProducto(idProducto, pagina);
  }, [idProducto, pagina]);

  return {
    producto,
    isLoading,
    isError,
    message,
    execute: obtenerProducto,
  };
};
