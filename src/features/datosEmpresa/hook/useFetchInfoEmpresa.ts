import { useState, useEffect } from "react";
import DatosEmpresa from "../../../api/DatosEmpresa.api";
import type { ResponseObtenerInfoEmpresa } from "../../../types/datosEmpresa.type";
import { InfoError } from "../../../components/messages/InfoError"
import { InfoSuccess } from "../../../components/messages/InfoSuccess"

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  infoEmpresa: ResponseObtenerInfoEmpresa | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: () => void;
}

export const useFetchInfoEmpresa = (): FetchState => {
  const datos_empresa_api = new DatosEmpresa();
  const [infoEmpresa, setInfoEmpresa] = useState<ResponseObtenerInfoEmpresa | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const getInfoEmpresa = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await datos_empresa_api.obtenerInfoEmpresa();

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Información de la empresa obtenida exitosamente");
        setInfoEmpresa(response.data ?? null); // Aseguramos que infoEmpresa sea un objeto, incluso si data es undefined
        InfoSuccess("ÉXITO" ,`Información de la empresa obtenida exitosamente`);
      } else {
        setIsError(true);
        setMessage("Los datos de la empresa no se encuentran registrados");
        InfoError("ERROR" ,`Error: ${response.message}`);
      }
    } catch (error: any) {
      setIsError(true);
      setMessage("Se produjo un error al obtener la información de la empresa en el frontend");
      InfoError("ERROR" , "Error: Se produjo un error al obtener la información de la empresa en el frontend");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfoEmpresa();
  }, []);

  return {
    infoEmpresa,
    isLoading,
    isError,
    message,
    execute: getInfoEmpresa
  };
};
