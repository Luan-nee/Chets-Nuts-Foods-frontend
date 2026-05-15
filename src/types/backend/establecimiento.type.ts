import type { TipoEstablecimiento } from "./constantes.type";

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

