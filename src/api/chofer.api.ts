import { url_base } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import type { Licencia } from '../features/chofer/types/chofer.type';
import dataIniciarSesion from '../json/usuario/post-ok-iniciarSesion.json';

export default class ChoferApi extends BaseRequestApi {
  private base_url = `${url_base}/chofer`;

  /* AGREGAR DATOS DE CHOFER */
  public async iniciarSesion<T>(body: Licencia): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataIniciarSesion as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}`, {
        method: 'POST',
        headers: {
          'x-mock-response-name': 'ok - agregar datos de chofer'
        },
        body: JSON.stringify(body)
      });
    }

  }
}