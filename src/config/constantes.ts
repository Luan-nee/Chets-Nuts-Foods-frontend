import type { marca, modelo, tipoVehiculo } from "../types/vehiculos.type";

export const numeroDeSerieGre: number = parseInt(import.meta.env.VITE_NUMERO_SERIE_GUIA_REMISION);

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
  { label: "Jurídica", value: "JURIDICA" }
];

export const sexos: { label: string; value: string }[] = [
  { label: "Masculino", value: "MASCULINO" },
  { label: "Femenino", value: "FEMENINO" }
];

export const marcasVehiculos: { label: string; value: marca }[] = [
  { label: "Toyota", value: "toyota" }, // 1
  { label: "Honda", value: "honda" },   // 2
  { label: "Ford", value: "ford" }      // 3
];

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
