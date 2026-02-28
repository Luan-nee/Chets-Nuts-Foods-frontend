import VehiculoApi from '../../../api/vehiculo.api';
import type { Vehiculo } from '../types/vehiculo.type';

const vehiculoApi = new VehiculoApi();

export class VehiculoService {
  public async listarVehiculos() {
    const response = await vehiculoApi.get<Vehiculo[]>();
    return response;
  }
}