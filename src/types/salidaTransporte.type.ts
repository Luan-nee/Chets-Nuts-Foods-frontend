import type { EstadoTransporte } from "./constantes.type";

export type CreateSalidaTransporte = {
  fechaSalida: Date;
  idChoferAcceso: number;
  idOrigenEstablecimiento: number;
  idDestinoEstablecimiento: number;
  idVehiculo: number;
}

export type ResponseGetAll = {
  // aún no tiene tipo definido
}

export type UpdateSalidaTransporte = {
  idsalidatransporte: number,
  idVehiculo?: number,
  idChoferAcceso?: number,
  idOrigenEstablecimiento?: number,
  idDestinoEstablecimiento?: number,
  fechaSalida?: Date,
  estadoTransporte?: EstadoTransporte
}


