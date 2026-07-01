import { useState } from "react";
import DatosEmpresa from "../../../api/DatosEmpresa.api";
import type { UpdateDatosEmpresa } from "../../../types/datosEmpresa.type";
import swalAlert from "../../../components/messages/swalAlert";

interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: UpdateDatosEmpresa) => void;
}

export const registrarInfoEmpresarial = (): FetchState => {
  const datosEmpresa_api = new DatosEmpresa();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const registrarDatosEmpresarial = async (
    body: UpdateDatosEmpresa,
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await datosEmpresa_api.registrarDatosEmpresarial(body);

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Datos de empresa actualizados exitosamente");
        swalAlert({
          status: response.status,
          message: response.message ?? "Datos de empresa actualizados exitosamente"
        });
      } else {
        setIsError(true);
        setMessage("Error al actualizar los datos de la empresa");
        swalAlert({
          status: response.status,
          message: response.message ?? "Error al actualizar los datos de la empresa"
        });
      }
    } catch (error: any) {
      setIsError(true);
      setMessage("Se produjo un error al actualizar los datos de la empresa en el frontend",);
      swalAlert({
        status: "warning",
        message: "Se produjo un error al actualizar los datos de la empresa en el frontend"
      })
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
