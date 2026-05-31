import { url_base_production } from "../config/url_base";

import BaseRequestApi from './BaseRequest.api';

import type { BodyResponse } from '../types/bodyResponse.type';
import type { Credenciales } from '../types/usuario.type';

export default class LoginApi extends BaseRequestApi {
  private base_url_production = `${url_base_production}/api/auth`;

  public async iniciarSesion<T>(credenciales: Credenciales): Promise<BodyResponse<T>> {
    const response: Response = await fetch(`${this.base_url_production}/login`, {
      method: 'POST',
      body: JSON.stringify(credenciales),
      headers: {
        "Content-Type": "application/json"
      }
    });

    return response.json();
  }
}
