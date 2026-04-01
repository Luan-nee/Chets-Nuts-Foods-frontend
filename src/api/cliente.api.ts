import { url_base } from "../config/url_base";
import type { BodyResponseWithPagination } from "../types/bodyResponse.type";
import dataIniciarSesion from '../json/usuario/post-ok-iniciarSesion.json';
import BaseRequestApi from "./BaseRequest.api";

export default class ClienteApi extends BaseRequestApi {
  private base_url = `${url_base}/clientes`;

  /* LISTAR CLIENTES */
  public async listarClientes<T>(pagina: number): Promise<BodyResponseWithPagination<T>> {
    if (this.OFFLINE_MODE) {
      return dataIniciarSesion as unknown as BodyResponseWithPagination<T>;
    } else {
      return this.request<BodyResponseWithPagination<T>>(`${this.base_url}?pagina=${pagina}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - listar clientes'
        }
      });
    }
  }
}