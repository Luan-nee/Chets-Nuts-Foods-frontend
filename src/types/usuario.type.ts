export type UserRole = 'ADMIN' | 'CHOFER' | 'CLIENTE' | 'COLABORADOR';

export type Credenciales = {
  usuario: string;
  contrasenia: string;
}

export type RegistroUsuario = {
  nombres: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  dni: string,
  ruc: string,
  correo: string,
  contrasenia: string
}

export type EditarUsuario = {
  nombres: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  dni: string,
  ruc: string,
  correo: string,
  contrasenia: string
}

export type ResponseSesion = {
  tokenZ: string;
  rol: UserRole;
  nombreUser: string;
}

export type User = {
  tokenZ: string;
  nombreUser: string;
  rol: UserRole;
}

export type roles = {
  id: number;
  rol: string;
}