import { url_base_endpoint } from "../config/url_base";
import BaseRequestApi from './BaseRequest.api';
import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import type { ResponseGetAll, EmitirGre } from '../types/gre.type'

export default class GreApi extends BaseRequestApi {
  private base_url_production = `${url_base_endpoint}/api/paquetes`;

  public async ListarGuias(page: number = 1): Promise<BodyResponseWithPagination<ResponseGetAll[]>> {
    return this.GET<ResponseGetAll[]>(`${this.base_url_production}/guias?page=${page}`) as Promise<BodyResponseWithPagination<ResponseGetAll[]>>;
  }

  public async emitirGre(body: EmitirGre, idPaquete: number): Promise<BodyResponse<string>> {
    return this.POST<string>(`${this.base_url_production}/${idPaquete}/guia`, body) as Promise<BodyResponse<string>>;
  }
}
