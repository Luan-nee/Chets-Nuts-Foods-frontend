import { url_base_production } from "../config/url_base";

import BaseRequestApi from './BaseRequest.api';

import type { BodyResponseWithPagination } from '../types/bodyResponse.type';

export default class ClienteApi extends BaseRequestApi {
  private base_url_production = `${url_base_production}/api/clientes`;

  public async listarClientes<T>(page: number = 1): Promise<BodyResponseWithPagination<T>> {
    const response: Response = await fetch(`${this.base_url_production}?page=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }
}
