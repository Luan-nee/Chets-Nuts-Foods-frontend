import { url_base_production } from "../config/url_base";
import BaseRequestApi from './BaseRequest.api';
import type { ResponseGetAllClientes, ResponseCreateCliente, CreateCliente, UpdateCliente } from '../types/clientes.type';
import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';

export default class ClienteApi extends BaseRequestApi {
  private base_url_production = `${url_base_production}/api/usuarios`;

  public async getClientes(page: number = 1): Promise<BodyResponseWithPagination<ResponseGetAllClientes[]>> {
    return this.GET<ResponseGetAllClientes[]>(`${this.base_url_production}?page=${page}`) as Promise<BodyResponseWithPagination<ResponseGetAllClientes[]>>;
  }

  public async createCliente(body: CreateCliente): Promise<BodyResponse<ResponseCreateCliente>> {
    return this.POST<ResponseCreateCliente>(`${this.base_url_production}`, body);
  }

  public async updateCliente(id: number, body: UpdateCliente): Promise<BodyResponse<string>> {
    return this.PATCH<string>(`${this.base_url_production}/${id}`, body);
  }
}
