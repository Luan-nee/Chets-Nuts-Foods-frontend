// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../config/url_base";

// importación de clases
import BaseRequestApi from './BaseRequest.api';

// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import type { CreateSalidaTransporte, UpdateSalidaTransporte } from '../types/salidaTransporte.type';

// importación de datos mock
// ...

export default class SalidaTransporte extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/salidas`;

  /* create */
  public async create(body: CreateSalidaTransporte): Promise<BodyResponse<CreateSalidaTransporte>> {
    const response: Response = await fetch(`${this.base_url_production}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* getAll */
  // el tipo no está definido
  public async getAll(): Promise<BodyResponse<null>> {
    const response: Response = await fetch(`${this.base_url_production}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* getByID */
  public async getByID<T>(id: number): Promise<BodyResponse<T>> {
    const response: Response = await fetch(`${this.base_url_production}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* update */
  // el tipo no está definido
  public async update(body: UpdateSalidaTransporte): Promise<BodyResponse<null>> {
    const response: Response = await fetch(`${this.base_url_production}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }
}