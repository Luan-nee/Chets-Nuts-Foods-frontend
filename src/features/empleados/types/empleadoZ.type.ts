import type { accesoEstado, estadoEmpleado, empleadoRol } from './empleado.type';

export type empleado = {
  idacceso: number;
  correo: string;
  estado: estadoEmpleado; // 0 o 1
  tipos: empleadoRol;
  estadoacceso: accesoEstado;
  dniuser: string;
  nombres: string;
}