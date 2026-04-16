import { url_base_postman } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import dataVehiculos from '../json/vehiculos/get-ok-listarVehiculos.json';
import type { RegistrarVehiculo, EditarVehiculo } from "../features/vehiculos/types/vehiculo.type";

export default class VehiculoApi extends BaseRequestApi {
  private base_url = `${url_base_postman}/vehiculos`;
  
  /* LISTAR VEHICULOS */
  public async get<T>(pagina: number): Promise<BodyResponseWithPagination<T>> {
    if (this.OFFLINE_MODE) {
      return dataVehiculos as unknown as BodyResponseWithPagination<T>;
    } else {
      return this.request<BodyResponseWithPagination<T>>(`${this.base_url}?pagina=${pagina || 1}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - listar vehiculos'
        }
      });
    }
  }

  /* REGISTRAR VEHICULO */
  public async registrarVehiculo<T>(bodyVehiculo: RegistrarVehiculo): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataVehiculos as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}`, {
        method: 'POST',
        headers: {
          'x-mock-response-name': 'ok - registrar vehiculo'
        },
        body: JSON.stringify(bodyVehiculo)
      });
    }
  }
  
  /* EDITAR VEHICULO */
  public async editarVehiculo<T>(idVehiculo: number, bodyVehiculo: EditarVehiculo): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataVehiculos as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/${idVehiculo}`, {
        method: 'PATCH',
        headers: {
          'x-mock-response-name': 'ok - editar vehiculo'
        },
        body: JSON.stringify(bodyVehiculo)
      });
    }
  }

  /* INHABILITAR VEHICULO */
  public async inhabilitarVehiculo<T>(idVehiculo: number): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataVehiculos as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/inhabilitar/${idVehiculo}`, {
        method: 'POST',
        headers: {
          'x-mock-response-name': 'ok - inhabilitar vehiculo'
        }
      });
    }
  }

  /* DETALLES DE VEHICULO */
  public async getVehiculo<T>(idVehiculo: number): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataVehiculos as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/${idVehiculo}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - obtener detalles de un vehiculo'
        }
      });
    }
  }
}