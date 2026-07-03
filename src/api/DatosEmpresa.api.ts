// import { url_base_postman } from "../../config/url_base";
import { url_base_endpoint } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import type { UpdateDatosEmpresa, InfoUbicacionState, ResponseObtenerInfoEmpresa } from '../types/datosEmpresa.type';
// importación de datos mock
// ...

export default class DatosEmpresa extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_endpoint}/api/empresa`;

  public async registrarDatosEmpresarial(body: UpdateDatosEmpresa): Promise<BodyResponse<string>> {
    return this.POST<string>(`${this.base_url_production}`, body);
  }
  public async registraUbicacionEmpresa(body: InfoUbicacionState): Promise<BodyResponse<string>> {
    return this.POST<string>(`${url_base_endpoint}/api/establecimientos`, body);
  }
  public async obtenerInfoEmpresa(): Promise<BodyResponse<ResponseObtenerInfoEmpresa>> {
    return this.GET<ResponseObtenerInfoEmpresa>(`${url_base_endpoint}/api/empresa`)
  }
}