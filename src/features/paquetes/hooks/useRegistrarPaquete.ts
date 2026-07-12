import { useState } from 'react';
import PaqueteApi from '../../../api/Paquete.api';
import swalAlert from "../../../components/messages/swalAlert";
import type { CreatePaquete } from '../../../types/paquete.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: CreatePaquete) => Promise<number>;
}

export const useRegistrarPaquete = (): FetchState => {
  const paquete_api = new PaqueteApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const registrarPaquete = async (
    bodyPaquete: CreatePaquete,
  ): Promise<number> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await paquete_api.createPaquete(bodyPaquete);

      if (response.status == "success") {
        setMessage("Paquete registrado exitosamente");
        swalAlert({
          status: response.status,
          message: "Paquete registrado exitosamente"
        })
        return response.data?.idPaquete || 777;
      } else {
        setIsError(true);
        setMessage("Error al registrar el paquete");
        swalAlert({
          status: response.status,
          message: response.message ?? "Error al registrar el paquete"
        })
        return 0;
      }
    } catch (error) {
      setIsError(true);
      setMessage("Se produjo un error al registrar el paquete en el frontend");
      swalAlert({
        status: "error",
        message: "Se produjo un error al registrar el paquete en el frontend"
      });
      return 0;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, message, execute: registrarPaquete };
};