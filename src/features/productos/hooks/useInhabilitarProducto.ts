import { useState } from 'react';
// importación de clases como servicios
import ProductoService from '../services/producto.service';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  refresh: (idProducto: number) => void;
}

export const useInhabilitarProducto = (): FetchState => {
  const productoService = new ProductoService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const refresh = async (id: number) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await productoService.inhabilitarProducto(id);
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