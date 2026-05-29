// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../config/url_base";

// importación de clases
import BaseRequestApi from './BaseRequest.api';

// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import type { CreateUsuario, ResponseGetDni, ResponseGetAll } from '../types/usuarios.type';

// importación de datos mock
// ...

export default class Usuarios extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/usuarios`;

  /* create */
  public async create(body: CreateUsuario): Promise<BodyResponse<CreateUsuario>> {
    const response: Response = await fetch(`${this.base_url_production}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* getDni */
  public async getDni(p_dni: string): Promise<BodyResponse<ResponseGetDni>> {
    const response: Response = await fetch(`${this.base_url_production}/dni`, {
      method: 'POST',
      body: JSON.stringify({ dni: p_dni }),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* getRuc */
  public async getRuc(p_ruc: string): Promise<BodyResponse<null>> {
    const response: Response = await fetch(`${this.base_url_production}/ruc`, {
      method: 'POST',
      body: JSON.stringify({ ruc: p_ruc }),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* getAll */
  public async getAll(): Promise<BodyResponse<ResponseGetAll>> {
    const response: Response = await fetch(`${this.base_url_production}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* getClientes */
  public async getClientes(): Promise<BodyResponse<null>> {
    const response: Response = await fetch(`${this.base_url_production}/clientes`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }
}