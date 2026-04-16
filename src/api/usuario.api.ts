import { url_base_postman } from "../config/url_base";
// importación de clases
import BaseRequestApi from './BaseRequest.api';
// importación de tipos
import type { BodyResponse } from '../types/bodyResponse.type';
import type { RegistroUsuario, EditarUsuario } from '../types/usuario.type';
import dataIniciarSesion from '../json/usuario/post-ok-iniciarSesion.json';

export default class Usuario extends BaseRequestApi {
  private base_url = `${url_base_postman}/usuario`;

  /* CREAR USUARIO */
  public async crearUsuario<T>(bodyUsuario: RegistroUsuario): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataIniciarSesion as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}`, {
        method: 'POST',
        headers: {
          'x-mock-response-name': 'ok - crear usuario'
        },
        body: JSON.stringify(bodyUsuario)
      });
    }
  }
  
  /* EDITAR USUARIO */
  public async editarUsuario<T>(idUsuario: number, bodyUsuario: EditarUsuario): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataIniciarSesion as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/${idUsuario}`, {
        method: 'PATCH',
        headers: {
          'x-mock-response-name': 'ok - editar usuario'
        },
        body: JSON.stringify(bodyUsuario)
      });
    }
  }

  /* ELIMINAR USUARIO */
  public async eliminarUsuario<T>(idUsuario: number): Promise<BodyResponse<T>> {
    if (this.OFFLINE_MODE) {
      return dataIniciarSesion as unknown as BodyResponse<T>;
    } else {
      return this.request<BodyResponse<T>>(`${this.base_url}/${idUsuario}`, {
        method: 'DELETE',
        headers: {
          'x-mock-response-name': 'ok - eliminar usuario'
        }
      });
    }
  }
}