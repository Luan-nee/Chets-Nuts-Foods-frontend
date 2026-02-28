import { useState, useEffect } from 'react';
// importación de clases como servicios
import EmpleadoService from '../services/empleado.service';
// importación de tipos
import type { empleado } from '../types/empleado.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: empleado[] | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: () => Promise<void>;
}

export const useFetchEmpleados = (): FetchState => {
  const empleadoService = new EmpleadoService();
  const [data, setData] = useState<empleado[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await empleadoService.getEmpleados();
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
    fetchData();
    console.log("useFetchEmpleados: datos de empleados obtenidos");
  }, []);

  return { data, isLoading, isError, fetchData};
};