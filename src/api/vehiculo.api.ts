import { url_base } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import dataVehiculos from '../json/vehiculos/get-ok-listarVehiculos.json';

export default class VehiculoApi extends BaseRequestApi {
  private base_url = `${url_base}/vehiculos`;

  public async get<T>(): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataVehiculos as unknown as BodyResponse<T>;
    } else {
      return this.request<T>(`${this.base_url}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - listar vehiculos'
        }
      });
    }
  }
}