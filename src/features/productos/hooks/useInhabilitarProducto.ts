import { useState, useEffect } from 'react';
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
  const [idProducto, setIdProducto] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const refresh = async (id: number) => {
    setIdProducto(id);
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await productoService.inhabilitarProducto(idProducto as number);
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

  useEffect(() => {
    refresh(idProducto as number);
    console.log("useInhabilitarProducto: el producto ha sido inhabilitado");
  }, []);

  return { isLoading, isError, refresh};
};