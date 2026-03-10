import { url_base } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import type { UpdateEmpleadoData } from '../features/empleados/types/empleado.type';
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

  public async getEmpleadoById<T>(idEmpleado: number): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataEmpleados as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/${idEmpleado}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - detalles de un empleado'
        }
      });
    }
  }

  public async UpdateEmpleadoById<T>(idEmpleado: number, body: UpdateEmpleadoData): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataEmpleados as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/${idEmpleado}`, {
        method: 'PATCH',
        headers: {
          'x-mock-response-name': 'ok - detalles de un empleado'
        },
        body: JSON.stringify(body)
      });
    }
  }
}