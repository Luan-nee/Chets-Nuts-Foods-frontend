export type UserRole = 'ADMIN' | 'CHOFER' | 'CLIENTE' | 'COLABORADOR';

export type Credenciales = {
  usuario: string;
  contrasenia: string;
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