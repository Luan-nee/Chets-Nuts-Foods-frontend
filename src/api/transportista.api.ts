import { url_base_postman } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import dataVehiculos from '../json/vehiculos/get-ok-listarVehiculos.json';

export default class TransportistaApi extends BaseRequestApi {
  private base_url = `${url_base_postman}/transportistas`;
  
  /* LISTAR TRANSPORTISTAS */
  public async get<T>(): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataVehiculos as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - listar transportistas'
        }
      });
    }
  }
}