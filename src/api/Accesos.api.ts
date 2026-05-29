// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../config/url_base";

// importación de clases
import BaseRequestApi from './BaseRequest.api';

// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import type { 
  CreateAcceso, 
  ResponseGetAllColaboradores,
  ResponseGetByID,
  UpdateAcceso,
  ResponseRoles
} from '../types/accesos.type';

// importación de datos mock
// ...

export default class Accesos extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/accesos`;

  /* create */
  public async create(body: CreateAcceso): Promise<BodyResponse<string>> {
    const response: Response = await fetch(`${this.base_url_production}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }
  
  /* getAllColaboradores */
  public async getAllColaboradores(page: number): Promise<BodyResponseWithPagination<ResponseGetAllColaboradores[]>> {
    const response: Response = await fetch(`${this.base_url_production}?page=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* getByID */
  public async getByID(id: number): Promise<BodyResponse<ResponseGetByID>> {
    const response: Response = await fetch(`${this.base_url_production}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* update */
  public async update(body: UpdateAcceso): Promise<BodyResponse<string>> {
    const response: Response = await fetch(`${this.base_url_production}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* roles */
  public async roles(): Promise<BodyResponse<ResponseRoles[]>> {
    const response: Response = await fetch(`${this.base_url_production}/roles`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }
}