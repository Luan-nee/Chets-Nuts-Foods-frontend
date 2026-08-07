export type UserRole =
  | "ADMIN"
  | "CHOFER"
  | "CLIENTE"
  | "COLABORADOR"
  | "SIN ROL"
  ;

export type UserGender = "MASCULINO" | "FEMENINO";

export type UserType = "NATURAL" | "JURIDICO" | "SIN DEFINIR";

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

// TIPOS QUE SON USADONS EN EL FRONTEND Y BACKEND
export type ProductoEnPaquete = {
  idproductdefect: number;
  nombreproducto: string;
  pesounitario: number;
  observacion: string;
  cantidad: number;
}

export type SelectedDateTime = {
  date: Date;
  hour: number;
  minute: number;
  ampm: "AM" | "PM";
};

export type SalidaTransporteFormData = {
  idChoferAcceso: number,
  idOrigenEstablecimiento: number,
  idDestinoEstablecimiento: number,
  idVehiculo: number,
  fechaSalida: string,
  horasalida: string
}

export type PaqueteFormData = {
  clave: string,
  destino: string,
  idSalidaTransporte: number,
  idUsuario: number,
  idUsuarioDestino: number,
  montoCobrado: number
}