export type marca = "toyota" | "honda" | "ford" | "";
export type modelo = "corolla" | "civic" | "mustang" | "";
export type tipoVehiculo = "M3" | "M4" | "M5" | "";

// TIPO BASE DE VEHICULO
export type Vehiculo = {
  id: number;
  placa: string;
  marca: marca;
  modelo: modelo;
  anioFabricacion: number;
  tipoVehiculo: tipoVehiculo;
  capacidadCarga: number;
}

export type ListarVehiculo = Omit<Vehiculo, 'id' | 'anioFabricacion'> & {
  idvehempresa: number;
  anio: number; // 0000
};

export type RegistrarVehiculo = Omit<Vehiculo, 'id'>;

export type EditarVehiculo = Omit<Vehiculo, 'id'>; 

export type DetallesVehiculo = Omit<Vehiculo, 'id'>;

export type DetallesNumerados = Omit<Vehiculo,'id' | 'marca' | 'modelo' | 'tipoVehiculo'> & {
  marca: number;
  modelo: number;
  tipoVehiculo: number;
};