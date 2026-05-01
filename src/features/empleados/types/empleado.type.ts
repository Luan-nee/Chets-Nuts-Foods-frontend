export type empleadoRol = 'ADMIN' | 'CHOFER' | 'CLIENTE' | 'COLABORADOR';
export type accesoEstado = "DISPONIBLE" | "OCUPADO" | "OBSERVACION";
export type estadoEmpleado = 0 | 1; // 0 = deshabilitado, 1 = habilitado
export type sexoEmpleado = 'MASCULINO' | 'FEMENINO';
export type tipoPersona = 'NATURAL' | 'JURIDICO';

export type empleado = {
  id: number;
  nombres: string;
  apellidos?: string; // Opcional, el backend no lo envía
  rol: empleadoRol;
  dni: string;
  estado: accesoEstado;
  estadoHabilitado: estadoEmpleado; // 0 o 1
  correo?: string;
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
  password: string;
  tipos: empleadoRol; // Rol: ADMIN | CHOFER | CLIENTE | COLABORADOR
  correo: string;
  nombre: string;
  apellidomaterno: string;
  apellidopaterno: string;
  dni: string;
  numero: string; // Teléfono
  edad: number;
  sexo: sexoEmpleado; // MASCULINO | FEMENINO
  tipo: tipoPersona; // NATURAL | JURIDICO
  numeroLicenciaConducir?: string; // Solo si es CHOFER
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