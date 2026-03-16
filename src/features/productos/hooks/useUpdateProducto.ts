import { useState, useEffect } from 'react';
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
  const [idProducto, setIdProducto] = useState<number | null>(null);
  const [body, setBody] = useState<ModificarProducto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const refresh = async (idProducto: number, bodyProducto: ModificarProducto) => {
    setIdProducto(idProducto);
    setBody(bodyProducto);
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await productoService.modificarProducto(idProducto as number, body as ModificarProducto);
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
    refresh(idProducto as number, body as ModificarProducto);
    console.log("useUpdateProducto: los datos de producto han sido actualizados");
  }, []);

  return { isLoading, isError, refresh};
};