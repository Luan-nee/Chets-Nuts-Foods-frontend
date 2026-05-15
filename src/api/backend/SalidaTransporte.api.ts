// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../../config/url_base";

// importación de clases
import BaseRequestApi from '../BaseRequest.api';

// importación de tipos
import type { BodyResponse } from '../../types/bodyResponse.type';
import type { CreateSalidaTransporte, UpdateSalidaTransporte } from '../../types/backend/salidaTransporte.type';

// importación de datos mock
// ...

export default class SalidaTransporte extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/salidas`;

  /* create */
  public async create<T>(body: CreateSalidaTransporte): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* getAll */
  public async getAll<T>(): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* filtrado */
  // Aún no se ha implementado.

  /* getByID */
  public async getByID<T>(id: number): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* update */
  public async update<T>(body: UpdateSalidaTransporte): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }
}