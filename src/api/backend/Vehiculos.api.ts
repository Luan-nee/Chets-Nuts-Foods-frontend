// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../../config/url_base";

// importación de clases
import BaseRequestApi from '../BaseRequest.api';

// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../../types/bodyResponse.type';
import type { CreateVehiculo, UpdateVehiculo } from '../../types/backend/vehiculos.type';

// importación de datos mock
// ...

export default class Vehiculos extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/vehiculos`;

  /* getAll */
  public async getAll<T>(page: number = 1): Promise<BodyResponseWithPagination<T>> {
    return this.request<BodyResponseWithPagination<T>>(`${this.base_url_production}?page=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* getByID */
  public async getByID<T>(id: number): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* getAllChoferes */
  public async getAllChoferes<T>(): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/choferes`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* create */
  public async create<T>(body: CreateVehiculo): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* update */
  public async update<T>(body: UpdateVehiculo): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }
}