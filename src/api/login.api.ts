import { url_base_postman, url_base_production } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import type { Credenciales } from '../types/usuario.type';
import dataIniciarSesion from '../json/usuario/post-ok-iniciarSesion.json';

export default class Login extends BaseRequestApi {
  private base_url = `${url_base_postman}/login`;
  private base_url_production = `${url_base_production}/api/auth/login`;

  /* INICIAR SESION */
  public async iniciarSesion<T>(credenciales: Credenciales): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataIniciarSesion as unknown as BodyResponse<T>;
    } 
    
    if (this.PRODUCTION_MODE) {
      return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
        method: 'POST',
        body: JSON.stringify(credenciales),
      });
    }

      return this.request<BodyResponse<T>>(`${this.base_url}`, {
        method: 'POST',
        headers: {
          'x-mock-response-name': 'ok - iniciar sesion'
        },
        body: JSON.stringify(credenciales)
      });
    }
}