import type { BodyResponse } from '../types/bodyResponse.type';
import BaseRequestApi from './BaseRequest.api';
import { url_base } from '../config/url_base';
import dataEstablecimientos from '../json/establecimientos/get-ok-listarEstablecimientos.json';

// quiero usar las variables de entorno en el código, pero no puedo porque no las tengo definidas en el archivo .env, entonces las defino en el archivo .template.env y luego las importo aquí

export class EstablecimientoApi extends BaseRequestApi {
  private base_url = `${url_base}/establecimientos`;
  
  public async get<T>(): Promise<BodyResponse<T>> {

    if (this.OFFLINE_MODE) {
      return dataEstablecimientos as unknown as BodyResponse<T>;
    } else {
      return this.request<T>(`${this.base_url}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - listar establecimientos'
        }
      });
    }
  }
}