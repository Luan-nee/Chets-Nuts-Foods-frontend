import type { TipoVehiculo } from './constantes.type';

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

export type UpdateVehiculo = {
  idVehiculo: number,
  anio: string,
  capacidadCarga: number, // kilogramos
  marca: string,
  modelo: string
}
