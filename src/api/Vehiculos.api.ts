// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../config/url_base";

// importación de clases
import BaseRequestApi from './BaseRequest.api';

// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import type { ResponseGetAllChoferes} from '../types/vehiculos.type';

// importación de datos mock
// ...

export default class Vehiculos extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/vehiculos`;

  /* getAll */
  public async get<T>(page: number = 1): Promise<BodyResponseWithPagination<T>> {
    const response: Response = await fetch(`${this.base_url_production}?page=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }

  /* getByID */
  public async getVehiculo<T>(id: number): Promise<BodyResponse<T>> {
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
  public async registrarVehiculo<T>(body: unknown): Promise<BodyResponse<T>> {
    const response: Response = await fetch(`${this.base_url_production}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    });

    return response.json();
  }

  /* update */
  public async editarVehiculo<T>(id: number, body: unknown): Promise<BodyResponse<T>> {
    const response: Response = await fetch(`${this.base_url_production}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    });

    return response.json();
  }

  /* inhabilitar */
  public async inhabilitarVehiculo<T>(id: number): Promise<BodyResponse<T>> {
    const response: Response = await fetch(`${this.base_url_production}/${id}/deshabilitar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });

    return response.json();
  }
}