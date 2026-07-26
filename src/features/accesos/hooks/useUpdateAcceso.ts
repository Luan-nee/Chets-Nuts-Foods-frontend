import { useState } from 'react';
import { useAccesosContext } from '../../../context/AccesosContext';
import type { UpdateAcceso } from '../../../types/accesos.type'
import type { BodyResponse } from '../../../types/bodyResponse.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: UpdateAcceso) => Promise<BodyResponse<string> | null>;
}

export const useUpdateAcceso = (): FetchState => {
  const { updateAcceso, loading } = useAccesosContext();
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const executeUpdate = async (body: UpdateAcceso): Promise<BodyResponse<string>> => {
    try {
      setIsError(false);
      setMessage("");

      const response = await updateAcceso(body);
      
      // Manejo de respuestas basado en el estado
      if (response.status) {
        setMessage(response.message);
        return {
          status: 'success',
          message: response.message,
        };
      } else {
        setIsError(true);
        setMessage(response.message || 'Error al actualizar el acceso');
        return {
          status: 'error',
          message: response.message || 'Error al actualizar el acceso',
        };
      }
    } catch (error: any) {
      setIsError(true);
      return {
        status: "error",
        message: "Error al actualizar el acceso"
      };
    }
  };

  return { isLoading: loading, isError, message, execute: executeUpdate };
};