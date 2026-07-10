export type ResponseGetAll = {
  estadoguia: string;
  numero: string;
  qrUrl: string;
  confirmado: boolean;
  fechaConfirmacion: string | null;
  idguia: number;
}

export type EmitirGre = {
  motivoTraslado: string;
  docDestinatario: string;
  modalidadTransporte: string;
  codigoTransporte: number;
}