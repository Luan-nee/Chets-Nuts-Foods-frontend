import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {  Socket } from "socket.io-client";
import { socket } from "../const";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { logout,auth } = useAuth()

  useEffect(() => {
    if(!auth.token){
      socket.disconnect()
      return
    }

    socket.auth = {
      token:auth.token
    }
    
    socket.connect();
    socket.on("connect_error", (error) => {
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
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [auth.token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
