import { useState } from 'react';
// importación de clases como servicios
import ProdutoApi from '../../../api/producto.api';
// importación de tipos
import type { BodyResponse } from '../../../types/bodyResponse.type';
import type { ResponseUpdateProducto, UpdateProducto } from '../../../types/producto.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: UpdateProducto) => Promise<BodyResponse<ResponseUpdateProducto>>;
}

export const useUpdateProducto = (): FetchState => {
  const producto_api = new ProdutoApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const actualizarProducto = async (bodyProducto: UpdateProducto) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await producto_api.update(bodyProducto);
      
      if (response.status === 'success') {
        setMessage('Producto actualizado exitosamente');
        return response;
      } else {
        setIsError(true);
        setMessage('Error al actualizar el producto');
        return response;
      }
    } catch (error) {
      setIsError(true);
      setMessage('Se produjo un error al actualizar el producto en el frontend');
      return {
        status: "error",
        message: "Error al actualizar el producto"
      } as BodyResponse<ResponseUpdateProducto>;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, message, execute: actualizarProducto };
};