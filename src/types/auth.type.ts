import type { UserRole } from './constantes.type';

export type Credenciales = {
  usuario: string,
  password: string
}

export type AuthResponse = {
  nombreUser: string,
  rol: UserRole,
  tokenZ: string
}