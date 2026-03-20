import { useState } from 'react';
// importación de clases como servicios
import GreService from '../services/gre.service';
// importación de tipos
import type { EmitirGre } from '../types/gre.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  fetchData: (body: EmitirGre) => Promise<void>;
}

export const useEmitirGuiaRemision = (): FetchState => {
  const greService = new GreService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const fetchData = async (body: EmitirGre) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await greService.emitirGre(body);
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

  return { isLoading, isError, fetchData };
};