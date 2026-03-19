export type Vehiculo = {
  idvehempresa: number;
  placa: string;
  marca: string;
  modelo: string;
  anio: number;
  tipoVehiculo: string;
  capacidadCarga: number;
}

export type RegistrarVehiculo = {
  placa: string;
  marca: string;
  modelo: string;
  anioFabricacion: number;
  tipoVehiculo: string;
  capacidadCarga: number;
}

export type EditarVehiculo = {
  placa: string;
  marca: string;
  modelo: string;
  anioFabricacion: number;
  tipoVehiculo: string;
  capacidadCarga: number;
}

export type DetallesVehiculo = {
  placa: string;
  marca: string;
  modelo: string;
  anioFabricacion: number;
  tipoVehiculo: string;
  capacidadCarga: number;
}

export type DetalleVehiculoModificado = Omit<DetallesVehiculo, 'marca' | 'modelo' | 'tipoVehiculo'> & {
  marca: number;
  modelo: number;
  tipoVehiculo: number;
};