import { url_base_postman } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import dataGre from '../json/guiaderemision/get-ok-guiasDeRemision.json';

export default class SeguimientoApi extends BaseRequestApi {
  private base_url = `${url_base_postman}/seguimiento`;

  /* REALIZAR SEGUIMIENTO */
  public async realizarSeguimiento<T>(codigoSeguimiento: string): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataGre as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/${codigoSeguimiento}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - realizar seguimiento'
        }
      });
    }
  }
}