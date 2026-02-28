import { useState, useEffect } from 'react';
// importación de clases como servicios
import EstablecimientoService from '../services/establecimientos.service';
// importación de tipos
import type { Establecimiento } from '../types/establecimiento.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: Establecimiento[] | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: () => Promise<void>;
}

export const useFetchEstablecimientos = (): FetchState => {
  const establecimientoService = new EstablecimientoService();
  const [data, setData] = useState<Establecimiento[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await establecimientoService.getEstablecimientos();
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
    fetchData();
    console.log("useFetchEstablecimientos: datos de establecimientos obtenidos");
  }, []);

  return { data, isLoading, isError, fetchData};
};