import { useState, useEffect } from 'react';
// importación de clases como servicios
import EmpleadoService from '../services/empleado.service';
// importación de tipos
import type { DetallesEmpleado } from '../types/empleado.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: DetallesEmpleado | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: (idEmpleado: number) => Promise<void>;
}

export const useFetchEmpleadoById = (id: number): FetchState => {
  const empleadoService = new EmpleadoService();
  const [data, setData] = useState<DetallesEmpleado | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [idEmpleado, setIdEmpleado] = useState<number>(id);

  // Función asíncrona para obtener los datos
  const fetchData = async (idEmpleado: number) => {
    setIdEmpleado(idEmpleado);
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await empleadoService.getEmpleadoById(idEmpleado);
      // Manejo de errores basado en el estado y el mensaje de la respuesta
      if (response.status !== "success") {
        throw new Error(response.message);
      }
      setData(response.data);
    } catch (error) {
      console.error("Fetch error: ", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(idEmpleado);
    console.log("useFetchEmpleadoById: datos del empleado obtenidos");
  }, [idEmpleado]);

  return { data, isLoading, isError, fetchData};
};