import type { UserGender, UserType } from "./constantes.type";

export type CreateUsuario = {
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
