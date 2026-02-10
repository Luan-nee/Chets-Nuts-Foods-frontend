import { url_base } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import dataGre from '../json/guiaderemision/get-ok-guiasDeRemision.json';
import dataGreDetalle from '../json/guiaderemision/get-ok-detallesDeUnaGuiaDeRemision.json';

export default class GreApi extends BaseRequestApi {
  private base_url = `${url_base}/guiasEmision`;

  public async get<T>(): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataGre as unknown as BodyResponse<T>;
    } else {
      return this.request<T>(`${this.base_url}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - guias de remision'
        }
      });
    }
  }

  public async getByCodigoSeguimiento<T>(id: number): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataGreDetalle as unknown as BodyResponse<T>;
    } else {
      return this.request<T>(`${this.base_url}/${id}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - detalles de una guia de remision'
        }
      });
    }
  }
}