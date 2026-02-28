export type tipoEst = 'fiscal' | 'anexo' | 'almacen' | 'oficina' | 'no_registrado';

export type Establecimiento = {
  idEst: number;
  nombreEst: string;
  direccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
}

export type EstablecimientoCreate = {
  idResponsable: number;
  nombreEst: string;
  direccion: string;
  descripcion: string;
  latitud: string;
  longitud: string;
  distrito: string;
  provincia: string;
  departamento: string;
  tipoEst: tipoEst;
  activo: boolean;
}

export type EstablecimientoUpdate = {
  idResponsable: number;
  nombreEst: string;
  direccion: string;
  descripcion: string;
  latitud: string;
  longitud: string;
  distrito: string;
  provincia: string;
  departamento: string;
  tipoEst: tipoEst;
  activo: boolean;
}