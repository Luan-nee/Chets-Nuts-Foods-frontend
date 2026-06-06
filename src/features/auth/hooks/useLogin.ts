import { useState } from "react";
import Auth from "../../../api/Auth.api";
import type { AuthResponse, Credenciales } from "../../../types/auth.type";
import type { BodyResponse } from "../../../types/bodyResponse.type";

interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (credenciales: Credenciales) => Promise<BodyResponse<AuthResponse>>
}

export const useLogin = (): FetchState => {
  const auth_api = new Auth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const login = async (body: Credenciales,): Promise<BodyResponse<AuthResponse>> => {
    try {
        setIsLoading(true);
        setIsError(false);

        const response = await auth_api.login(body);

        if (response.status === 'success') {
          setMessage('Login exitoso');
          localStorage.setItem("token", response.data?.tokenZ || "");
          localStorage.setItem("user", response.data?.nombreUser || "");
          localStorage.setItem("rol", response.data?.rol || "");
          return response;
        } else {
          setIsError(true);
          setMessage('error al intentar iniciar sesión');
          return response;
        }
      } catch (err: any) {
        setIsError(true);
        setMessage('Se produjo un error al iniciar sesión en el frontend');
        return {
          status: "error",
          message: "Error al iniciar sesión en el frontend"
        };
      } finally {
        setIsLoading(false);
      }
    }

  return { execute: login, isLoading, isError, message };
};
