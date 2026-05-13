// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../../config/url_base";

// importación de clases
import BaseRequestApi from '../BaseRequest.api';

// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../../types/bodyResponse.type';
import type { CreateAcceso, UpdateAcceso } from '../../types/backend/accesos.type';

// importación de datos mock
// ...

export default class Auth extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/accesos`;

  /* create */
  public async create<T>(body: CreateAcceso): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }
  
  /* getAllColaboradores */
  public async getAllColaboradores<T>(page: number): Promise<BodyResponseWithPagination<T>> {
    return this.request<BodyResponseWithPagination<T>>(`${this.base_url_production}?page=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  /* getByID */
  public async getByID<T>(id: number): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  /* update */
  public async update<T>(body: UpdateAcceso): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }
}