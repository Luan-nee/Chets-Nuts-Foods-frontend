import { url_base_postman, url_base_production } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import type { UpdateEmpleadoData, DeshabilitarEmpleado, CreateEmpleadoData } from '../features/empleados/types/empleado.type';
import dataEmpleados from '../json/empleados/get-ok-listarEmpleados.json';

export default class EmpleadoApi extends BaseRequestApi {
  private base_url_postman = `${url_base_postman}/empleados`;
  private base_url_production = `${url_base_production}/api/accesos`;

  /* LISTAR EMPLEADOS */
  public async get<T>(pagina: number): Promise<BodyResponseWithPagination<T>> {
    if (this.OFFLINE_MODE) {
      return dataEmpleados as unknown as BodyResponseWithPagination<T>;
    }
    if (this.PRODUCTION_MODE) {
      return this.request<BodyResponseWithPagination<T>>(`${this.base_url_production}?pagina=${pagina}`, {
        method: 'GET'
      });
    }
    return this.request<BodyResponseWithPagination<T>>(`${this.base_url_postman}?pagina=${pagina}`, {
      method: 'GET',
      headers: {
        'x-mock-response-name': 'ok - listar empleados'
      }
    });
  }

  /* DETALLES DE UN EMPLEADO */
  public async getEmpleadoById<T>(idEmpleado: number): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataEmpleados as unknown as BodyResponse<T>;
    }
    if (this.PRODUCTION_MODE) {
      return this.request<BodyResponse<T>>(`${this.base_url_production}/${idEmpleado}`, {
        method: 'GET'
      });
    }
    return this.request<BodyResponse<T>>(`${this.base_url_postman}/${idEmpleado}`, {
      method: 'GET',
      headers: {
        'x-mock-response-name': 'ok - detalles de un empleado'
      }
    });
  }

  /* EDITAR EMPLEADO */
  public async  UpdateEmpleadoById<T>(idEmpleado: number, body: UpdateEmpleadoData): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataEmpleados as unknown as BodyResponse<T>;
    }
    if (this.PRODUCTION_MODE) {
      return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...body,
          idacceso: idEmpleado
        })
      });
    }
    return this.request<BodyResponse<T>>(`${this.base_url_postman}/${idEmpleado}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-mock-response-name': 'ok - editar empleado'
      },
      body: JSON.stringify(body)
    });
  }

  /* LISTAR ROLES ------------------------------> mover a otra clase */
  public async getRoles<T>(): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataEmpleados as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url_postman}/roles`, {
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
    }
    if (this.PRODUCTION_MODE) {
      return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...body,
          idacceso: idEmpleado
        })
      });
    }
    return this.request<BodyResponse<T>>(`${this.base_url_postman}/${idEmpleado}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-mock-response-name': 'ok - deshabilitar empleado'
      },
      body: JSON.stringify(body)
    });
    
  }

  /* REGISTRAR NUEVO EMPLEADO */
  public async createEmpleado<T>(body: CreateEmpleadoData): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataEmpleados as unknown as BodyResponse<T>;
    } 
    if (this.PRODUCTION_MODE) {
      return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    }
    return this.request<BodyResponse<T>>(`${this.base_url_postman}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-mock-response-name': 'ok - registrar empleado'
      },
      body: JSON.stringify(body)
    });
  }
}