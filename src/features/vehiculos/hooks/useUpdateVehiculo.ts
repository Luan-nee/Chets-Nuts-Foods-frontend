import { useState } from 'react';
// importación de clases como servicios
import { VehiculoService } from '../services/vehiculo.service';
// importación de tipos
import type { EditarVehiculo } from '../types/vehiculo.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  fetchData: (idVehiculo: number, bodyVehiculo: EditarVehiculo) => Promise<void>;
}

export const useUpdateVehiculo = (): FetchState => {
  const vehiculoService = new VehiculoService();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false); // Estado para la página actual

  // Función asíncrona para obtener los datos
  const fetchData = async (idVehiculo: number, bodyVehiculo: EditarVehiculo) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await vehiculoService.editarVehiculo(idVehiculo, bodyVehiculo);
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

