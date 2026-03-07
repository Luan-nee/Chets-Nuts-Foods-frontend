import { useState, useEffect } from 'react';
// importación de clases como servicios
import EstablecimientoService from '../services/establecimientos.service';
// importación de tipos
import type { tipoEstablecimiento } from '../types/establecimiento.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: tipoEstablecimiento[] | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: () => Promise<void>;
}

export const useFetchTipoEstablecimiento = (): FetchState => {
  const establecimientoService = new EstablecimientoService();
  const [data, setData] = useState<tipoEstablecimiento[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await establecimientoService.getTiposEstablecimientos();
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
    console.log("useFetchTiposEstablecimientos: datos de tipos de establecimientos obtenidos");
  }, []);

  return { data, isLoading, isError, fetchData};
};