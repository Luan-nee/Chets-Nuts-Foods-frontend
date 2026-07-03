// import { url_base_postman } from "../../config/url_base";
import { url_base_endpoint } from "../config/url_base";

// importación de clases
import BaseRequestApi from './BaseRequest.api';

// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import type { Credenciales, AuthResponse } from "../types/auth.type";
// importación de datos mock
// ...

export default class Auth extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_endpoint}/api/auth`;

  /* login */
  public async login(credenciales: Credenciales): Promise<BodyResponse<AuthResponse>> {
    return this.POST<AuthResponse>(`${this.base_url_production}/login`, credenciales);
  }
}