// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../../config/url_base";

// importación de clases
import BaseRequestApi from '../BaseRequest.api';

// importación de tipos
import type { BodyResponse } from '../../types/bodyResponse.type';
import type { Credenciales } from "../../types/usuario.type";
// importación de datos mock
// ...

export default class Auth extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/auth`;

  /* login */
  public async login<T>(credenciales: Credenciales): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/login`, {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });
  }
}