import { url_base_endpoint } from "../config/url_base";
import BaseRequestApi from "./BaseRequest.api";
import type { BodyResponse } from "../types/bodyResponse.type";
import type {
  ResponseGetAllClientes,
  ResponseCreateCliente,
  CreateCliente,
  UpdateCliente,
  GetClienteSinCompras,
} from "../types/clientes.type";

export default class ClienteApi extends BaseRequestApi {
  private base_url_production = `${url_base_endpoint}/api/usuarios/clientes`;

  public async getClientesSinCompras(): Promise<
    BodyResponse<GetClienteSinCompras[]>
  > {
    return this.GET<GetClienteSinCompras[]>(
      `${url_base_endpoint}/api/usuarios`,
    ) as Promise<BodyResponse<GetClienteSinCompras[]>>;
  }

  public async getClientes(): Promise<BodyResponse<ResponseGetAllClientes[]>> {
    return this.GET<ResponseGetAllClientes[]>(
      `${this.base_url_production}`,
    ) as Promise<BodyResponse<ResponseGetAllClientes[]>>;
  }

  public async createCliente(
    body: CreateCliente,
  ): Promise<BodyResponse<ResponseCreateCliente>> {
    return this.POST<ResponseCreateCliente>(
      `${this.base_url_production}`,
      body,
    );
  }

  public async updateCliente(
    id: number,
    body: UpdateCliente,
  ): Promise<BodyResponse<string>> {
    return this.PATCH<string>(`${this.base_url_production}/${id}`, body);
  }
}
