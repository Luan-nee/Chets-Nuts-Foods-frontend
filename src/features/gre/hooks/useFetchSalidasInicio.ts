import { useState, useEffect } from 'react';
import SalidaTransporte from '../../../api/SalidaTransporte.api';
import type { ResponseGetAll } from '../../../types/salidaTransporte.type';
import { useAuth } from '../../../context/AuthContext';

interface FetchState {
  salidaTransportes: ResponseGetAll[];
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: () => Promise<void>;
}

export const useFetchSalidasInicio = (): FetchState => {
  const api = new SalidaTransporte();
  const { isAuthenticated } = useAuth();
  const [salidaTransportes, setSalidaTransportes] = useState<ResponseGetAll[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const obtenerSalidasInicio = async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await api.getSalidasInicio();

      if (response.status === "success") {
        setMessage("Salidas de transporte obtenidas exitosamente");
        setSalidaTransportes(response.data ?? []);
      } else {
        setIsError(true);
        setMessage("Error al obtener las salidas de transporte");
      }
    } catch {
      setIsError(true);
      setMessage("Se produjo un error al obtener las salidas de transporte en el frontend");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      obtenerSalidasInicio();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return { 
    salidaTransportes, 
    isLoading, 
    isError, 
    message, 
    execute: obtenerSalidasInicio 
  };
};
