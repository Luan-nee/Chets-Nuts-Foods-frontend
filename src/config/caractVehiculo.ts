import type { marca, modelo, tipoVehiculo } from "../features/vehiculos/types/vehiculo.type";

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