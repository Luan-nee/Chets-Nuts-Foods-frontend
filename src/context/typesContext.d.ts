

export interface AccesosUser {
    idacceso: number,
    correo?: string,
    estado?: boolean,
    tipos?: RolesType,
    estadoacceso?: EstadoAccesoType,
    dniuser: string,
    nombres: string
}


export interface UsuarioscontextType {
    iduser?: number,
    apellidomaterno: string,
    apellidopaterno: string,
    dniuser: string,
    nombres: string,
    numero?: string,
    rucuser?: string,
    tipo?: "NATURAL" | "JURIDICO",
    edad?: number,
    numeroLicenciaConducir?: string,
    cantenvios?: number
}

export type UserContexts = {
    id: number,
    dni: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    edad?: number,
    sexo?: "MASCULINO" | "FEMENINO";
    numero?: string;
}