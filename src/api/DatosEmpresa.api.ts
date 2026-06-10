// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../config/url_base";

// importación de clases
import BaseRequestApi from './BaseRequest.api';

// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import type { UpdateDatosEmpresa } from '../types/datosEmpresa.type';

// importación de datos mock
// ...

export default class DatosEmpresa extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/empresa`;

  /* setDatos */
  public async setDatos(body: UpdateDatosEmpresa): Promise<BodyResponse<string>> {
    return this.POST<string>(`${this.base_url_production}`, body);
  }
}