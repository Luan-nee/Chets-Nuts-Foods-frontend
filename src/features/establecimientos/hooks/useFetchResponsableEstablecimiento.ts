import { useState, useEffect } from 'react';
// importación de clases como servicios
import EstablecimientoService from '../services/establecimientos.service';
// importación de tipos
import type { responsableEstablecimiento} from '../types/establecimiento.type';
import type { PaginationInfo } from '../../../types/bodyResponse.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: responsableEstablecimiento[] | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: (pagina: number) => Promise<void>;
  setPagina: (pagina: number) => void;
  infoPaginacion: PaginationInfo;
}

export const useFetchResponsableEstablecimiento = (): FetchState => {
  const establecimientoService = new EstablecimientoService();
  const [data, setData] = useState<responsableEstablecimiento[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [infoPaginacion, setInfoPaginacion] = useState<PaginationInfo>({
      total_data: 0,
      total_paginas: 0,
      pagina_actual: 0,
      datos_por_pagina: 0,
    });
    const [pagina, setPagina] = useState<number>(1); // Estado para la página actual

  // Función asíncrona para obtener los datos
  const fetchData = async (nueva_pagina: number) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await establecimientoService.getResponsablesEstablecimiento(nueva_pagina);
      // Manejo de errores basado en el estado y el mensaje de la respuesta
      if (response.status !== "success") {
        throw new Error(response.message);
      }

      setData(response.data);
      setInfoPaginacion(response.pagination);
    } catch (error) {
      console.error("Fetch error: ", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagina);
    console.log("useFetchResponsableEstablecimiento: datos de responsables obtenidos");
  }, []);

  return { data, isLoading, isError, setPagina, fetchData, infoPaginacion};
};