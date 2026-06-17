export type UpdateDatosEmpresa = {
  ruc: string;
  denominacion: string;
  numeroRegistroMtc: string;
  correo: string;
  codigoMtc: string;
  urlApi?: string;
  claveAcceso?: string;
  fechaVigenciaRegistroMtc: string;
}

export type InfoUbicacionState = {
  nombreEstablecimiento: "chets nuts foods";
  departamento: string;
  provincia: string;
  distrito: string;
  direccion: string;
  descripcion: "empresa principal";
  latitud: string;
  longitud: string;
  ubigeo: string;
  idResponsable: 1;
  tipoEstado: "oficina";
  codigoSunat?: string; // solo puede tener 5 caracteres. 
};