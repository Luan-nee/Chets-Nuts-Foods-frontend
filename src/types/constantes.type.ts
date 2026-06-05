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

export type EstadoVehiculo = "OPERATIVO" | "MANTENIMIENTO";

export type EstadoTransporte = "INICIO" | "EN CAMINO" | "FINALIZADO" | "CANCELADO"