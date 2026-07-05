import { url_base_endpoint } from "../config/url_base";
import BaseRequestApi from './BaseRequest.api';
import type { CreatePaquete } from '../types/paquete.type';
import type { BodyResponse } from '../types/bodyResponse.type';

export default class PaqueteApi extends BaseRequestApi {
  private base_url_production = `${url_base_endpoint}/api/paquetes`;

  /* 
    Verificar que la estructura del dato que retorna el endpoint 
    coincide con lo definido en el método createPaquete.
  */
  public async createPaquete(body: CreatePaquete): Promise<BodyResponse<string>> {
    return this.POST<string>(`${this.base_url_production}`, body);
  }
}
