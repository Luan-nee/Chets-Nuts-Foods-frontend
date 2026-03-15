import { url_base } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import type { Credenciales } from '../types/usuario.type';
import dataIniciarSesion from '../json/usuario/post-ok-iniciarSesion.json';

export default class login extends BaseRequestApi {
  private base_url = `${url_base}/usuario`;

  public async iniciarSesion<T>(credenciales: Credenciales): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataIniciarSesion as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}`, {
        method: 'POST',
        headers: {
          'x-mock-response-name': 'ok - iniciar sesion'
        },
        body: JSON.stringify(credenciales)
      });
    }

  }
}