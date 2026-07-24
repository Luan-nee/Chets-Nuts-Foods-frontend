export type CreatePaquete = {
  clave: string,
  destino: string,
  idSalidaTransporte: number,
  idUsuario: number,
  idUsuarioDestino: number,
  montoCobrado: number,
  observacion?: string
}

export type ResponseCreatePaquete = {
  sala: string,
  idPaquete: number,
}

export type ResponseGetAllPaquetes = {
  idpaquete: number,
  destino: string,
  montocobrado: string,
  estadopaquete: string,
  fechacreado: string,
  cantidadProductos: number
}

export type ResponseGetPaqueteData = {
  pesoTotalProductos: number | null;
  totalProductos: string;
  paquete: {
    idpaquete: number;
    clave: string;
    montoPagado: string;
    estadoPaquete: string;
    observacion: string;
    destino: string;
    fechaCreado: string;
    idSalidaTransporte?: number;
    idUsuario?: number;
    idUsuarioDestino?: number;
  };
  usuarioOrigen: {
    nombre: string;
    apellidoMaterno: string;
    apellidoPaterno: string;
    dni: string;
    correo: string | null;
    numero: string | null;
  };
  usuarioDestino: {
    nombre: string;
    apellidoMaterno: string;
    apellidoPaterno: string;
    dni: string;
    correo: string | null;
    numero: string | null;
  };
  destinoEstablecimiento: any;
}