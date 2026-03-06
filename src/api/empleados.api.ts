import { url_base } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import dataEmpleados from '../json/empleados/get-ok-listarEmpleados.json';

export default class EmpleadoApi extends BaseRequestApi {
  private base_url = `${url_base}/empleados`;

  public async get<T>(pagina: number): Promise<BodyResponseWithPagination<T>> {
    if (this.OFFLINE_MODE) {
      return dataEmpleados as unknown as BodyResponseWithPagination<T>;
    } else {
      return this.request<BodyResponseWithPagination<T>>(`${this.base_url}?pagina=${pagina}}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - listar empleados'
        }
      });
    }
  }
}