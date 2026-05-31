import { url_base_production } from "../config/url_base";

import BaseRequestApi from './BaseRequest.api';

import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import type { EmitirGre } from '../features/gre/types/gre.type';

export default class GreApi extends BaseRequestApi {
  private base_url_production = `${url_base_production}/api/guias-remision`;

  public async get<T>(page: number = 1): Promise<BodyResponseWithPagination<T>> {
    const response: Response = await fetch(`${this.base_url_production}?page=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  public async getByCodigoSeguimiento<T>(id: number): Promise<BodyResponse<T>> {
    const response: Response = await fetch(`${this.base_url_production}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  public async emitirGre(body: EmitirGre): Promise<BodyResponse<unknown>> {
    const response: Response = await fetch(`${this.base_url_production}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    });

    return response.json();
  }
}
