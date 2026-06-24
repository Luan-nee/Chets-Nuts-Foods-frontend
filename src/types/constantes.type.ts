export type UserRole =
  | "ADMIN"
  | "CHOFER"
  | "CLIENTE"
  | "COLABORADOR"
  | "SIN ROL"
  ;

export type UserGender = "MASCULINO" | "FEMENINO";

export type UserType = "NATURAL" | "JURIDICO";

export type TipoEstablecimiento =
  | "fiscal"
  | "anexo"
  | "almacen"
  | "oficina"
  | "no_registrado";

export type TipoVehiculo = "PUBLICO" | "PRIVADO";

export const ESTADOS = [
  "RESERVADO",
  "INACTIVO",
  "OPERATIVO",
] as const;

export type EstadoVehiculo = (typeof ESTADOS)[number];

export type EstadoTransporte = "INICIO" | "EN CAMINO" | "FINALIZADO" | "CANCELADO"

export interface PropsNotificaciones {
  icon: "PRODUCTO" | "VEHICULO" | "NOTIFICACION" | "USER";
  titulo: string;
  descripcion: string;
  t: any;
}