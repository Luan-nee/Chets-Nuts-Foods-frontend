export type actualizarEstadoTransporte = {
  evento: string;
  fecha: {
    data: string;
    formato: string;
  };
  hora: string;
}