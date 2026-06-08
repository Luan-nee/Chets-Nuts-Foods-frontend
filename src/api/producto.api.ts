import { url_base_production } from "../config/url_base";
import type {
  CreateProducto,
  ResponseGetAllProductos,
  ResponseCreateProducto,
  UpdateProducto,
  ResponseUpdateProducto,
} from "../types/producto.type";
import BaseRequestApi from "./BaseRequest.api";

import type {
  BodyResponse,
  BodyResponseWithPagination,
} from "../types/bodyResponse.type";

export default class ProductoApi extends BaseRequestApi {
  private base_url_production = `${url_base_production}/api/productos`;

  public async get(
    page: number = 1,
  ): Promise<BodyResponseWithPagination<ResponseGetAllProductos[]>> {
    return this.GET(`${this.base_url_production}?page=${page}`) as Promise<
      BodyResponseWithPagination<ResponseGetAllProductos[]>
    >;
  }

  public async create(
    body: CreateProducto,
  ): Promise<BodyResponse<ResponseCreateProducto>> {
    return this.POST(this.base_url_production, body) as Promise<
      BodyResponse<ResponseCreateProducto>
    >;
  }

  public async update(
    body: UpdateProducto,
  ): Promise<BodyResponse<ResponseUpdateProducto>> {
    return this.PATCH(`${this.base_url_production}`, body) as Promise<
      BodyResponse<ResponseUpdateProducto>
    >;
  }
}
