export type empleadoRol = 'administrador' | 'chofer' | 'trabajador';

export type empleado = {
  id: number;
  nombres: string;
  apellidos: string;
  rol: empleadoRol;
}