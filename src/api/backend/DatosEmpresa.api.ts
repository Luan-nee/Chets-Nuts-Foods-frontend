// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../../config/url_base";

// importación de clases
import BaseRequestApi from '../BaseRequest.api';

// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../../types/bodyResponse.type';
import type { CreateAcceso, UpdateAcceso } from '../../types/backend/accesos.type';

// importación de datos mock
// ...

export default class DatosEmpresa extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/empresa`;

  /* setDatos */
  public async setDatos<T>(body: any): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }
}