// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../config/url_base";

// importación de clases
import BaseRequestApi from "./BaseRequest.api";

// importación de tipos
import type { BodyResponse } from "../types/bodyResponse.type";
import type {
  ResponseGetAll,
  ResponseGetByID,
  CreateEstablecimiento,
  UpdateEstablecimiento,
} from "../types/establecimiento.type";

// importación de datos mock
// ...

export default class EstablecimientosApi extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/establecimientos`;

  /* obtener establecimientos */
  public async obtenerEstablecimientos(): Promise<BodyResponse<ResponseGetAll[]>> {
    return this.GET<BodyResponse<ResponseGetAll[]>>(
      `${this.base_url_production}`,
    ) as Promise<BodyResponse<ResponseGetAll[]>>;
  }

  /* obtener toda la información de un establecimiento */
  public async detallesEstablecimiento(id: number): Promise<BodyResponse<ResponseGetByID[]>> {
    return this.GET<BodyResponse<ResponseGetByID[]>>(
      `${this.base_url_production}/${id}`,
    ) as Promise<BodyResponse<ResponseGetByID[]>>;
  }

  /* actualizar información del establecimiento */
  public async actualizarEstablecimiento(
    body: UpdateEstablecimiento,
  ): Promise<BodyResponse<UpdateEstablecimiento>> {
    return this.PATCH<UpdateEstablecimiento>(
      `${this.base_url_production}`,
      body,
    ) as Promise<BodyResponse<UpdateEstablecimiento>>;
  }

  /* registrar nuevo establecimiento */
  public async registrarEstablecimiento(
    body: CreateEstablecimiento,
  ): Promise<BodyResponse<number>> {
    return this.POST<number>(
      `${this.base_url_production}`,
      body,
    ) as Promise<BodyResponse<number>>;
  }

  
}
