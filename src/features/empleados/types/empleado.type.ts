export type empleadoRol = 'administrador' | 'chofer' | 'trabajador';

export type empleado = {
  id: number;
  nombres: string;
  apellidos: string;
  rol: empleadoRol;
}

export type DetallesEmpleado = {
  id_empleado: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  dni: string;
  rol: {
    id: number;
    nombre: string;
  };
  estado: boolean;
  fecha_registro: string;
  hora_registro: string;
  fecha_actualizacion: string;
  hora_actualizacion: string;
};

