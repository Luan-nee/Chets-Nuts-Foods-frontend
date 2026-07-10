import type { UserGender, UserType } from "./constantes.type";

export type GetClienteSinCompras = {
  iduser: number,
  apellidomaterno: string,
  apellidopaterno: string,
  dniuser: string,
  nombres: string,
  numero: string,
  rucuser: string | null
}

export type CreateCliente = {
  nombre: string, //
  apellidomaterno: string, //
  apellidopaterno: string, //
  dni: string, // 
  edad: number, //
  sexo: UserGender, 
  ruc?: string, //
  numero: string | null,
  tipo: UserType | null,
  correo: string,
}

export type ResponseCreateCliente = {
  iduser: number,
  apellidomaterno: string,
  apellidopaterno: string,
  dniuser: string,
  nombres: string,
  numero: string,
  rucuser: null | string,
  tipo: UserType
}

export type ResponseGetClienteByDNI = {
  iduser: number,
  apellidomaterno: string,
  apellidopaterno: string,
  dniuser: string,
  nombres: string,
  numero: string,
  rucuser: null,
  tipo: UserType,
  edad: number,
  numeroLicenciaConducir: null | string,
  cantenvios: number
}

export type UpdateCliente = {
  // Aún no se ha definido la estructura.
  // No existe documentación en postman sobre esta operación.
}

export type ResponseGetClienteByRUC = {
  // Aún no se ha definido la estructura.
  // La documentación en postman está vacía. 
}

export type ResponseGetAllClientes = {
  nombres: string,
  apellidopaterno: string,
  apellidomaterno: string,
  dniuser: string,
  cantenvios: number,
}
