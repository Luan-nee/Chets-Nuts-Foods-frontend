import { useState } from "react";
import Vehiculos from "../../../api/Vehiculos.api";
import type { ResponseGetByID } from "../../../types/vehiculos.type"
import type { 
  BodyResponse
} from "../../../types/bodyResponse.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  vehiculo: ResponseGetByID | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (idVehiculo: number) => Promise<
    BodyResponse<ResponseGetByID>
  >;
}

export const useFetchVehiculo = (): FetchState => {
  const vehiculos_api = new Vehiculos();
  const [vehiculo, setVehiculo] = useState<ResponseGetByID | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const getVehiculo = async (idVehiculo: number): Promise<
    BodyResponse<ResponseGetByID>
  > => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await vehiculos_api.getById(idVehiculo);

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Datos del vehículo obtenidos exitosamente");
        setVehiculo(response.data ?? null); // Aseguramos que vehículo sea un objeto, incluso si data es undefined
        return response;
      } else {
        setIsError(true);
        setMessage("Error al obtener los datos del vehículo");
        return response;
      }
    } catch (error: any) {
      setIsError(true);
      setMessage("Se produjo un error al obtener los datos del vehículo en el frontend");
      return {
        status: "error",
        message: "Error al obtener los datos del vehículo",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    vehiculo,
    isLoading,
    isError,
    message,
    execute: getVehiculo,
  };
};
