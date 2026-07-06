import { useState } from 'react';
import PaqueteApi from '../../../api/Paquete.api';
import swalAlert from "../../../components/messages/swalAlert";
import type { ProductoEnPaquete } from '../../../types/constantes.type'

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (bodyPaquetes: ProductoEnPaquete[], idPaquete: number) => Promise<void>;
}

export const useRegistrarProductoEnPaquete = (): FetchState => {
  const paquete_api = new PaqueteApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const registrarPaquete = async (
    bodyPaquetes: ProductoEnPaquete[], 
    idPaquete: number
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await paquete_api.agregarProductoEnPaquete(bodyPaquetes, idPaquete);

      if (response.status == "success") {
        setMessage("Paquete registrado exitosamente");
        swalAlert({
          status: response.status,
          message: "Paquete registrado exitosamente"
        })
      } else {
        setIsError(true);
        setMessage("Error al registrar el paquete");
        swalAlert({
          status: response.status,
          message: response.message ?? "Error al registrar el paquete"
        })
      }
    } catch (error) {
      setIsError(true);
      setMessage("Se produjo un error al registrar el paquete en el frontend");
      swalAlert({
        status: "error",
        message: "Se produjo un error al registrar el paquete en el frontend"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    isError, 
    message, 
    execute: registrarPaquete 
  };
};