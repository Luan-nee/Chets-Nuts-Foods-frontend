import type { TipoVehiculo, EstadoVehiculo, UserRole } from './constantes.type';

export type ResponseGetAll = {
  idvehempresa: number;
  placa: string;
  marca: string;
  modelo: string;
  anio: string;
  tipoVehiculo: string;
  tiposervicio: TipoVehiculo;
  capacidadCarga: string;
  estadovehiculo: EstadoVehiculo;
}

export type ResponseGetByID = {
  idvehempresa: number;
  placa: string;
  marca: string;
  modelo: string;
  anio: string;
  vin: string | null;
  numeroHabilitacion: string | null;
  capacidadCarga: string;
  fechacreado: Date;
  estadovehiculo: EstadoVehiculo;
}

export type ResponseGetAllChoferes = {
  nombres: string;
  apellidopaterno: string;
  apellidomaterno: string;
  idUser: number;
  dniuser: string;
  edad: number;
  numeroLicenciaConducir: string | null;
  rucuser: string | null;
  tipos: UserRole;
}

export type CreateVehiculo = {
  anio: string;
  capacidadCarga: number;
  marca: string;
  modelo: string;
  placa: string;
  tipoVehiculo: string;
  vin?: string;
  tipo?: TipoVehiculo;
  numeroHabilitacion?: string;
}

export type ResponseCreate = {
  message: string;
  idVehiculo: number;
}

export type UpdateVehiculo = {
  idVehiculo: number,
  anio: string,
  capacidadCarga: number, // kilogramos
  marca: string,
  modelo: string
}

export type ResponseUpdate = {
  message: string;
}
