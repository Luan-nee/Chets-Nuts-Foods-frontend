import { useState, useEffect } from 'react';
// importación de clases como servicios
import ClienteService from '../services/Cliente.service';
// importación de tipos
import type { ListarCliente } from '../types/cliente.type';
import type { PaginationInfo } from '../../../types/bodyResponse.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: ListarCliente[] | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: (pagina: number) => Promise<void>;
  setPagina: (pagina: number) => void;
  infoPaginacion: PaginationInfo;
}

export const useFetchClientes = (): FetchState => {
  const clienteService = new ClienteService();
  const [data, setData] = useState<ListarCliente[] | null>(null);
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
  const fetchData = async (pagina: number) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await clienteService.listarClientes(pagina);
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
    console.log("useFetchEmpleados: datos de empleados obtenidos");
  }, [pagina]);

  return { data, isLoading, isError, fetchData, setPagina, infoPaginacion};
};