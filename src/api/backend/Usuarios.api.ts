// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../../config/url_base";

// importación de clases
import BaseRequestApi from '../BaseRequest.api';

// importación de tipos
import type { BodyResponse } from '../../types/bodyResponse.type';
import type { CreateUsuario } from '../../types/backend/usuarios.type';

// importación de datos mock
// ...

export default class Usuarios extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/usuarios`;

  /* create */
  public async create<T>(body: CreateUsuario): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* getDni */
  public async getDni<T>(dni: string): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/dni`, {
      method: 'POST',
      body: JSON.stringify({ dni: dni }),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* getRuc */
  public async getRuc<T>(ruc: string): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/ruc`, {
      method: 'POST',
      body: JSON.stringify({ ruc: ruc }),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* getAll */
  public async getAll<T>(): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* getClientes */
  public async getClientes<T>(): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/clientes`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }
}