import type { EstadoTransporte } from "./constantes.type";

export type CreateSalidaTransporte = {
  fechaSalida: string;
  idChoferAcceso: number;
  idOrigenEstablecimiento: number;
  idDestinoEstablecimiento: number;
  idVehiculo: number;
  horasalida: string;
}

export type ResponseCreateSalidaTransporte = {
  idSalidaTransporte: number;
};

export type ResponseGetAll = {
  idsalidatransporte: number,
  estadotransporte: string,
  fechasalida: string,
}

export type UpdateSalidaTransporte = {
  idsalidatransporte: number,
  idVehiculo?: number,
  idChoferAcceso?: number,
  idOrigenEstablecimiento?: number,
  idDestinoEstablecimiento?: number,
  fechaSalida?: string,
  estadoTransporte?: EstadoTransporte
}


