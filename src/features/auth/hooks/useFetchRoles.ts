import { useState, useEffect } from 'react';
// importación de tipos
import Accesos from '../../../api/Accesos.api';
import type { ResponseRoles } from '../../../types/accesos.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  roles: ResponseRoles[] | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: () => Promise<void>;
}

export const useFetchRoles = (): FetchState => {
  const accesos_api = new Accesos();
  const [roles, setRoles] = useState<ResponseRoles[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  // Función asíncrona para obtener los datos
  const getRoles = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const response = await accesos_api.roles();

      if (response.status !== "success" || response.data === undefined) {
        throw new Error(response.message);
      }
      setRoles(response.data);
    } catch (error) {
      console.error("Fetch error: ", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return { roles, isLoading, isError, message, execute: getRoles };
};