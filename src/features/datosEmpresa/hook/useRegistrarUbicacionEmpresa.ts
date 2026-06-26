import { useState } from "react";
import DatosEmpresa from "../../../api/DatosEmpresa.api";
import { InfoError } from "../../../components/messages/InfoError";
import { InfoSuccess } from "../../../components/messages/InfoSuccess";
import type { InfoUbicacionState } from "../../../types/datosEmpresa.type";

interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: InfoUbicacionState) => void;
}

export const useRegistrarUbicacionEmpresa = (): FetchState => {
  const datosEmpresa_api = new DatosEmpresa();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const registrarDatosEmpresarial = async (
    body: InfoUbicacionState,
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await datosEmpresa_api.registraUbicacionEmpresa(body);

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Datos de empresa actualizados exitosamente");
        InfoSuccess("ÉXITO", `Datos de empresa actualizados exitosamente`);
      } else {
        setIsError(true);
        setMessage("Error al actualizar los datos de la empresa");
        InfoError("ERROR", `Error: ${response.message ?? "Error no definido por el backend"}`);
      }
    } catch (error: any) {
      setIsError(true);
      setMessage(
        "Se produjo un error al actualizar los datos de la empresa en el frontend",
      );
      InfoError(
        "ERROR",
        "Error: Se produjo un error al actualizar los datos de la empresa en el frontend",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    isError, 
    message, 
    execute: registrarDatosEmpresarial 
  };
};
