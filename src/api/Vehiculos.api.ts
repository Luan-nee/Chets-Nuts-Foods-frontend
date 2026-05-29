// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../config/url_base";

// importación de clases
import BaseRequestApi from './BaseRequest.api';

// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import type { ResponseGetByID, CreateVehiculo, UpdateVehiculo, ResponseGetAllChoferes, ResponseCreate, ResponseUpdate} from '../types/vehiculos.type';

// importación de datos mock
// ...

export default class Vehiculos extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/vehiculos`;

  /* getAll */
  public async getAll<T>(page: number = 1): Promise<BodyResponseWithPagination<T>> {
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

  /* getAllChoferes */
  public async getAllChoferes(): Promise<BodyResponse<ResponseGetAllChoferes>> {
    const response: Response = await fetch(`${this.base_url_production}/choferes`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* create */
  public async create(body: CreateVehiculo): Promise<BodyResponse<ResponseCreate>> {
    const response: Response = await fetch(`${this.base_url_production}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* update */
  public async update(body: UpdateVehiculo): Promise<BodyResponse<ResponseUpdate>> {
    const response: Response = await fetch(`${this.base_url_production}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }
}