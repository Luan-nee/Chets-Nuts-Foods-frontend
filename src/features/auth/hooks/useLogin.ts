import { useState } from "react";
import Auth from "../../../api/Auth.api";
import { useAuth } from "../../../context/AuthContext";
import swalAlert from "../../../components/messages/swalAlert";
import type { Credenciales } from "../../../types/auth.type";
import { useNavigate } from "react-router-dom";

interface FetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (credenciales: Credenciales) => Promise<void>;
}

export const useLogin = (): FetchState => {
  const auth_api = new Auth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { guardarInformacionLogin } = useAuth();
  const navigate = useNavigate();

  const login = async (
    body: Credenciales,
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);

      const response = await auth_api.login(body);

      if (response.status === "success") {
        setMessage("Login exitoso");
        swalAlert({
          status: "success",
          message: response.message || "Login exitoso",
        });
        guardarInformacionLogin({
          user: response.data?.nombreUser || null,
          token: response.data?.tokenZ || null,
          rol: response.data?.rol || null,
        });
        navigate("/");
      } else {
        setIsError(true);
        setMessage("error al intentar iniciar sesión");
        swalAlert({
          status: "error",
          message: response.message || "error al intentar iniciar sesión",
        });
      }
    } catch (err: any) {
      setIsError(true);
      setMessage("Se produjo un error al iniciar sesión en el frontend");
      swalAlert({
        status: "warning",
        message: "Se produjo un error al iniciar sesión en el frontend",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    execute: login,
    isLoading,
    isError,
    message,
  };
};
