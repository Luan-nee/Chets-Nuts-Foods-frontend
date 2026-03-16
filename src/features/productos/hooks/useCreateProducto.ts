import { useState, useEffect } from 'react';
// importación de clases como servicios
import ProductoService from '../services/producto.service';
// importación de tipos
import type { CrearProducto } from '../types/producto.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  refresh: (body: CrearProducto) => void;
}

export const useCreateProducto = (): FetchState => {
  const productoService = new ProductoService();
  const [body, setBody] = useState<CrearProducto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const refresh = async (bodyProducto: CrearProducto) => {
    setBody(bodyProducto);
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await productoService.registrarProducto(body as CrearProducto);
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
    refresh(body as CrearProducto);
    console.log("useCreateProducto: los datos de producto ha sido registrado");
  }, []);

  return { isLoading, isError, refresh};
};