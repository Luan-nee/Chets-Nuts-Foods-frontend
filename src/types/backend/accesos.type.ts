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
  // esas propiedades no tiene un uso definido.
  ruc?: string;
  tipo?: UserType;
}

export type UpdateAcceso = {
  idacceso: number;
  estado?: boolean;
  correo?: string;
  password?: string;
  tipos?: UserRole;
}

