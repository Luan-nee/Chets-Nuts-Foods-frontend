import { useState, useEffect } from 'react';
import EstablecimientosApi from '../../../api/Establecimientos.api';
import type { ResponseGetAll } from '../../../types/establecimiento.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  establecimientos: ResponseGetAll[];
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: () => Promise<void>;
}

export const useFetchEstablecimientos = (): FetchState => {
  const establecimiento_api = new EstablecimientosApi();
  const [establecimientos, setEstablecimientos] = useState<ResponseGetAll[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // Función asíncrona para obtener los datos
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage('');

      const response = await establecimiento_api.obtenerEstablecimientos();

      if (response.status == 'success') {
        setMessage('Establecimientos obtenidos exitosamente');
        setEstablecimientos(response.data ?? []);
      }else {
        setIsError(true);
        setMessage('Error al obtener los establecimientos');
      }
    } catch (error: any) {
      setIsError(true);
      setMessage('Se produjo un error al obtener los establecimientos en el frontend');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { establecimientos, isLoading, isError, message, execute: fetchData};
};