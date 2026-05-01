import { useState, useCallback, useMemo } from 'react';
import type { ResponseSesion, Credenciales, UserRole } from '../../../types/usuario.type';
import LoginService from '../services/login.service';
import type { BodyResponse } from '../../../types/bodyResponse.type';

interface FetchState {
  login: (
    credenciales: Credenciales,
    rol: UserRole,
    accesoRapido: boolean
  ) => Promise<BodyResponse<ResponseSesion> | null>;
  isLoading: boolean;
  error: string | null;
  data: ResponseSesion | null;
}

export const useLogin = (): FetchState => {
  const loginService = useMemo(() => new LoginService(), []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ResponseSesion | null>(null);

  // En tu useLogin.ts
  const login = useCallback(async (credenciales: Credenciales, rol: UserRole, accesoRapido: boolean): Promise<BodyResponse<ResponseSesion> | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginService.login(credenciales, rol, accesoRapido);
      // Si no hay respuesta (problema en el request), retornamos null
      if (!response) {
        setError('Sin respuesta del servidor');
        return null;
      }

      if (response.status === 'success') {
        setData(response.data);
        // Guarda el token en el localStorage, pero en el futuro se espera guardar
        // en una cookie HttpOnly para mayor seguridad
        localStorage.setItem('token', response.data.tokenZ);
        return response as BodyResponse<ResponseSesion>;
      }

      // Si el backend responde con status distinto a success, guardamos el mensaje
      setError(response.message);
      return response as BodyResponse<ResponseSesion>;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [loginService]);

  return { login, isLoading, error, data };
};