// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../../config/url_base";

// importación de clases
import BaseRequestApi from '../BaseRequest.api';

// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../../types/bodyResponse.type';
import type { CreateAcceso, UpdateAcceso } from '../../types/backend/accesos.type';

// importación de datos mock
// ...

export default class Vehiculos extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/vehiculos`;

  /* getAll */
  public async getAll<T>(): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  /* getByID */
  /* getAllChoferes */
  /* create */
  /* update */
}