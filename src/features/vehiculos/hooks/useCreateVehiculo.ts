import { useState } from 'react';
import Vehiculo from '../../../api/Vehiculos.api';
import type { CreateVehiculo, ResponseCreate } from '../../../types/vehiculos.type'
import type { BodyResponse } from '../../../types/bodyResponse.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: CreateVehiculo) => Promise<BodyResponse<ResponseCreate>>;
}

export const useCreateVehiculo = (): FetchState => {
  const vehiculos_api = new Vehiculo();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const createVehiculo = async (body: CreateVehiculo): Promise<BodyResponse<ResponseCreate>> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await vehiculos_api.createVehiculo(body);
      
      // Manejo de respuestas basado en el estado
      if (response.status === 'success') {
        setMessage('Vehículo creado exitosamente');
        return response;
      } else {
        setIsError(true);
        setMessage('Error al crear el vehículo');
        return response;
      }
    } catch (error: any) {
      setIsError(true);
      setMessage('Se produjo un error al crear el vehículo en el frontend');
      return {
        status: "error",
        message: "Error al crear el vehículo"
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, message, execute: createVehiculo };
};