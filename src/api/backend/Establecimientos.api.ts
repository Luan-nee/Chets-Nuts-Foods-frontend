// import { url_base_postman } from "../../config/url_base";
import { url_base_production } from "../../config/url_base";

// importación de clases
import BaseRequestApi from '../BaseRequest.api';

// importación de tipos
import type { BodyResponse } from '../../types/bodyResponse.type';
import type { CreateEstablecimiento, UpdateEstablecimiento } from '../../types/backend/establecimiento.type';

// importación de datos mock
// ...

export default class Establecimientos extends BaseRequestApi {
  // private base_url_postman = `${url_base_postman}`;
  private base_url_production = `${url_base_production}/api/establecimientos`;

  /* getAll */
  public async getAll<T>(): Promise<BodyResponse<T>> {
    // Este endpoint retorna:
    /* 
    {
      "status": "success",
      "data": [
        {
          "nombreEst": "Prueba 1",
          "codigoSunat": null,
          "direccion": "av. madre de dios con fiscarrald",
          "distrito": "TAMBOPATA",
          "provincia": "TAMBOPATA",
          "tipoestablecimiento": "oficina",
          "estado": 1,
          "descripcion": "Establecimiento de prueba",
          "idEst": 1,
          "nombres": "ZAIN"
        }
      ]
    }
    */

    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* getById */
  public async getById<T>(id: number): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(`${this.base_url_production}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* create */
  public async create<T>(body: CreateEstablecimiento): Promise<BodyResponse<T>> {
    // Este endpoint retorna:
    /*
    {
      "status": "success",
      "data": 2
    }
    */
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }

  /* update */
  public async update<T>(body: UpdateEstablecimiento): Promise<BodyResponse<T>> {
    // Este endpoint retorna:
    /* 
    {
      "status": "success",
      "data": [
        {
          "idEst": 1,
          "iduser": 1,
          "nombres": "ZAIN",
          "apellidomaterno": "VIAMONTE",
          "apellidopaterno": "VILCA",
          "dniuser": "75276127",
          "numero": "925543023",
          "codigoSunat": null,
          "departamento": "MADRE DE DIOS",
          "descripcion": "Establecimiento de prueba",
          "distrito": "TAMBOPATA",
          "provincia": "TAMBOPATA",
          "latitud": "-15.49",
          "longitud": "-70.13",
          "tipoestablecimiento": "anexo",
          "ubigeo": "211101",
          "activo": 1,
          "fechaCreacion": "2026-05-07T02:42:08.000Z"
        }
      ]
    }
    */
    return this.request<BodyResponse<T>>(`${this.base_url_production}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
  }
}