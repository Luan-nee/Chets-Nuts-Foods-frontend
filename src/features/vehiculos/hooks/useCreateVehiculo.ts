import { useState } from 'react';
import Vehiculo from '../../../api/Vehiculos.api';
import type { CreateVehiculo } from '../../../types/vehiculos.type'
import swalAlert from "../../../components/messages/swalAlert"

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: CreateVehiculo) => void;
}

export const useCreateVehiculo = (): FetchState => {
  const vehiculos_api = new Vehiculo();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const createVehiculo = async (body: CreateVehiculo): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await vehiculos_api.createVehiculo(body);
      
      // Manejo de respuestas basado en el estado
      if (response.status === 'success') {
        setMessage('Vehículo creado exitosamente');
        swalAlert({
          status: response.status,
          message: response.message ?? "Vehículo registrado exitosamente",
        })
      } else {
        setIsError(true);
        setMessage('Error al crear el vehículo');
        swalAlert({
          status: response.status,
          message: response.message ?? "Error al registrar vehículo",
        })
      }
    } catch (error: any) {
      setIsError(true);
      setMessage('Se produjo un error al crear el vehículo en el frontend');
      swalAlert({
        status: "warning",
        message: "Se produjo un error al crear el vehículo en el frontend",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    isError, 
    message, 
    execute: createVehiculo 
  };
};