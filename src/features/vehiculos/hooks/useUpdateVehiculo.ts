import { useState } from 'react';
import Vehiculos from '../../../api/Vehiculos.api';
import type { UpdateVehiculo } from '../../../types/vehiculos.type'

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: UpdateVehiculo) => void;
}

export const useUpdateVehiculo = (): FetchState => {
  const vehiculos_api = new Vehiculos();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const updateVehiculo = async (body: UpdateVehiculo) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await vehiculos_api.editarVehiculo(body);
      
      // Manejo de respuestas basado en el estado
      if (response.status === 'success') {
        setMessage('Vehículo actualizado exitosamente');
      } else {
        setIsError(true);
        setMessage('Error al actualizar el vehículo');
      }
    } catch (error: any) {
      setIsError(true);
      setMessage('Se produjo un error al actualizar el vehículo en el frontend');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, message, execute: updateVehiculo };
};