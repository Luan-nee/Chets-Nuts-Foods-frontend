import { url_base_endpoint } from "../config/url_base";
import BaseRequestApi from "./BaseRequest.api";
import type { BodyResponse } from "../types/bodyResponse.type";
import type {
  ResponseGetAllClientes,
  ResponseCreateCliente,
  CreateCliente,
  UpdateCliente,
  GetClienteSinCompras,
  ResponseUpdateCliente,
  ResponseGetClienteByDNI
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
      `${url_base_endpoint}/api/usuarios`,
      body,
    );
  }

  public async updateCliente(
    body: UpdateCliente,
  ): Promise<BodyResponse<ResponseUpdateCliente>> {
    return this.PATCH<ResponseUpdateCliente>(`${url_base_endpoint}/api/usuarios`, body);
  }

  public async getClienteByDNI(
    dni: string
  ): Promise<BodyResponse<ResponseGetClienteByDNI>> {
    return this.POST<ResponseGetClienteByDNI>(
      `${url_base_endpoint}/api/usuarios/dni`,
      { dni }
    );
  }
}
