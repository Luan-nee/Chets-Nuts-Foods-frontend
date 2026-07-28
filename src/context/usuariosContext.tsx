import { createContext, useContext, useEffect, useState } from "react";
import Usuarios from "../api/Usuarios.api";
import { useAuth } from "./AuthContext";
import { useSocket } from "./SocketContext";
import type { UserContexts } from "./typesContext";
import type { CreateUsuario } from "../types/usuarios.type";
import Swal from "sweetalert2";

interface UsuariosContextTypes {
    users: UserContexts[];
    createNewUser: (user: CreateUsuario) => Promise<{ status: boolean; message: string }>;
    setAllUsuarios: () => Promise<{ status: boolean; message: string; data?: UserContexts[] }>;
    getByDNI: (dni: string) => Promise<{ status: boolean; message: string; data?: UserContexts }>;
}

const UsuariosContext = createContext<UsuariosContextTypes | undefined>(undefined);

export const UsuariosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socket = useSocket();
    const { logout } = useAuth();
    const consultas = new Usuarios();
    const [users, setUsers] = useState<UserContexts[]>([]);


    function createUsuarioAdd(newUser: UserContexts) {
        setUsers(prev => {
            let existe = false;
            const datosNuevos = prev.map(u => {
                if (u.id === newUser.id || u.dni === newUser.dni) {
                    existe = true;
                    return {
                        ...u,
                        ...newUser,
                    }
                }
                return u;
            })

            if (existe) return datosNuevos;
            return [...prev, newUser];
        });
    }

    useEffect(() => {
        if (!socket) return;

        const onServerNewUser = (data: UserContexts) => {
            createUsuarioAdd(data)
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

        socket.on("server:newUser", onServerNewUser);
        socket.on("disconnect", disconnet);

        return () => {
            socket.off("server:newUser", onServerNewUser);
            socket.off("disconnect", disconnet);
        };
    }, [socket]);

    const createNewUser = async (user: CreateUsuario) => {
        try {
            const newUser = await consultas.create(user);
            if (newUser.status !== "success" || !newUser.data) {
                return { status: false, message: newUser.message };
            }
            const userCreated: UserContexts = {
                id: newUser.data.iduser || 0,
                dni: newUser.data.dni,
                nombres: newUser.data.nombre,
                apellido_paterno: newUser.data.apellidopaterno,
                apellido_materno: newUser.data.apellidomaterno,
                numero: newUser.data.numero,
                edad: newUser.data.edad,
                sexo: newUser.data.sexo
            };
            createUsuarioAdd(userCreated);
            return { status: true, message: "Usuario creado exitosamente" };
        } catch (error: any) {
            return { status: false, message: error.message || "Error al crear el usuario" };
        }
    };

    const setAllUsuarios = async () => {
        try {
            const usersDB = await consultas.getAll();
            if (usersDB.status !== "success" || !usersDB.data) {
                return { status: false, message: usersDB.message, data: users };
            }
            const nuevosUsuarios = usersDB.data.map(user => {
                return {
                    id: user.iduser,
                    dni: user.dniuser,
                    nombres: user.nombres,
                    apellido_paterno: user.apellidopaterno,
                    apellido_materno: user.apellidomaterno,
                    numero: user.numero
                };
            });
            setUsers(prev => {
                const newUser = nuevosUsuarios.filter(user => !prev.some(prevUser => prevUser.id === user.id || prevUser.dni === user.dni));
                return [...prev, ...newUser];
            });
            return { status: true, message: "Usuarios obtenidos exitosamente", data: users };

        } catch (error: any) {
            return { status: false, message: error.message || "Error al obtener los usuarios" };
        }
    };

    const getByDNI = async (dni: string) => {
        try {
            const isUser = users.find(user => user.dni === dni);
            if (isUser) {
                return { status: true, message: "Usuario encontrado", data: isUser };
            }

            const user = await consultas.getDni(dni);

            if (user.status !== "success" || !user.data) {
                return { status: false, message: user.message };
            }

            const userCreated: UserContexts = {
                id: user.data.iduser || 0,
                dni: user.data.dniuser,
                nombres: user.data.nombres,
                apellido_paterno: user.data.apellidopaterno,
                apellido_materno: user.data.apellidomaterno,
                numero: user.data.numero,
                edad: user.data.edad,
                sexo: user.data.sexo
            };

            createUsuarioAdd(userCreated);
            return { status: true, message: "Usuario obtenido exitosamente", data: userCreated };

        } catch (error: any) {
            return { status: false, message: error.message || "Error al obtener el usuario" };
        }
    };


    return (
        <UsuariosContext.Provider value={{
            users,
            createNewUser,
            setAllUsuarios,
            getByDNI
        }}>
            {children}
        </UsuariosContext.Provider>
    );
}

export const useUsuariosContext = () => {
    const context = useContext(UsuariosContext);
    if (!context) {
        throw new Error('useAccesosContext debe ser usado dentro de AccesosProvider');
    }
    return context;
};