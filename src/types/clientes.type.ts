import type { UserGender, UserType } from "./constantes.type";

export type CreateCliente = {
  nombre: string,
  apellidomaterno: string,
  apellidopaterno: string,
  dni: string,
  numero: string,
  edad: number,
  sexo: UserGender,
  correo: string,
  tipo: UserType
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
  iduser: number,
  apellidomaterno: string,
  apellidopaterno: string,
  dniuser: string,
  nombres: string,
  numero: string,
  rucuser: null | string,
}
