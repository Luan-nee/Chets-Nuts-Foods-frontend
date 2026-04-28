import type { accesoEstado } from './empleado.type';
import type { empleadoRol } from './empleado.type';

export type empleado = {
  idacceso: number;
  correo: string;
  estado: accesoEstado;
  tipos: empleadoRol;
  estadoacceso: string;
  dniuser: string;
  nombres: string
}