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
  titulo?: string,
  latitud?: string,
  longitud?: string,
  direccion?: string,
  comentario?: string,
  idcontrolestablecimiento?: number
}

export type ResponseRegistrarSeguimiento = number;