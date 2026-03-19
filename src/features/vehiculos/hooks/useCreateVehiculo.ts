import { useState } from 'react';
// importación de clases como servicios
import { VehiculoService } from '../services/vehiculo.service';
// importación de tipos
import type { RegistrarVehiculo } from '../types/vehiculo.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  fetchData: (vehiculo: RegistrarVehiculo) => Promise<void>;
}

export const useCreateVehiculo = (): FetchState => {
  const vehiculoService = new VehiculoService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const fetchData = async (vehiculo: RegistrarVehiculo) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await vehiculoService.registrarVehiculo(vehiculo);
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

