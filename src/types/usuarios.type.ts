import type { UserGender, UserType } from "./constantes.type";

export type CreateUsuario = {
  iduser?: number,
  nombre: string,
  apellidomaterno: string,
  apellidopaterno: string,
  dni: string,
  numero: string,
  ruc?: string;
  edad: number,
  sexo: UserGender,
  correo: string,
  tipo?: UserType
}

export type ResponseGetDni = {
  iduser: number;
  apellidomaterno: string;
  apellidopaterno: string;
  dniuser: string;
  nombres: string;
  numero: string;
  rucuser: string | null;
  tipo: UserType;
  edad: number;
  numeroLicenciaConducir: string | null;
  cantenvios: number;
  sexo: UserGender;
}

export type ResponseGetAll = {
  iduser: number;
  apellidomaterno: string;
  apellidopaterno: string;
  dniuser: string;
  nombres: string;
  numero: string;
  rucuser: string | null;
}

export type ResponseGetDataBasicByDni = {
  dni: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  edad?: number,
  sexo?: "MASCULINO" | "FEMENINO"
}