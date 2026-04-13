import VehiculoApi from '../../../api/vehiculo.api';
import type { ListarVehiculo, RegistrarVehiculo, EditarVehiculo, DetallesVehiculo } from '../types/vehiculo.type';

const vehiculoApi = new VehiculoApi();

export class VehiculoService {
  public async listarVehiculos(pagina: number) {
    return vehiculoApi.get<ListarVehiculo[]>(pagina);
  }

  public async registrarVehiculo(bodyVehiculo: RegistrarVehiculo) {
    return vehiculoApi.registrarVehiculo<null>(bodyVehiculo);
  }

  public async editarVehiculo(idVehiculo: number, bodyVehiculo: EditarVehiculo) {
    return vehiculoApi.editarVehiculo<null>(idVehiculo, bodyVehiculo);
  }

  public async inhabilitarVehiculo(idVehiculo: number) {
    return vehiculoApi.inhabilitarVehiculo<null>(idVehiculo);
  }

  public async obtenerDetallesVehiculo(idVehiculo: number) {
    return await vehiculoApi.getVehiculo<DetallesVehiculo>(idVehiculo);
  }
}