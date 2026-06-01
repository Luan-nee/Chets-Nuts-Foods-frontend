import { useState } from 'react';
import Accesos from '../../../api/Accesos.api';
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
  const accesos_api = new Accesos();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const updateAcceso = async (body: UpdateAcceso): Promise<BodyResponse<string>> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await accesos_api.actualizarAcceso(body);
      
      // Manejo de respuestas basado en el estado
      if (response.status === 'success') {
        setMessage('Acceso actualizado exitosamente');
        return response;
      } else {
        setIsError(true);
        setMessage('Error al actualizar el acceso');
        return response;
      }
    } catch (error: any) {
      setIsError(true);
      setMessage('Se produjo un error al actualizar el acceso en el frontend');
      return {
        status: "error",
        message: "Error al actualizar el acceso"
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, message, execute: updateAcceso };
};