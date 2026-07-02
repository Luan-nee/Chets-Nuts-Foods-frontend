// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../config/url_base";

// importación de clases
import BaseRequestApi from './BaseRequest.api';

// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import type { CreateSalidaTransporte, UpdateSalidaTransporte, ResponseGetAll} from '../types/salidaTransporte.type';

// importación de datos mock
// ...

export default class SalidaTransporte extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/salidas`;

  /* create */
  public async create(body: CreateSalidaTransporte): Promise<BodyResponse<CreateSalidaTransporte>> {
    return this.request<BodyResponse<CreateSalidaTransporte>>(`${this.base_url_production}`, {
      method: 'POST',
      body,
    });
  }

  /* getAll */
  public async getAll(): Promise<BodyResponseWithPagination<ResponseGetAll[]>> {
    return this.GET<ResponseGetAll[]>(`${this.base_url_production}`) as Promise<BodyResponseWithPagination<ResponseGetAll[]>>; 
  }

  /* getByID */
  public async getByID<T>(id: number): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/${id}`, {
      method: 'GET',
    });
  }

  /* update */
  // el tipo no está definido
  public async update(body: UpdateSalidaTransporte): Promise<BodyResponse<null>> {
    return this.request<BodyResponse<null>>(`${this.base_url_production}`, {
      method: 'PATCH',
      body,
    });
  }
}