import VehiculoApi from '../../../api/vehiculo.api';
import type { Vehiculo, RegistrarVehiculo, EditarVehiculo, DetallesVehiculo, DetalleVehiculoModificado } from '../types/vehiculo.type';
import { marcasVehiculos, modelosVehiculos, tiposVehiculos } from '../../../config/caractVehiculo';
import type { BodyResponse } from '../../../types/bodyResponse.type';

const vehiculoApi = new VehiculoApi();

export class VehiculoService {
  public async listarVehiculos(pagina: number) {
    return vehiculoApi.get<Vehiculo[]>(pagina);
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
    const response = await vehiculoApi.getVehiculo<DetallesVehiculo>(idVehiculo);
    return {
      ...response,
      data: {
        ...response.data,
        marca: marcasVehiculos.findIndex((m) => m.value === response.data.marca) || 0,
        modelo: modelosVehiculos.findIndex((m) => m.value === response.data.modelo) || 0,
        tipoVehiculo: tiposVehiculos.findIndex((t) => t.value === response.data.tipoVehiculo) || 0,
      }
    } as BodyResponse<DetalleVehiculoModificado>;
  }
}