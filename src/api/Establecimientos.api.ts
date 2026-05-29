// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../config/url_base";

// importación de clases
import BaseRequestApi from './BaseRequest.api';

// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import type { ResponseGetAll, ResponseGetByID, CreateEstablecimiento, UpdateEstablecimiento } from '../types/establecimiento.type';

// importación de datos mock
// ...

export default class Establecimientos extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/establecimientos`;

  /* getAll */
  public async getAll(): Promise<BodyResponse<ResponseGetAll[]>> {
    const response: Response = await fetch(`${this.base_url_production}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* getById */
  public async getById(id: number): Promise<BodyResponse<ResponseGetByID>> {
    const response: Response = await fetch(`${this.base_url_production}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* create */
  public async create(body: CreateEstablecimiento): Promise<BodyResponse<CreateEstablecimiento>> {
    const response: Response = await fetch(`${this.base_url_production}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* update */
  public async update(body: UpdateEstablecimiento): Promise<BodyResponse<UpdateEstablecimiento>> {
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