import { url_base_production } from "../config/url_base";

import BaseRequestApi from './BaseRequest.api';

import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';

export default class ProductoApi extends BaseRequestApi {
  private base_url_production = `${url_base_production}/api/productos`;

  public async get<T>(page: number = 1): Promise<BodyResponseWithPagination<T>> {
    const response: Response = await fetch(`${this.base_url_production}?page=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  public async registrarProducto<T>(body: unknown): Promise<BodyResponse<T>> {
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

  public async modificarProducto<T>(id: number, body: unknown): Promise<BodyResponse<T>> {
    const response: Response = await fetch(`${this.base_url_production}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    });

    return response.json();
  }

  public async inhabilitarProducto<T>(id: number): Promise<BodyResponse<T>> {
    const response: Response = await fetch(`${this.base_url_production}/${id}/deshabilitar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  public async getDetallesProducto<T>(id: number): Promise<BodyResponse<T>> {
    const response: Response = await fetch(`${this.base_url_production}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }
}
