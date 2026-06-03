import { useState, useEffect } from "react";
import Vehiculos from "../../../api/Vehiculos.api";
import type { ResponseGetAll } from "../../../types/vehiculos.type";
import type {
  BodyResponseWithPagination,
  PaginationInfo,
} from "../../../types/bodyResponse.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  vehiculos: ResponseGetAll[];
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (pagina: number) => Promise<
    BodyResponseWithPagination<ResponseGetAll[]>
  >;
  setPagina: (pagina: number) => void;
  infoPaginacion: PaginationInfo;
}

export const useFetchVehiculos = (): FetchState => {
  const vehiculos_api = new Vehiculos();
  const [vehiculos, setVehiculos] = useState<ResponseGetAll[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [pagina, setPagina] = useState<number>(1);
  const [infoPaginacion, setInfoPaginacion] = useState<PaginationInfo>({
    total_data: 0,
    total_paginas: 0,
    pagina_actual: 1,
    datos_por_pagina: 0,
  });
  const getVehiculos = async (pagina: number): Promise<
    BodyResponseWithPagination<ResponseGetAll[]>
  > => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await vehiculos_api.getAllVehiculos(pagina);

      // Manejo de respuestas basado en el estado
      if (response.status === "success") {
        setMessage("Vehículos obtenidos exitosamente");
        setVehiculos(response.data ?? []); // Aseguramos que vehiculos sea un array, incluso si data es undefined
        setInfoPaginacion(response.pagination);
        return response;
      } else {
        setIsError(true);
        setMessage("Error al obtener los vehículos");
        return response;
      }
    } catch (error: any) {
      setIsError(true);
      setMessage("Se produjo un error al obtener los vehículos en el frontend");
      return {
        status: "error",
        message: "Error al obtener los vehículos",
        pagination: infoPaginacion,
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVehiculos(pagina);
  }, [pagina]);

  return {
    vehiculos,
    isLoading,
    isError,
    message,
    execute: getVehiculos,
    setPagina,
    infoPaginacion,
  };
};
