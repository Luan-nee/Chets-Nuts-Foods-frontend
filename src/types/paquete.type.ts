export type CreatePaquete = {
  clave: string,
  destino: "sin definir",
  idSalidaTransporte: number,
  idUsuario: number,
  idUsuarioDestino: number,
  montoCobrado: number
}

export type ResponseGetAllPaquetes = {
  idpaquete: number,
  destino: string,
  montocobrado: string,
  estadopaquete: string,
  fechacreado: string,
  cantidadProductos: number
}