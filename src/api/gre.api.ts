import { url_base_postman } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse, BodyResponseWithPagination } from '../types/bodyResponse.type';
import type { EmitirGre, ModificarGre } from '../features/gre/types/gre.type';
import dataGre from '../json/guiaderemision/get-ok-guiasDeRemision.json';
import dataGreDetalle from '../json/guiaderemision/get-ok-detallesDeUnaGuiaDeRemision.json';

export default class GreApi extends BaseRequestApi {
  private base_url = `${url_base_postman}/guiasEmision`;

  /* LISTAR GUIAS DE REMISION */
  public async get<T>(pagina: number): Promise<BodyResponseWithPagination<T>> {
    if (this.OFFLINE_MODE) {
      return dataGre as unknown as BodyResponseWithPagination<T>;
    } else {
      return this.request<BodyResponseWithPagination<T>>(`${this.base_url}?pagina=${pagina || 1}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - guias de remision'
        }
      });
    }
  }

  /* DETALLES DE UNA GUIA DE REMISION */
  public async getByCodigoSeguimiento<T>(id: number): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataGreDetalle as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/${id}`, {
        method: 'GET',
        headers: {
          'x-mock-response-name': 'ok - detalles de una guia de remision'
        }
      });
    }
  }

  /* EMITIR GUIA DE REMISION */
  public async emitirGre<T>(body: EmitirGre): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataGreDetalle as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/emitir`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    }
  }

  /* MODIFICAR GUIA DE REMISION */
  public async modificarGre<T>(idGre: number, body: ModificarGre): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataGreDetalle as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/modificar/${idGre}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    }
  }

  /* ELIMINAR GUIA DE REMISION */
  public async eliminarGre<T>(idGre: number): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataGreDetalle as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/eliminar/${idGre}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
}