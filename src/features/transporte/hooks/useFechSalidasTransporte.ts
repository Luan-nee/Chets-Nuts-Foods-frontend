import { useState, useEffect } from "react";
// importación de clases como servicios
import SalidaTransporte from "../../../api/SalidaTransporte.api";
// importación de tipos
import type { ResponseGetAll } from "../../../types/salidaTransporte.type";
import type { PaginationInfo } from "../../../types/bodyResponse.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  salidaTransportes: ResponseGetAll[];
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (
    pagina: number,
  ) => Promise<void>;
  setPagina: (pagina: number) => void;
  infoPaginacion: PaginationInfo;
}

export const useFetchSalidaTransportes = (): FetchState => {
  const salidaTransporte_api = new SalidaTransporte();
  const [salidaTransportes, setSalidaTransportes] = useState<ResponseGetAll[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [infoPaginacion, setInfoPaginacion] = useState<PaginationInfo>({
    total_data: 0,
    total_paginas: 0,
    pagina_actual: 1,
    datos_por_pagina: 0,
  });
  const [pagina, setPagina] = useState<number>(1); // Estado para la página actual

  // Función asíncrona para obtener los datos
  const obtenerSalidaTransportes = async (nueva_pagina: number) => {
    try {
      setIsLoading(true);
      setIsError(false);
      
      const response = await salidaTransporte_api.getAll(nueva_pagina);
      
      if (response.status == "success") {
        setMessage("Salida de transportes obtenidos exitosamente");
        setSalidaTransportes(response.data ?? []);
        setInfoPaginacion(response.pagination);
      } else {
        setIsError(true);
        setMessage("Error al obtener las salidas de transporte");
      }
    } catch (error) {
      setIsError(true);
      setMessage("Se produjo un error al obtener las salidas de transporte en el frontend");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    obtenerSalidaTransportes(pagina);
  }, [pagina]);

  return {
    salidaTransportes,
    isLoading,
    isError,
    message,
    setPagina,
    execute: obtenerSalidaTransportes,
    infoPaginacion,
  };
};
