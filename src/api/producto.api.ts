import { url_base_postman } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponseWithPagination, BodyResponse } from '../types/bodyResponse.type';
import type { ModificarProducto, CrearProducto } from '../features/productos/types/producto.type';
import dataVehiculos from '../json/vehiculos/get-ok-listarVehiculos.json';

export default class ProductoApi extends BaseRequestApi {
  private base_url = `${url_base_postman}/productos`;
  
  /* LISTAR PRODUCTOS */
  public async get<T>(pagina: number): Promise<BodyResponseWithPagination<T>> {
    if (this.OFFLINE_MODE) {
      return dataVehiculos as unknown as BodyResponseWithPagination<T>;
    } else {
      return this.request<BodyResponseWithPagination<T>>(`${this.base_url}?pagina=${pagina || 1}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - listar productos'
        }
      });
    }
  }

  /* REGISTRAR PRODUCTO */
  public async registrarProducto<T>(body: CrearProducto): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataVehiculos as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-mock-response-name': 'ok - registrar producto'
        },
        body: JSON.stringify(body)
      });
    }
  }

  /* INHABILITAR PRODUCTO */
  public async inhabilitarProducto<T>(idProducto: number): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataVehiculos as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/inhabilitar/${idProducto}`, {
        method: 'POST',
        headers: {
          'x-mock-response-name': 'ok - inhabilitar producto'
        }
      });
    }
  }

  /* MODIFICAR PRODUCTO */
  public async modificarProducto<T>(idProducto: number, body: ModificarProducto): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataVehiculos as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/${idProducto}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-mock-response-name': 'ok - modificar producto'
        },
        body: JSON.stringify(body)
      });
    }
  }

  /* OBTENER DETALLES DE UN PRODUCTO */
  public async getDetallesProducto<T>(idProducto: number): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataVehiculos as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/${idProducto}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - obtener detalles de un producto'
        }
      });
    }
  }
}