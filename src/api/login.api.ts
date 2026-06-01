import { url_base_production } from "../config/url_base";

import BaseRequestApi from './BaseRequest.api';

import type { BodyResponse } from '../types/bodyResponse.type';
import type { Credenciales } from '../types/usuario.type';
import { EmitConsultas } from "./EmitConsultas";

export default class LoginApi extends BaseRequestApi {
  private base_url_production = `${url_base_production}/api/auth/login`;

  public async iniciarSesion<T>(credenciales: Credenciales): Promise<BodyResponse<T>> {
      const response =await EmitConsultas.POST(
        this.base_url_production,
        JSON.stringify(credenciales),
      );
      return response;
  }
}
