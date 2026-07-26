import { useState, useEffect } from 'react';
import { useAccesosContext } from '../../../context/AccesosContext';
import type { ResponseRoles } from '../../../types/accesos.type'
import type { BodyResponse } from '../../../types/bodyResponse.type';

// Definimos el tipo de retorno de nuestro Hook
interface FetchState {
  roles: ResponseRoles[] ;
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: () => Promise<BodyResponse<ResponseRoles[]>>;
}

export const useFetchRoles = (): FetchState => {
  const { roles: contextRoles, getRoles, loading } = useAccesosContext();
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const fetchRoles = async (): Promise<BodyResponse<ResponseRoles[]>> => {
    try {
      setIsError(false);
      setMessage("");

      const rolesList = await getRoles();
      const mapped: ResponseRoles[] = rolesList.map((r, i) => ({
        id: i + 1,
        rol: r
      }));

      setMessage("Roles obtenidos exitosamente");
      return {
        status: 'success',
        message: 'Roles obtenidos exitosamente',
        data: mapped
      };
    } catch (error: any) {
      setIsError(true);
      setMessage('Se produjo un error al obtener los roles en el frontend');
      return {
        status: "error",
        message: "Error al obtener los roles"
      };
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