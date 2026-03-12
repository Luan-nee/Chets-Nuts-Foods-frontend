import { useState } from 'react';
// importación de clases como servicios
import EmpleadoService from '../services/empleado.service';
// importación de tipos
import type { UpdateEmpleadoData } from '../types/empleado.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  fetchData: (idEmpleado: number, body: UpdateEmpleadoData) => Promise<void>
}

export const useUpdateEmpleado = (): FetchState => {
  const empleadoService = new EmpleadoService();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const fetchData = async (idEmpleado: number, body: UpdateEmpleadoData) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await empleadoService.UpdateEmpleadoById(idEmpleado, body);
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