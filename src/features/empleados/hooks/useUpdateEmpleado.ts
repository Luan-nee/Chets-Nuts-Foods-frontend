import { useState, useEffect } from 'react';
// importación de clases como servicios
import EmpleadoService from '../services/empleado.service';
// importación de tipos
import type { UpdateEmpleadoData } from '../types/empleado.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: null;
  isLoading: boolean;
  isError: boolean;
  fetchData: (idEmpleado: number, body: UpdateEmpleadoData) => Promise<void>
}

export const useFetchEmpleados = (idEmpleado: number, body: UpdateEmpleadoData): FetchState => {
  const empleadoService = new EmpleadoService();
  const [data, setData] = useState<null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [idEmpleadoUpdate, setIdEmpleadoUpdate] = useState<number>(idEmpleado)

  // Función asíncrona para obtener los datos
  const fetchData = async (idEmpleado: number, body: UpdateEmpleadoData) => {
    setIdEmpleadoUpdate(idEmpleado);
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await empleadoService.UpdateEmpleadoById(idEmpleado, body);
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
    fetchData(idEmpleadoUpdate, body);
    console.log("useFetchEmpleados: datos de empleados obtenidos");
  }, [idEmpleadoUpdate]);

  return { data, isLoading, isError, fetchData };
};