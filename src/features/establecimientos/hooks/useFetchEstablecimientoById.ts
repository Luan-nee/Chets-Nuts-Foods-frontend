import { useState, useEffect } from 'react';
// importación de clases como servicios
import EstablecimientoService from '../services/establecimientos.service';
// importación de tipos
import type { EstablecimientoUpdate } from '../types/establecimiento.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: EstablecimientoUpdate | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: (id: number) => Promise<void>;
}

export const useFetchEstablecimientoById = (id: number): FetchState => {
  const establecimientoService = new EstablecimientoService();
  const [data, setData] = useState<EstablecimientoUpdate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [idEstablecimiento, setIdEstablecimiento] = useState<number>(id);

  // Función asíncrona para obtener los datos
  const fetchData = async (id: number) => {
    setIdEstablecimiento(id);
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await establecimientoService.getEstablecimientoById(idEstablecimiento);
      // Manejo de errores basado en el estado y el mensaje de la respuesta
      if (response.status !== "success") {
        throw new Error(response.message);
      }

      setData(response.data);
    } catch (error) {
      console.error("Fetch error: ", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(idEstablecimiento);
    console.log("useFetchEstablecimientos: datos de un establecimiento obtenidos");
  }, [idEstablecimiento]);

  return { data, isLoading, isError, fetchData};
};