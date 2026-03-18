import { useState } from 'react';
// importación de clases como servicios
import ProductoService from '../services/producto.service';
// importación de tipos
import type { ModificarProducto } from '../types/producto.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  refresh: (idProducto: number, body: ModificarProducto) => void;
}

export const useUpdateProducto = (): FetchState => {
  const productoService = new ProductoService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const refresh = async (idProducto: number, bodyProducto: ModificarProducto) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await productoService.modificarProducto(idProducto, bodyProducto);
      // Manejo de errores basado en el estado y el mensaje de la respuesta
      if (response.status !== "success") {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Fetch error: ", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, refresh};
};