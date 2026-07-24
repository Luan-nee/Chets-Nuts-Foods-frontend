import { useState, useEffect } from 'react';
import GreService from '../../../api/gre.api';
import type { ResponseGetAll } from '../../../types/gre.type';
import type { PaginationInfo } from '../../../types/bodyResponse.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  guias: ResponseGetAll[] | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (pagina: number) => void;
  setPagina: (pagina: number) => void;
  infoPaginacion: PaginationInfo;
}

export const useFetchGuiasRemision = (): FetchState => {
  const Gre_api = new GreService();
  const [guias, setGuias] = useState<ResponseGetAll[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [pagina, setPagina] = useState<number>(1); // Estado para la página actual
  const [infoPaginacion, setInfoPaginacion] = useState<PaginationInfo>({
    total_data: 0,
    total_paginas: 0,
    pagina_actual: 1,
    datos_por_pagina: 10,
  });
  

  // Función asíncrona para obtener los datos
  const ObtenerGuias = async (nueva_pagina: number) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await Gre_api.ListarGuias(nueva_pagina);
      
      // Manejo de errores basado en el estado y el mensaje de la respuesta
      if (response.status == "success"){
        setMessage("Accesos obtenidos exitosamente");
        setGuias(response.data ?? []);
        setInfoPaginacion(response.pagination);
      } else {
        setIsError(true);
        setMessage("Error al obtener las guias de remisión");
      }
    } catch (error) {
      setIsError(true);
      setMessage("Se produjo un error al obtener las guias de remisión en el frontend");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    ObtenerGuias(pagina);
  }, [pagina]);

  return { 
    guias, 
    isLoading, 
    isError, 
    message, 
    execute: ObtenerGuias, 
    setPagina, 
    infoPaginacion 
  };
};