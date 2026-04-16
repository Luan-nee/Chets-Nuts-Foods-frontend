import { url_base_postman } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import dataVehiculos from '../json/vehiculos/get-ok-listarVehiculos.json';
import type { actualizarEstadoTransporte } from '../features/transporte/types/transporte.type'; 

export default class TransporteApi extends BaseRequestApi {
  private base_url = `${url_base_postman}/transportes`;
  
  /* ACTUALIZAR ESTADO DE TRANSPORTE */
  public async get<T>(body: actualizarEstadoTransporte): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataVehiculos as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}`, {
        method: 'POST',
        headers: {
          'x-mock-response-name': 'ok - actualizar estado de transporte'
        },
        body: JSON.stringify(body)
      });
    }
  }
}