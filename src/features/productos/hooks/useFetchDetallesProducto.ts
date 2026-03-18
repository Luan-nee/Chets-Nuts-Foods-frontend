import { useState, useEffect } from 'react';
// importación de clases como servicios
import ProductoService from '../services/producto.service';
// importación de tipos
import type { DetallesProducto } from '../types/producto.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: DetallesProducto | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: (idProducto: number) => Promise<void>;
}

export const useFetchDetallesProducto = (idProducto: number): FetchState => {
  const productoService = new ProductoService();
  const [data, setData] = useState<DetallesProducto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [idProductoState, setIdProductoState] = useState<number>(idProducto);

  // Función asíncrona para obtener los datos
  const fetchData = async (idProducto: number) => {
    setIdProductoState(idProducto);
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await productoService.getDetallesProducto(idProducto);
      // Manejo de errores basado en el estado y el mensaje de la respuesta
      if (response.status !== "success") {
        throw new Error(response.message);
      }
      setData(response.data);
    } catch (error) {
      console.error("Fetch error: ", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(idProductoState);
    console.log("useFetchDetallesProducto: datos de producto obtenidos");
  }, [idProductoState]);

  return { data, isLoading, isError, fetchData };
};