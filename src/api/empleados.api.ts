import { url_base_production } from "../config/url_base";

import BaseRequestApi from './BaseRequest.api';

import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import type { roles } from '../types/usuario.type';

export default class EmpleadoApi extends BaseRequestApi {
  private base_url_production = `${url_base_production}/api/empleados`;

  public async get<T>(page: number = 1): Promise<BodyResponseWithPagination<T>> {
    const response: Response = await fetch(`${this.base_url_production}?page=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  public async getEmpleadoById<T>(id: number): Promise<BodyResponse<T>> {
    const response: Response = await fetch(`${this.base_url_production}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  public async UpdateEmpleadoById<T>(id: number, body: unknown): Promise<BodyResponse<T>> {
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

  public async deshabilitarEmpleado<T>(id: number, body: unknown): Promise<BodyResponse<T>> {
    const response: Response = await fetch(`${this.base_url_production}/${id}/deshabilitar`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    });

    return response.json();
  }

  public async createEmpleado<T>(body: unknown): Promise<BodyResponse<T>> {
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

  public async getRoles<T = roles[]>(): Promise<BodyResponse<T>> {
    const response: Response = await fetch(`${this.base_url_production}/roles`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }
}
