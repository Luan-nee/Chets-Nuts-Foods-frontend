import { useState } from "react";
import DatosEmpresa from "../../../api/DatosEmpresa.api";
import type { InfoUbicacionState } from "../../../types/datosEmpresa.type";
import type { BodyResponse } from "../../../types/bodyResponse.type";

interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: InfoUbicacionState) => Promise<BodyResponse<string> | null>;
}

export const useRegistrarUbicacionEmpresa = (): FetchState => {
  const datosEmpresa_api = new DatosEmpresa();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const registrarDatosEmpresarial = async (
    body: InfoUbicacionState,
  ): Promise<BodyResponse<string>> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await datosEmpresa_api.registraUbicacionEmpresa(body);

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Datos de empresa actualizados exitosamente");
        return response;
      } else {
        setIsError(true);
        setMessage("Error al actualizar los datos de la empresa");
        return response;
      }
    } catch (error: any) {
      setIsError(true);
      setMessage(
        "Se produjo un error al actualizar los datos de la empresa en el frontend",
      );
      return {
        status: "error",
        message: "Error al actualizar los datos de la empresa",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, message, execute: registrarDatosEmpresarial };
};
