import { useState, useEffect } from 'react';
// importación de clases como servicios
import { VehiculoService } from '../services/vehiculo.service';
// importación de tipos
import type { DetalleVehiculoModificado } from '../types/vehiculo.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: DetalleVehiculoModificado | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: (idVehiculo: number) => Promise<void>;
}

export const useFetchVehiculo = (idVehiculoProp: number): FetchState => {
  const vehiculoService = new VehiculoService();
  const [idVehiculoState, setIdVehiculoState] = useState<number>(idVehiculoProp);
  const [data, setData] = useState<DetalleVehiculoModificado | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Función asíncrona para obtener los datos
  const fetchData = async (idVehiculo: number) => {
    setIdVehiculoState(idVehiculo);
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await vehiculoService.obtenerDetallesVehiculo(idVehiculo);
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
    fetchData(idVehiculoState);
    console.log("useFetchVehiculos: datos de vehículos obtenidos");
  }, [idVehiculoState]);

  return { data, isLoading, isError, fetchData };
};

