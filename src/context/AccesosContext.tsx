import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import { useAuth } from "./AuthContext";
import type { AccesosUser } from "./typesContext";
import { DIRACCESOSLOCAL } from "../const";
import type { CreateAcceso, ResponseGetByID, ResponseRoles, UpdateAcceso } from "../types/accesos.type";
import type { PaginationInfo } from "../types/bodyResponse.type";
import Accesos from "../api/Accesos.api";
import Swal from "sweetalert2";
import type { UserRole } from "../types/constantes.type";

interface AccesosContextTypes {
  accesos: AccesosUser[];
  roles: UserRole[];
  paginacion: PaginationInfo;
  paginasCargadas: number[];
  loading: boolean;
  getAllAccesos: (page: number) => Promise<{ status: boolean; message: string; data?: AccesosUser[]; pagination?: PaginationInfo }>;
  updateAcceso: (data: UpdateAcceso) => Promise<{ status: boolean; message: string }>;
  getByID: (id: number) => Promise<{ status: boolean; message: string; data?: ResponseGetByID }>;
  createAcceso: (acceso: CreateAcceso) => Promise<{ status: boolean; message: string }>;
  deleteAcceso: (id: number) => Promise<{ status: boolean; message: string }>;
  getRoles: () => Promise<UserRole[]>;
}

const AccesosContext = createContext<AccesosContextTypes | undefined>(undefined);

