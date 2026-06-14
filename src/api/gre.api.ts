import { url_base_production } from "../config/url_base";

import BaseRequestApi from './BaseRequest.api';

import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import type { EmitirGre } from '../features/gre/types/gre.type';

export default class GreApi extends BaseRequestApi {
  private base_url_production = `${url_base_production}/api/guias-remision`;

  public async get<T>(page: number = 1): Promise<BodyResponseWithPagination<T>> {
    return this.request<BodyResponseWithPagination<T>>(`${this.base_url_production}?page=${page}`, {
      method: 'GET',
    });
  }

  public async getByCodigoSeguimiento<T>(id: number): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/${id}`, {
      method: 'GET',
    });
  }

  public async emitirGre(body: EmitirGre): Promise<BodyResponse<unknown>> {
    return this.request<BodyResponse<unknown>>(`${this.base_url_production}`, {
      method: 'POST',
      body,
    });
  }
}
