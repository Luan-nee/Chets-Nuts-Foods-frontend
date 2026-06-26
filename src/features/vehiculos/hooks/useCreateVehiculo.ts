import { useState } from 'react';
import Vehiculo from '../../../api/Vehiculos.api';
import { InfoSuccess } from '../../../components/messages/InfoSuccess';
import { InfoError, InfoErrorSwal } from '../../../components/messages/InfoError';
import { InfoWarning } from '../../../components/messages/InfoWarning';
import type { CreateVehiculo } from '../../../types/vehiculos.type'

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
        InfoSuccess('Éxito', `Vehículo creado exitosamente ${response.message ?? 'Mensaje no definido por el backend'}`);
      } else {
        setIsError(true);
        setMessage('Error al crear el vehículo');
        InfoError('Error', `Error al registrar vehículo ${response.message ?? 'Error no definido por el backend'} `);
        InfoErrorSwal('error', `Error al registrar vehículo ${response.message ?? 'Error no definido por el backend'} `);
      }
    } catch (error: any) {
      setIsError(true);
      setMessage('Se produjo un error al crear el vehículo en el frontend');
      InfoWarning('Advertencia', 'Se produjo un error al crear el vehículo en el frontend');
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