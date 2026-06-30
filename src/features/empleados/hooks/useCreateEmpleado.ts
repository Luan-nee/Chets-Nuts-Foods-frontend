import { useState } from 'react';
// importación de clases como servicios
import EmpleadoService from '../services/empleado.service';
import type { CreateEmpleadoData } from '../types/empleado.type';
import type { BodyResponse } from '../../../types/bodyResponse.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  refresh: (body: CreateEmpleadoData) => Promise<BodyResponse<any> | null>;
}

export const useCreateEmpleado = (): FetchState => {
  const empleadoService = new EmpleadoService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // Función asíncrona para crear empleado
  const refresh = async (body: CreateEmpleadoData): Promise<BodyResponse<any> | null> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");
      
      // Limpiar el body: excluir ruc y numeroLicenciaConducir si no es CHOFER
      const cleanBody = { ...body };
      if (cleanBody.tipos !== 'CHOFER') {
        delete cleanBody.ruc;
        delete cleanBody.numeroLicenciaConducir;
      }
      
      const response = await empleadoService.createEmpleado(cleanBody);
      
      // Manejo de respuestas basado en el estado
      if (response.status === 'success') {
        setMessage(response.message || 'Empleado creado exitosamente');
        return response;
      } else {
        setIsError(true);
        setMessage(response.message || 'Error al crear el empleado');
        return response;
      }
    } catch (error: any) {
      console.error('Fetch error: ', error);
      setIsError(true);
      setMessage(error.message || 'Error al crear el empleado');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    isError, 
    message, 
    refresh 
  };
};