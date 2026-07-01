import { useState } from 'react';
import swalAlert from "../../../components/messages/swalAlert"
// importación de clases
import ProdutoApi from '../../../api/producto.api';
// importación de tipos
import type { UpdateProducto } from '../../../types/producto.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: UpdateProducto) => Promise<void>;
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
        swalAlert({
          status: response.status,
          message: response.message ?? "Producto actualizado exitosamente"
        });
      } else {
        setIsError(true);
        setMessage('Error al actualizar el producto');
        swalAlert({
          status: response.status,
          message: response.message ?? "Error al actualizar el producto"
        })
      }
    } catch (error) {
      setIsError(true);
      setMessage('Se produjo un error al actualizar el producto en el frontend');
      swalAlert({
        status: 'warning',
        message: 'Se produjo un error al actualizar el producto en el frontend'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    isError, 
    message, 
    execute: actualizarProducto 
  };
};