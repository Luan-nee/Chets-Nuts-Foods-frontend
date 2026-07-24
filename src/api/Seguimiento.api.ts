// import { url_base_postman } from "../../config/url_base";
import { url_base_endpoint } from "../config/url_base";

// importación de clases
import BaseRequestApi from "./BaseRequest.api";

// importación de tipos
import type { BodyResponse } from "../types/bodyResponse.type";
import type { ResponseGetAll, RegistrarSeguimiento, ResponseRegistrarSeguimiento} from "../types/seguimiento.type";

export default class Seguimiento extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_endpoint}/api/seguimiento/salida`;

  /* create */
  public async seguimientoSalidaTransporte(idSalidaTransporte: number) {
    return this.GET<ResponseGetAll[]>(
      `${this.base_url_production}/${idSalidaTransporte}`,
    ) as Promise<BodyResponse<ResponseGetAll[]>>;
  }

  public async registrarSeguimientoSalidaTransporte(
    body: RegistrarSeguimiento,
    idSalidaTransporte: number
  ) {
    return this.POST<ResponseRegistrarSeguimiento>(
      `${this.base_url_production}/${idSalidaTransporte}`,
      body
    ) as Promise<BodyResponse<ResponseRegistrarSeguimiento>>;
  }
}
