import { useState } from 'react';
import Vehiculos from '../../../api/Vehiculos.api';
import type { UpdateVehiculo } from '../../../types/vehiculos.type'
import swalAlert from "../../../components/messages/swalAlert"

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: UpdateVehiculo) => Promise<boolean>;
}

export const useUpdateVehiculo = (): FetchState => {
  const vehiculos_api = new Vehiculos();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const updateVehiculo = async (body: UpdateVehiculo): Promise<boolean> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      // Convertir capacidad de carga a kilogramos
      const payload = {
        ...body,
        capacidadCarga: body.capacidadCarga * 1000,
      };
      const response = await vehiculos_api.editarVehiculo(payload);
      
      // Manejo de respuestas basado en el estado
      if (response.status === 'success') {
        setMessage('Vehículo actualizado exitosamente');
        swalAlert({
          status: response.status,
          message: response.message ?? "Vehículo actualizado exitosamente",
        })
      } else {
        setIsError(true);
        setMessage('Error al actualizar el vehículo');
        swalAlert({
          status: response.status,
          message: response.message ?? "Error al actualizar vehículo",
        })
        return false;
      }
    } catch (error: any) {
      setIsError(true);
      setMessage('Se produjo un error al actualizar el vehículo en el frontend');
      swalAlert({
        status: "warning",
        message: "Se produjo un error al actualizar el vehículo en el frontend"
      })
      return false;
    } finally {
      setIsLoading(false);
    }

    return true;
  };

  return { 
    isLoading, 
    isError, 
    message, 
    execute: updateVehiculo 
  };
};