export type ResponseGetAll = {
  idseg: number,
  idcontrolestablecimiento: number,
  titulo: string,
  latitud: string | null,
  longitud: string | null,
  direccion: string | null,
  comentario: string
}

export type RegistrarSeguimiento = {
  titulo: string,
  idcontrolestablecimiento: number,
  latitud: string,
  longitud: string,
  direccion: string,
  comentario: string
}

export type ResponseRegistrarSeguimiento = number;