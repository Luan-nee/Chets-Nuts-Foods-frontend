import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Socket } from "socket.io-client";
import { socket } from "../const";
import type { ResponseGetAll } from "../types/vehiculos.type";
import { NoticacionesMaster } from "../components/messages/NotificationProductDefect";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { logout, auth } = useAuth();

  useEffect(() => {
    if (!auth.token) {
      socket.disconnect();
      return;
    }

    socket.auth = {
      token: auth.token,
    };

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

  useEffect(() => {
    if (!socket) return;

    const recibedVehiculos = (datos: ResponseGetAll) => {
      NoticacionesMaster({
        titulo: "New Vehiculo",
        descripcion: `con placa ${datos.placa} tipo ${datos.tipoVehiculo} `,
        icon: "VEHICULO",
        t:undefined
      });
    };
    const updateVehiculo = (datos:ResponseGetAll)=>{
      NoticacionesMaster({
        titulo: "Update Vehiculo",
        descripcion: `con placa ${datos.placa} tipo ${datos.tipoVehiculo} `,
        icon: "VEHICULO",
        t: undefined,
      });
    }

    socket.on("server::newVehiculo", recibedVehiculos);
    socket.on("server::upVehiculo", updateVehiculo);
    

    return () => {
      socket.off("server::newVehiculo", recibedVehiculos);
      socket.off("server::upVehiculo", updateVehiculo);

    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
