import { url_base } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import type { UpdateEmpleadoData, DeshabilitarEmpleado, CreateEmpleadoData } from '../features/empleados/types/empleado.type';
import dataEmpleados from '../json/empleados/get-ok-listarEmpleados.json';

export default class EmpleadoApi extends BaseRequestApi {
  private base_url = `${url_base}/empleados`;

  /* LISTAR EMPLEADOS */
  public async get<T>(pagina: number): Promise<BodyResponseWithPagination<T>> {
    if (this.OFFLINE_MODE) {
      return dataEmpleados as unknown as BodyResponseWithPagination<T>;
    } else {
      return this.request<BodyResponseWithPagination<T>>(`${this.base_url}?pagina=${pagina}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - listar empleados'
        }
      });
    }
  }

  /* DETALLES DE UN EMPLEADO */
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

  /* EDITAR EMPLEADO */
  public async  UpdateEmpleadoById<T>(idEmpleado: number, body: UpdateEmpleadoData): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataEmpleados as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/${idEmpleado}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-mock-response-name': 'ok - editar empleado'
        },
        body: JSON.stringify(body)
      });
    }
  }

  /* LISTAR ROLES ------------------------------> mover a otra clase */
  public async getRoles<T>(): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataEmpleados as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/roles`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - listar roles'
        }
      });
    }
  }

  /* DESHABILITAR EMPLEADO */
  public async deshabilitarEmpleado<T>(idEmpleado: number, body: DeshabilitarEmpleado): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataEmpleados as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/${idEmpleado}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-mock-response-name': 'ok - deshabilitar empleado'
        },
        body: JSON.stringify(body)
      });
    }
  }

  /* REGISTRAR NUEVO EMPLEADO */
  public async createEmpleado<T>(body: CreateEmpleadoData): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataEmpleados as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-mock-response-name': 'ok - registrar empleado'
        },
        body: JSON.stringify(body)
      });
    }
  }
}