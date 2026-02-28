import { useState, useEffect } from 'react';
// importación de clases como servicios
import GreService from '../services/gre.service';
// importación de tipos
import type { simpleGreType } from '../types/gre.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: simpleGreType[] | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: () => Promise<void>;
}

export const useFetchGuiasRemision = (): FetchState => {
  const greService = new GreService();
  const [data, setData] = useState<simpleGreType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await greService.getGuiasRemision();
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
    console.log("useFetchGuiasRemision: datos de guías de remisión obtenidos");
  }, []);

  return { data, isLoading, isError, fetchData};
};