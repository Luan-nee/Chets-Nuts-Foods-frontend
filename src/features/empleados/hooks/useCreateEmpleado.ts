import { useState } from 'react';
// importación de clases como servicios
import EmpleadoService from '../services/empleado.service';
import type { CreateEmpleadoData } from '../types/empleado.type';
import type { BodyResponse } from '../../../types/bodyResponse.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  refresh: (body: CreateEmpleadoData) => Promise<BodyResponse<any> | null>;
}

export const useCreateEmpleado = (): FetchState => {
  const empleadoService = new EmpleadoService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Función asíncrona para crear empleado
  const refresh = async (body: CreateEmpleadoData): Promise<BodyResponse<any> | null> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage(null);
      setSuccessMessage(null);
      
      // Limpiar el body: excluir ruc y numeroLicenciaConducir si no es CHOFER
      const cleanBody = { ...body };
      if (cleanBody.tipos !== 'CHOFER') {
        delete cleanBody.ruc;
        delete cleanBody.numeroLicenciaConducir;
      }
      
      const response = await empleadoService.createEmpleado(cleanBody);
      
      // Manejo de respuestas basado en el estado
      if (response.status === 'success') {
        setSuccessMessage(response.message || 'Empleado creado exitosamente');
        return response;
      } else {
        setIsError(true);
        setErrorMessage(response.message || 'Error al crear el empleado');
        return response;
      }
    } catch (error: any) {
      console.error('Fetch error: ', error);
      setIsError(true);
      setErrorMessage(error.message || 'Error al crear el empleado');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, errorMessage, successMessage, refresh };
};