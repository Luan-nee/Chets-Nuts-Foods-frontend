import { useState } from 'react';
// importación de clases como servicios
import EmpleadoService from '../services/empleado.service';
import type { DeshabilitarEmpleado } from '../types/empleado.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  refresh: (idProducto: number, body: DeshabilitarEmpleado) => void;
}

export const useInhabilitarEmpleado = (): FetchState => {
  const empleadoService = new EmpleadoService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const refresh = async (idEmpleado: number, body: DeshabilitarEmpleado) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await empleadoService.inhabilitarEmpleado(idEmpleado, body);
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

  return { isLoading, isError, refresh };
};