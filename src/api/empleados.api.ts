import { url_base_endpoint } from "../config/url_base";

import BaseRequestApi from './BaseRequest.api';

import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import type { roles } from '../types/usuario.type';

export default class EmpleadoApi extends BaseRequestApi {
  private base_url_production = `${url_base_endpoint}/api/empleados`;

  public async get<T>(page: number = 1): Promise<BodyResponseWithPagination<T>> {
    return this.request<BodyResponseWithPagination<T>>(`${this.base_url_production}?page=${page}`, {
      method: 'GET',
    });
  }

  public async getEmpleadoById<T>(id: number): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/${id}`, {
      method: 'GET',
    });
  }

  public async UpdateEmpleadoById<T>(id: number, body: unknown): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/${id}`, {
      method: 'PATCH',
      body,
    });
  }

  public async deshabilitarEmpleado<T>(id: number, body: unknown): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/${id}/deshabilitar`, {
      method: 'PATCH',
      body,
    });
  }

  public async createEmpleado<T>(body: unknown): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'POST',
      body,
    });
  }

  public async getRoles<T = roles[]>(): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/roles`, {
      method: 'GET',
    });
  }
}
