import { useState } from 'react';
import Vehiculos from '../../../api/Vehiculos.api';
import type { UpdateVehiculo } from '../../../types/vehiculos.type'
import swalAlert from "../../../components/messages/swalAlert"

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

      // Convertir capacidad de carga a kilogramos
      body.capacidadCarga = body.capacidadCarga * 1000;
      const response = await vehiculos_api.editarVehiculo(body);
      
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
      }
    } catch (error: any) {
      setIsError(true);
      setMessage('Se produjo un error al actualizar el vehículo en el frontend');
      swalAlert({
        status: "warning",
        message: "Se produjo un error al actualizar el vehículo en el frontend"
      })
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    isError, 
    message, 
    execute: updateVehiculo 
  };
};