import type { TipoEstablecimiento } from "./constantes.type";

export type ResponseGetAll = {
  nombreEst: string;
  codigoSunat: string | null;
  direccion: string;
  distrito: string;
  provincia: string;
  tipoestablecimiento: TipoEstablecimiento;
  estado: boolean;
  descripcion: string;
  idEst: number;
  nombres: string;
}

export type ResponseGetByID = {
  idEst: number;
  iduser: number;
  nombreusuario: string;
  apellidomaterno: string;
  apellidopaterno: string;
  dniuser: string;
  numero: string;
  nombreEstablecimiento: string,
  codigoSunat: string | null;
  departamento: string;
  descripcion: string;
  distrito: string;
  provincia: string;
  latitud: string;
  longitud: string;
  tipoestablecimiento: TipoEstablecimiento;
  ubigeo: string;
  activo: boolean;
  fechaCreacion: string;
}

export interface CreateEstablecimiento {
  idResponsable: number;
  nombreEstablecimiento: string;
  direccion: string;
  descripcion: string;
  latitud: string;
  longitud: string;
  distrito: string;
  provincia: string;
  departamento: string; // Esta propiedad puede tener un tipo específico si se conoce la lista de departamentos disponibles.
  ubigeo: string;
  tipoEstado?: TipoEstablecimiento;
  codigoSunat?: string;
}

export interface UpdateEstablecimiento {
  idEstablecimiento: number;
  idResponsable?: number;
  nombreEstablecimiento?: string;
  direccion?: string;
  descripcion?: string;
  latitud?: string;
  longitud?: string;
  distrito?: string;
  provincia?: string;
  departamento?: string;
  ubigeo?: string;
  tipoEstado?: TipoEstablecimiento;
  codigoSunat?: string;
  estadoVehiculo?: string; // Esta propiedad puede tener un tipo específico si se conoce la lista de estados de vehículo disponibles.
}

