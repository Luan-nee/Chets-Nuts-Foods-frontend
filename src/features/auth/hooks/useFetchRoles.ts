import { useState, useEffect } from 'react';
// importación de clases como servicios
import { UsuarioService } from '../services/usuario.service';
// importación de tipos
import type { roles } from '../../../types/usuario.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  data: roles[] | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: () => Promise<void>;
}

export const useFetchRoles = (): FetchState => {
  const usuarioService = new UsuarioService();
  const [data, setData] = useState<roles[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  // Función asíncrona para obtener los datos
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await usuarioService.getRoles();
      // Manejo de errores basado en el estado y el mensaje de la respuesta
      if (response.status !== "success" || response.data === undefined) {
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
    fetchData();
    console.log("useFetchRoles: datos de roles obtenidos");
  }, []);

  return { data, isLoading, isError, fetchData };
};