export const AccesosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socket = useSocket();
  const { logout } = useAuth();
  const consultas = new Accesos();

  const [paginasCargadas, setPaginasCargadas] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [roles, setRoles] = useState<UserRole[]>([
    "ADMIN",
    "CHOFER",
    "CLIENTE",
    "COLABORADOR",
    "SIN ROL"
  ]);
  const [accesos, setAccesos] = useState<AccesosUser[]>(() => {
    const stored = localStorage.getItem(DIRACCESOSLOCAL) || "[]";
    return JSON.parse(stored).map((p: AccesosUser) => ({
      ...p,
    }));
  });

  const [paginacion, setPaginacion] = useState<PaginationInfo>({
    total_data: 0,
    total_paginas: 0,
    pagina_actual: 1,
    datos_por_pagina: 10,
  });

  function getByIDtype(accesoVal: AccesosUser) {
    if (!accesoVal) return;
    setAccesos(prev => {
      let existe = false;

      const nuevosDatos = prev.map(acceso => {
        if (acceso.idacceso === accesoVal.idacceso) {
          existe = true;
          return {
            ...acceso,
            ...accesoVal,
            tipos: accesoVal.tipos || acceso.tipos,
            estado: accesoVal.estado !== undefined ? accesoVal.estado : acceso.estado,
            correo: accesoVal.correo || acceso.correo,
          }
        }
        return acceso;
      });

      if (existe) return nuevosDatos;
      return [accesoVal, ...prev];
    });
  };

  useEffect(() => {
    if (!socket) return;

    const onServerUserAcceso = (data: AccesosUser) => {
      console.log(data);
      getByIDtype(data)
    };

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
    };

    socket.on("server::newAcceso", onServerUserAcceso);
    socket.on("disconnect", disconnet);

    return () => {
      socket.off("server::newAcceso", onServerUserAcceso);
      socket.off("disconnect", disconnet);
    };
  }, [socket]);

  const createAcceso = async (acceso: CreateAcceso) => {
    try {
      setLoading(true);
      const nuevoAcceso = await consultas.create(acceso);
      if (nuevoAcceso.status !== "success") {
        return { status: false, message: nuevoAcceso.message };
      }
      return { status: true, message: "Acceso creado exitosamente" };
    } catch (error: any) {
      return { status: false, message: error.message || "Error al crear el acceso" };
    } finally {
      setLoading(false);
    }
  };

  const getByID = async (id: number) => {
    try {
      setLoading(true);
      const data = await consultas.getByID(id);
      if (data.status !== "success" || !data.data) {
        return { status: false, message: data.message };
      }
      const accesoVal = data.data;
      const dataNew: AccesosUser = {
        idacceso: accesoVal.idacceso,
        correo: accesoVal.correo || "",
        dniuser: accesoVal.dniuser,
        estado: accesoVal.estado,
        nombres: accesoVal.nombres,
        tipos: accesoVal.tipos,
        estadoacceso: accesoVal.estado
      }
      getByIDtype(dataNew);
      return { status: true, message: "Acceso obtenido exitosamente", data: accesoVal };
    } catch (error: any) {
      return { status: false, message: error.message || "Error al obtener el acceso" };
    } finally {
      setLoading(false);
    }
  };

  const updateAcceso = async (data: UpdateAcceso) => {
    try {
      setLoading(true);
      const updatedAcceso = await consultas.actualizarAcceso(data);
      if (updatedAcceso.status !== "success") {
        return { status: false, message: updatedAcceso.message };
      }

      const dataUser = await consultas.getByID(data.idacceso);
      if (dataUser.status !== "success" || !dataUser.data) {
        return { status: false, message: dataUser.message };
      }

      const nuevo: AccesosUser = {
        idacceso: dataUser.data.idacceso,
        dniuser: dataUser.data.dniuser,
        nombres: dataUser.data.nombres,
        correo: dataUser.data.correo || "",
        estado: dataUser.data.estado,
        tipos: dataUser.data.tipos,
      }

      getByIDtype(nuevo);

      return { status: true, message: "Acceso actualizado exitosamente" };
    } catch (error: any) {
      return { status: false, message: error.message || "Error al actualizar el acceso" };
    } finally {
      setLoading(false);
    }
  };

  const deleteAcceso = async (id: number) => {

    setAccesos(prev => prev.filter(acceso => acceso.idacceso !== id));

    setPaginacion(prev => ({
      ...prev,
      total_data: Math.max(0, prev.total_data - 1)
    }));
    return { status: true, message: "Acceso eliminado localmente" };
  };

  const getAllAccesos = async (page: number) => {
    const inicio = (page - 1) * 10;
    const final = inicio + 10;
    const dataPagina = accesos.slice(inicio, final);

    if (paginasCargadas.includes(page) && page !== 0 && dataPagina.length === 10) {
      const nextPaginacion = { ...paginacion, pagina_actual: page };
      setPaginacion(nextPaginacion);
      return { status: true, message: "Accesos obtenidos exitosamente", data: dataPagina, pagination: nextPaginacion };
    }

    try {
      setLoading(true);
      const data = await consultas.getAllColaboradores(page);
      if (data.status !== "success" || !data.data) {
        return { status: false, message: data.message };
      }

      const accesosVal = data.data;
      setAccesos(prev => {
        const uniquePrev = prev.filter(p => !accesosVal.some(n => n.idacceso === p.idacceso));
        return [...uniquePrev, ...accesosVal];
      });
      setPaginasCargadas(prev => [...prev, page]);
      if (data.pagination) {
        setPaginacion(data.pagination);
      }
      return { status: true, message: "Accesos obtenidos exitosamente", data: data.data, pagination: data.pagination };
    } catch (error: any) {
      return { status: false, message: error.message || "Error al obtener los accesos" };
    } finally {
      setLoading(false);
    }
  };

  const getRoles = async () => {
    if (roles.length > 5) {
      return roles;
    }
    try {
      setLoading(true);
      const data = await consultas.roles();
      if (data.status !== "success" || !data.data) {
        return roles;
      }
      const rolesVal = data.data.map((r: ResponseRoles) => r.rol);
      setRoles(rolesVal);
      return rolesVal;
    } catch (error) {
      return roles;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccesosContext.Provider value={{
      accesos,
      roles,
      paginacion,
      paginasCargadas,
      loading,
      getAllAccesos,
      updateAcceso,
      getByID,
      createAcceso,
      deleteAcceso,
      getRoles
    }}>
      {children}
    </AccesosContext.Provider>
  );
};

export const useAccesosContext = () => {
  const context = useContext(AccesosContext);
  if (!context) {
    throw new Error('useAccesosContext debe ser usado dentro de AccesosProvider');
  }
  return context;
};
