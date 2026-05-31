import { useState, useCallback, useMemo } from "react";
import type { UserRole } from "../../../types/constantes.type";
import type { AuthResponse, Credenciales } from "../../../types/auth.type";
import LoginService from "../services/login.service";
import type { BodyResponse } from "../../../types/bodyResponse.type";

interface FetchState {
  login: (
    credenciales: Credenciales,
    rol: UserRole,
    accesoRapido: boolean,
  ) => Promise<BodyResponse<AuthResponse> | null>;
  isLoading: boolean;
  error: string | null;
  data: AuthResponse | null;
}

export const useLogin = (): FetchState => {
  const loginService = useMemo(() => new LoginService(), []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AuthResponse | null>(null);

  // En tu useLogin.ts
  const login = useCallback(
    async (
      credenciales: Credenciales,
      rol: UserRole,
      accesoRapido: boolean,
    ): Promise<BodyResponse<AuthResponse> | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await loginService.login(
          credenciales,
          rol,
          accesoRapido,
        );
        // Si no hay respuesta (problema en el request), retornamos null
        if (!response) {
          setError("Sin respuesta del servidor");
          return null;
        }

        if (response.status === "success"  && response.data !==undefined) {
          setData(response.data);
          // Guarda el token en el localStorage, pero en el futuro se espera guardar
          // en una cookie HttpOnly para mayor seguridad
          localStorage.setItem("token", response.data.tokenZ);
          return response as BodyResponse<AuthResponse>;
        }

        // Si el backend responde con status distinto a success, guardamos el mensaje
        setError(response.message);
        return response as BodyResponse<AuthResponse>;
      } catch (err: any) {
        setError(err.message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [loginService],
  );

  return { login, isLoading, error, data };
};
