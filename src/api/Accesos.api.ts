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


export default class Accesos extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/accesos`;

  /* create */
  public async create(body: CreateAcceso) {
    return this.POST<string>(`${this.base_url_production}`, body);
  }
  
  /* getAllColaboradores */
  public async getAllColaboradores(page: number): Promise<BodyResponseWithPagination<ResponseGetAllColaboradores[]>> {
    return this.GET<ResponseGetAllColaboradores[]>(`${this.base_url_production}?page=${page}`) as Promise<BodyResponseWithPagination<ResponseGetAllColaboradores[]>>;
  }

  /* getByID */
  public async getByID(id: number): Promise<BodyResponse<ResponseGetByID>> {
    return this.GET<ResponseGetByID>(`${this.base_url_production}/${id}`);
  }

  /* update */
  public async actualizarAcceso(body: UpdateAcceso): Promise<BodyResponse<string>> {
    return this.PATCH<string>(`${this.base_url_production}`, body);
  }

  /* roles */
  public async roles(): Promise<BodyResponse<ResponseRoles[]>> {
    return this.GET<ResponseRoles[]>(`${this.base_url_production}/roles`)
  }
}