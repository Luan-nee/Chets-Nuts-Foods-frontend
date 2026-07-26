import { useState, useEffect } from 'react';
import { useAccesosContext } from '../../../context/AccesosContext';
import type { ResponseRoles } from '../../../types/accesos.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  roles: ResponseRoles[] | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: () => Promise<void>;
}

export const useFetchRoles = (): FetchState => {
  const { roles: contextRoles, getRoles, loading } = useAccesosContext();
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // Función asíncrona para obtener los datos
  const fetchRoles = async () => {
    try {
      setIsError(false);

      const rolesList = await getRoles();
      if (!rolesList || rolesList.length === 0) {
        throw new Error("No se encontraron roles");
      }
      setMessage("Roles obtenidos exitosamente");
    } catch (error: any) {
      console.error("Fetch error: ", error);
      setIsError(true);
      setMessage(error.message || "Error al obtener los roles");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const mappedRoles: ResponseRoles[] = contextRoles.map((r, i) => ({
    id: i + 1,
    rol: r
  }));

  return { roles: mappedRoles, isLoading: loading, isError, message, execute: fetchRoles };
};