import { useState, useEffect } from "react";
import Vehiculos from "../../../api/Vehiculos.api";
import type { ResponseGetAll } from "../../../types/vehiculos.type";
import type { PaginationInfo } from "../../../types/bodyResponse.type";

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  vehiculos: ResponseGetAll[];
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: () => Promise<void>;
  setPage: (page: number) => void;
  infoPaginacion: PaginationInfo;
}

export const useFetchVehiculos = (): FetchState => {
  const vehiculos_api = new Vehiculos();
  const [vehiculos, setVehiculos] = useState<ResponseGetAll[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [infoPaginacion, setInfoPaginacion] = useState<PaginationInfo>({
    total_data: 0,
    total_paginas: 0,
    pagina_actual: 1,
    datos_por_pagina: 0,
  });
  const [page, setPage] = useState<number>(1);

  const obtenerVehiculos = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await vehiculos_api.getAllVehiculos(page);

      if (response.status === "success") {
        setMessage("Vehículos obtenidos exitosamente");

        // convertir el la capacidad de carga de string a numero 
        const vehiculosConCapacidad = response.data?.map((vehiculo) => ({
          ...vehiculo,
          capacidadCarga: parseFloat(vehiculo.capacidadCarga),
        })) || [];

        // conversión de kilogramos a toneladas
        const vehiculosConCapacidadEnToneladas = vehiculosConCapacidad.map((vehiculo) => ({
          ...vehiculo,
          capacidadCarga: vehiculo.capacidadCarga / 1000, // Convertir de kg a toneladas
        }));

        // convertimos la capacidad de carga de numero a string con 2 decimales
        const vehiculosFinales = vehiculosConCapacidadEnToneladas.map((vehiculo) => ({
          ...vehiculo,
          capacidadCarga: vehiculo.capacidadCarga.toFixed(2), // Convertir a string con 2 decimales
        }));

        setVehiculos(vehiculosFinales); // Aseguramos que vehiculos sea un array, incluso si data es undefined
        setInfoPaginacion(response.pagination);
      } else {
        setIsError(true);
        setMessage("Error al obtener los vehículos");
      }
    } catch (error: any) {
      setIsError(true);
      setMessage("Se produjo un error al obtener los vehículos en el frontend");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    obtenerVehiculos();
  }, [page]);

  return {
    vehiculos,
    isLoading,
    isError,
    message,
    execute: obtenerVehiculos,
    setPage,
    infoPaginacion,
  };
};
