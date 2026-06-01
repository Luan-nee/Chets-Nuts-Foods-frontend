import { useState, useEffect } from 'react';
import Accesos from '../../../api/Accesos.api';
import type { ResponseRoles } from '../../../types/accesos.type'
import type { BodyResponse } from '../../../types/bodyResponse.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  roles: ResponseRoles[] ;
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: () => Promise<BodyResponse<ResponseRoles[]>>;
}

export const useFetchRoles = (): FetchState => {
  const accesos_api = new Accesos();
  const [roles, setRoles] = useState<ResponseRoles[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const getRoles = async (): Promise<BodyResponse<ResponseRoles[]>> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await accesos_api.roles();

      // Manejo de respuestas basado en el estado
      if (response.status === 'success') {
        setMessage('Roles obtenidos exitosamente');
        setRoles(response.data ?? []); // Aseguramos que roles sea un array, incluso si data es undefined
        return response;
      } else {
        setIsError(true);
        setMessage('Error al obtener los roles');
        return response;
      }
    } catch (error: any) {
      setIsError(true);
      setMessage('Se produjo un error al obtener los roles en el frontend');
      return {
        status: "error",
        message: "Error al obtener los roles"
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect( () => {
    getRoles();
  }, [])

  return { roles, isLoading, isError, message, execute: getRoles };
};