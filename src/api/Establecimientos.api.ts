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

  /* getAll */
  public async obtenerEstablecimientos(): Promise<BodyResponse<ResponseGetAll[]>> {
    return this.GET<BodyResponse<ResponseGetAll[]>>(
      `${this.base_url_production}`,
    ) as Promise<BodyResponse<ResponseGetAll[]>>;
  }

  /* getById */
  public async getById(id: number): Promise<BodyResponse<ResponseGetByID>> {
    return this.request<BodyResponse<ResponseGetByID>>(
      `${this.base_url_production}/${id}`,
      {
        method: "GET",
      },
    );
  }

  /* create */
  public async create(
    body: CreateEstablecimiento,
  ): Promise<BodyResponse<CreateEstablecimiento>> {
    return this.request<BodyResponse<CreateEstablecimiento>>(
      `${this.base_url_production}`,
      {
        method: "POST",
        body,
      },
    );
  }

  /* update */
  public async update(
    body: UpdateEstablecimiento,
  ): Promise<BodyResponse<UpdateEstablecimiento>> {
    return this.request<BodyResponse<UpdateEstablecimiento>>(
      `${this.base_url_production}`,
      {
        method: "PATCH",
        body,
      },
    );
  }
}
