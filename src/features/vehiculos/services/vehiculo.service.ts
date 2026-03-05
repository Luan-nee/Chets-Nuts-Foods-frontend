import VehiculoApi from '../../../api/vehiculo.api';
import type { Vehiculo } from '../types/vehiculo.type';

const vehiculoApi = new VehiculoApi();

export class VehiculoService {
  public async listarVehiculos(pagina: number) {
    return vehiculoApi.get<Vehiculo[]>(pagina);
  }
}