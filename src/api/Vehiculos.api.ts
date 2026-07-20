// import { url_base_postman } from "../../config/url_base";
import { url_base_endpoint } from "../config/url_base";

// importación de clases
import BaseRequestApi from "./BaseRequest.api";

// importación de tipos
import type {
  BodyResponse,
  BodyResponseWithPagination,
} from "../types/bodyResponse.type";
import type { 
  ResponseGetAll, 
  ResponseGetByID, 
  ResponseGetAllChoferes, 
  CreateVehiculo,
  ResponseCreate,
  UpdateVehiculo,
  ResponseUpdate,
  queryGetVehiculos
} from "../types/vehiculos.type";

// importación de datos mock
// ...

export default class Vehiculos extends BaseRequestApi {
  private base_url_production = `${url_base_endpoint}/api/vehiculos`;

  /* getAll */
  public async getAllVehiculos({page,estado,placa,tipo}: queryGetVehiculos): Promise<
    BodyResponseWithPagination<ResponseGetAll[]>
  > {

    let querys = `?page=${page}`;

    if(estado !== undefined){
      querys += `&estado=${estado}`
    }

    if(placa !== undefined){
      querys += `&placa=${placa}`
    }

    if(tipo!== undefined){
      querys += `&tipo=${tipo}`
    }

    return this.GET<ResponseGetAll[]>(
      `${this.base_url_production}${querys}`,
    ) as Promise<BodyResponseWithPagination<ResponseGetAll[]>>;
  }

  /* getByID */
  public async getById(id: number): Promise<BodyResponse<ResponseGetByID[]>> {
    return this.GET<ResponseGetByID[]>(
      `${this.base_url_production}/${id}`,
    ) as Promise<BodyResponse<ResponseGetByID[]>>;
  }

  /* getAllChoferes */
  public async getAllChoferes(): Promise<BodyResponse<ResponseGetAllChoferes>> {
    return this.GET<ResponseGetAllChoferes>(
      `${this.base_url_production}/choferes`,
    ) as Promise<BodyResponse<ResponseGetAllChoferes>>;
  }

  /* create */
  public async createVehiculo(
    body: CreateVehiculo,
  ): Promise<BodyResponse<ResponseCreate>> {
    return this.POST<ResponseCreate>(
      `${this.base_url_production}`,
      body,
    ) as Promise<BodyResponse<ResponseCreate>>;
  }

  /* update */
  public async editarVehiculo(
    body: UpdateVehiculo,
  ): Promise<BodyResponse<ResponseUpdate>> {
    return this.PATCH<ResponseUpdate>(
      `${this.base_url_production}`,
      body,
    ) as Promise<BodyResponse<ResponseUpdate>>;
  }
}
