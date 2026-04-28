export type empleadoRol = 'administrador' | 'chofer' | 'trabajador';
export type accesoEstado = "DISPONIBLE" | "OCUPADO" | "OBSERVACION";

export type empleado = {
  id: number;
  nombres: string;
  apellidos: string;
  rol: empleadoRol;
  dni: string;
  estado: accesoEstado;
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

export type UpdateEmpleadoData = {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  dni: string;
  rol: number;
  restablecerContrasenia: boolean;
}

export type CreateEmpleadoData = {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  dni: string;
  rol: number;
  contrasenia_temporal: string;
}

export type DeshabilitarEmpleado = {
  motivo: string;
};

export type EditarEmpleado = {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  dni: string;
  rol: number;
  restablecerContrasenia: boolean;
}