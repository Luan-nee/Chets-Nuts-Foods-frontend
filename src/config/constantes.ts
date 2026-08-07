import type { marca, modelo, tipoVehiculo } from "../types/vehiculos.type";

export const numeroDeSerieGre: number = parseInt(import.meta.env.VITE_NUMERO_SERIE_GUIA_REMISION);

export const calidadCastania: { label: string; value: string }[] = [
  { label: "SIN DEFINIR", value: "SIN DEFINIR" },
  { label: "PRIMERA", value: "PRIMERA" },
  { label: "SEGUNDA", value: "SEGUNDA" },
  { label: "TERCERA", value: "TERCERA" },
]

export const calibreCastania: { label: string; value: string }[] = [
  { label: "SIN DEFINIR", value: "SIN DEFINIR" },
  { label: "GRANDE", value: "GRANDE" },
  { label: "MEDIANO", value: "MEDIANO" },
  { label: "ENANO", value: "ENANO" },
  { label: "TINY", value: "TINY" },
]

export const motivoTranslado: { label: string; value: string }[] = [
  { label: "Venta", value: "01" },
  { label: "Traslado entre establecimientos", value: "03" }
]

export const modalidadTransporte: { label: string; value: string }[] = [
  { label: "Privado", value: "01" },
]

export const tipoEstablecimiento: { label: string; value: string }[] = [
  { label: "Fiscal", value: "fiscal" },
  { label: "Anexo", value: "anexo" },
  { label: "Almacén", value: "almacen" },
  { label: "Oficina", value: "oficina" },
  { label: "No registrado", value: "no_registrado" } // solo visible por el frontend. No se envía al backend.
];

export const tiposPersona: { label: string; value: string }[] = [
  { label: "Natural", value: "NATURAL" },
  { label: "Jurídico", value: "JURIDICO" }
];

export const sexos: { label: string; value: string }[] = [
  { label: "Masculino", value: "MASCULINO" },
  { label: "Femenino", value: "FEMENINO" }
];

export const marcasVehiculos: { label: string; value: marca }[] = [
  { label: "Volvo", value: "volvo" },
  { label: "Scania", value: "scania" },
  { label: "Mercedes-Benz", value: "mercedes-benz" }, 
  { label: "MAN", value: "man" },
  { label: "DAF", value: "daf" },
  { label: "Iveco", value: "iveco" },
  { label: "International", value: "international" },
  { label: "Freightliner", value: "freightliner" },
  { label: "Kenworth", value: "kenworth" },
  { label: "Mack", value: "mack" },
  { label: "Hino", value: "hino" },
  { label: "Isuzu", value: "isuzu" },
  { label: "Fuso", value: "fuso" },
  { label: "Hyundai", value: "hyundai" },
  { label: "Sinotruk", value: "sinotruk" },
  { label: "Howo", value: "howo" },
  { label: "Foton", value: "foton" },
  { label: "Shacman", value: "shacman" },
  { label: "JAC Motors", value: "jac-motors" },
  { label: "Dongfeng", value: "dongfeng" },
  { label: "FAW", value: "faw" }
]

export const modelosVehiculos: { label: string; value: modelo }[] = [
  { label: "Corolla", value: "corolla" },
  { label: "Civic", value: "civic" },
  { label: "Mustang", value: "mustang" }
];

export const tiposVehiculos: { label: string; value: tipoVehiculo }[] = [
  { label: "M3", value: "M3" },
  { label: "M4", value: "M4" },
  { label: "M5", value: "M5" }
];

export const optionsTipoDocumento: { value: string; label: string }[] = [
  { value: 'DNI', label: 'DNI' },
  { value: 'RUC', label: 'RUC' }
]

export const UNIDAD_PESO: {id: number, medida: string}[] = [
  { id: 1, medida: "KG" }, // Kilogramo
  { id: 2, medida: "TN" }, // Tonelada
]
