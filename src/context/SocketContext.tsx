import { createContext, useContext, useEffect } from "react";
import { getSocket } from "../socketConexion";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(getSocket);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const {logout} = useAuth()
  
  useEffect(() => {
    getSocket.connect();
    getSocket.on("connect_error", (error) => {
      console.log("conexion de socket no permitido");
      console.log(error.message);

      if (
        error.message === "TOKEN_INVALIDO" ||
        error.message === "TOKEN_EXPIRADO"
      ) {
        logout();
      }
    });

    return () => {
      getSocket.off("connect_error");
      getSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={getSocket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
