import { useState, useEffect } from 'react';
// importación de clases como servicios
import GreService from '../services/gre.service';
// importación de tipos
import type { DetailedGreType } from '../../../types/gre.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: DetailedGreType | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: () => Promise<void>;
}

export const useFetchDetallesGuiaRemision = (id: number | null): FetchState => {
  const greService = new GreService();
  const [data, setData] = useState<DetailedGreType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      if (id === null) {
        throw new Error("ID de guía de remisión no proporcionado");
      }

      const response = await greService.getDetallesGuiaRemision(id);
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
    console.log("useFetchDetallesGuiaRemision: datos de detalles de guía de remisión obtenidos");
  }, []);

  return { data, isLoading, isError, fetchData};
};