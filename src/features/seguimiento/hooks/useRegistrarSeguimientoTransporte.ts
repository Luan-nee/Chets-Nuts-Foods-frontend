import { useState } from 'react';
import Seguimiento from '../../../api/Seguimiento.api';
import swalAlert from "../../../components/messages/swalAlert.ts"
import type { RegistrarSeguimiento } from '../../../types/seguimiento.type'

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (body: RegistrarSeguimiento, idSalidaTransporte: number) => Promise<void>;
}

export const useRegistrarSeguimientoTransporte = (): FetchState => {
  const seguimiento_api = new Seguimiento();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const registrarSeguimiento = async (body: RegistrarSeguimiento, idSalidaTransporte: number): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await seguimiento_api.registrarSeguimientoSalidaTransporte(body, idSalidaTransporte);
      
      // Manejo de respuestas basado en el estado
      if (response.status === 'success') {
        setMessage('Seguimiento registrado exitosamente');
        swalAlert({ 
          status: "success", 
          message: response.message ?? "Seguimiento registrado exitosamente", 
        });
      } else {
        setIsError(true);
        setMessage('Error al registrar el seguimiento');
        swalAlert({ 
          status: "error", 
          message: response.message ?? "Error al registrar el seguimiento", 
        });
      }
    } catch (error: any) {
      setIsError(true);
      setMessage('Se produjo un error al registrar el seguimiento en el frontend');
      swalAlert({ 
        status: "warning", 
        message: "Se produjo un error al registrar el seguimiento en el frontend", 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    isError, 
    message, 
    execute: registrarSeguimiento 
  };
};