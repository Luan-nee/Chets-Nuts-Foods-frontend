// import { url_base_postman } from "../../config/url_base";
import { url_base_endpoint } from "../config/url_base";

// importación de clases
import BaseRequestApi from './BaseRequest.api';

// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import type { CreateUsuario, ResponseGetDni, ResponseGetAll } from '../types/usuarios.type';

// importación de datos mock
// ...

export default class Usuarios extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_endpoint}/api/usuarios`;

  /* create */
  public async create(body: CreateUsuario): Promise<BodyResponse<CreateUsuario>> {
    return this.request<BodyResponse<CreateUsuario>>(`${this.base_url_production}`, {
      method: 'POST',
      body,
    });
  }

  /* getDni */
  public async getDni(p_dni: string): Promise<BodyResponse<ResponseGetDni>> {
    return this.request<BodyResponse<ResponseGetDni>>(`${this.base_url_production}/dni`, {
      method: 'POST',
      body: { dni: p_dni },
    });
  }

  /* getRuc */
  public async getRuc(p_ruc: string): Promise<BodyResponse<null>> {
    return this.request<BodyResponse<null>>(`${this.base_url_production}/ruc`, {
      method: 'POST',
      body: { ruc: p_ruc },
    });
  }

  /* getAll */
  public async getAll(): Promise<BodyResponse<ResponseGetAll>> {
    return this.request<BodyResponse<ResponseGetAll>>(`${this.base_url_production}`, {
      method: 'GET',
    });
  }

  /* getClientes */
  public async getClientes(): Promise<BodyResponse<null>> {
    return this.request<BodyResponse<null>>(`${this.base_url_production}/clientes`, {
      method: 'GET',
    });
  }
}