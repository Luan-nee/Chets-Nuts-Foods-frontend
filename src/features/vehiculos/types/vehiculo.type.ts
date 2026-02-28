export type Vehiculo = {
  idvehempresa: number;
  placa: string;
  marca: string;
  modelo: string;
  anio: number;
  tipoVehiculo: string;
  capacidadCarga: number;
}

export type VehiculoGre = Omit<Vehiculo, 'idvehempresa'>;
