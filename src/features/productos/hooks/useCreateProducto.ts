import { useState } from 'react';
// importación de clases como servicios
import ProductoApi from '../../../api/producto.api';
// importación de tipos
import type { CreateProducto } from '../../../types/producto.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: CreateProducto) => void;
}

export const useCreateProducto = (): FetchState => {
  const producto_api = new ProductoApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const registrarProducto = async (bodyProducto: CreateProducto) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await producto_api.create(bodyProducto);
      
      if (response.status == "success") {
        setMessage("Producto registrado exitosamente");
        return response;
      } else {
        setIsError(true);
        setMessage("Error al registrar el producto");
        return response;
      }
    } catch (error) {
      setIsError(true);
      setMessage("Se produjo un error al registrar el producto en el frontend");
      return {
        status: "error",
        message: "Error al registrar el producto"
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, message, execute: registrarProducto };
};