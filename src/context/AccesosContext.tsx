import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import { useAuth } from "./AuthContext";
import type { AccesosUser } from "./typesContext";
import { DIRACCESOSLOCAL } from "../const";
import type { CreateAcceso, ResponseGetByID, UpdateAcceso } from "../types/accesos.type";
import Accesos from "../api/Accesos.api";
import Swal from "sweetalert2";



interface AccesosContextTypes {
  accesos: AccesosUser[];
  getAllAccesos: (page: number) => Promise<{ status: boolean; message: string; data?: AccesosUser[] }>;
  updateAcceso: (data: UpdateAcceso) => Promise<{ status: boolean; message: string }>;
  getByID: (id: number) => Promise<{ status: boolean; message: string; data?: ResponseGetByID }>;
  createAcceso: (acceso: CreateAcceso) => Promise<{ status: boolean; message: string }>;
}

const AccesosContext = createContext<AccesosContextTypes | undefined>(undefined);


export const AccesosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socket = useSocket();
  const { logout } = useAuth();
  const consultas = new Accesos();

  const [pageLoads, setPageLoads] = useState<number[]>([]);
  const [accesos, setAccesos] = useState<AccesosUser[]>(() => {
    const stored = localStorage.getItem(DIRACCESOSLOCAL) || "[]";
    return JSON.parse(stored).map((p: AccesosUser) => ({
      ...p,
    }));
  })

  function getByIDtype(accesoVal: ResponseGetByID) {
    if (!accesoVal) return;
    setAccesos(prev => {
      const existe = prev.some(s => s.idacceso === accesoVal.idacceso)
      if (existe) {
        return prev;
      }
      return [{
        correo: accesoVal.correo || "",
        dniuser: accesoVal.dniuser,
        estado: accesoVal.estado,
        estadoacceso: accesoVal.estado,
        idacceso: accesoVal.idacceso,
        nombres: accesoVal.nombres,
        tipos: accesoVal.tipos
      }, ...prev];
    });
  }

  function udpateAccesoType(accesoVal: Partial<AccesosUser>) {
    setAccesos(prev =>
      prev.map(acceso =>
        acceso.idacceso === accesoVal.idacceso
          ? {
            ...acceso,
            correo: accesoVal.correo ? accesoVal.correo : acceso.correo,
            estado: accesoVal.estado ? accesoVal.estado : acceso.estado,
            tipos: accesoVal.tipos ? accesoVal.tipos : acceso.tipos
          }
          : acceso
      )
    );
  }

  useEffect(() => {
    localStorage.setItem(DIRACCESOSLOCAL, JSON.stringify(accesos));
  }, [accesos])

  useEffect(() => {
    if (!socket) return;



    const onServerUserAcceso = (data: AccesosUser) => {
      setAccesos(prev => [...prev, data]);
    }

    const disconnet = (reason: any) => {
      console.log(`Deconectado : ${reason} `);
      Swal.fire({
        title: "Sesión expirada",
        text: "Vuelve a iniciar sesión",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        logout();
      });
    }

    socket.on("server:newAccess", onServerUserAcceso);
    socket.on("disconnect", disconnet);


    return () => {
      socket.off("server:newAccess", onServerUserAcceso);
      socket.off("disconnect", disconnet);
    }

  }, [socket])


  const createAcceso = async (acceso: CreateAcceso) => {
    const nuevoAcceso = await consultas.create(acceso);
    if (nuevoAcceso.status !== "success") {
      return { status: false, message: nuevoAcceso.message };
    }
    return { status: true, message: "Acceso creado exitosamente" };
  }

  const getByID = async (id: number) => {
    const data = await consultas.getByID(id);
    if (data.status !== "success" || !data.data) {
      return { status: false, message: data.message };
    }
    const accesoVal = data.data;
    getByIDtype(accesoVal);
    return { status: true, message: "Acceso obtenido exitosamente", data: data.data };
  }

  const updateAcceso = async (data: UpdateAcceso) => {
    const updatedAcceso = await consultas.actualizarAcceso(data);
    if (updatedAcceso.status !== "success") {
      return { status: false, message: updatedAcceso.message };
    }

    udpateAccesoType({
      correo: data.correo,
      estado: data.estado,
      tipos: data.tipos,
      idacceso: data.idacceso
    })

    return { status: true, message: "Acceso actualizado exitosamente" };
  }

  const getAllAccesos = async (page: number) => {
    if (pageLoads.includes(page)) {
      const inicio = (page - 1) * 10;
      const final = inicio + 10;
      const dataPagina = accesos.slice(inicio, final);

      return { status: true, message: "Accesos obtenidos exitosamente", data: dataPagina };
    }

    const data = await consultas.getAllColaboradores(page);
    if (data.status !== "success" || !data.data) {
      return { status: false, message: data.message };
    }

    const accesosVal = data.data;
    setAccesos(prev => [...prev, ...accesosVal]);
    setPageLoads(prev => [...prev, page]);
    return { status: true, message: "Accesos obtenidos exitosamente", data: data.data };
  }


  return (
    <AccesosContext.Provider value={{
      accesos,
      getAllAccesos,
      updateAcceso,
      getByID,
      createAcceso
    }}>
      {children}
    </AccesosContext.Provider>
  );
}

export const useAccesosContext = () => {
  const context = useContext(AccesosContext);
  if (!context) {
    throw new Error('useAccesosContext debe ser usado dentro de AccesosProvider');
  }
  return context;
};
