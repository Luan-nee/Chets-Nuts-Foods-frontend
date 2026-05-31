export type UserRole = "ADMIN" | "CHOFER" | "CLIENTE" | "COLABORADOR";

export type Credenciales = {
  usuario: string;
  password: string;
};

export type ResponseSesion = {
  nombreUser: string;
  rol: UserRole;
  tokenZ: string;
};

export type roles = {
  id: number;
  nombre: string;
};
