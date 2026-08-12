import type { UserRole, UserGender, UserType } from "./constantes.type";

export type CreateAcceso = {
  password: string;
  tipos: UserRole;
  correo: string;
  nombre: string;
  apellidopaterno: string;
  apellidomaterno: string;
  dni: string;
  edad: number;
  sexo: UserGender;
  numero?: string;
  numeroLicenciaConducir?: string;
  ruc?: string; //no tiene un uso definido.
  tipo?: UserType; //no tiene un uso definido.
}

export type ResponseGetAllColaboradores = {
  idacceso: number;
  correo: string;
  estado: boolean; 
  tipos: UserRole; 
  estadoacceso: "DISPONIBLE" | "OCUPADO";
  dniuser: string; 
  nombres: string;
}

export type ResponseGetByID = {
  idacceso: number;
  correo: string | null; // Puede ser null según tus datos
  estado: boolean;
  tipos: UserRole;
  idusuario: number;
  dniuser: string;
  nombres: string;
  rucuser: string | null; // Al igual que el DNI, mejor tratarlo como string o null
  numero: string | null; // Se mantiene string por si incluye prefijos o ceros a la izquierda
  edad: number;
  contra: string;
  fechaCreacion: string; // string si viene directo del JSON, Date si lo transformas
  numeroLicenciaConducir: string | null; // Puede ser null si no tiene licencia
}

export type UpdateAcceso = {
  idacceso: number;
  estado?: boolean;
  correo?: string;
  password?: string;
  tipos?: UserRole;
}

export type ResponseRoles = {
  id: number;
  rol: UserRole;
}
