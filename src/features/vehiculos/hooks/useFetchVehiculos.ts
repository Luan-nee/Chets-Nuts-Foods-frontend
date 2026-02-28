import { useState, useEffect } from 'react';
// importación de clases como servicios
import { VehiculoService } from '../services/vehiculo.service';
// importación de tipos
import type { Vehiculo } from '../types/vehiculo.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: Vehiculo[] | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: () => Promise<void>;
}

export const useFetchVehiculos = (): FetchState => {
  const vehiculoService = new VehiculoService();
  const [data, setData] = useState<Vehiculo[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await vehiculoService.listarVehiculos();
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
    console.log("useFetchVehiculos: datos de vehículos obtenidos");
  }, []);

  return { data, isLoading, isError, fetchData};
};

