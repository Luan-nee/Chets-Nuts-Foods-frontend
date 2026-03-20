import EmpleadoApi from '../../../api/empleados.api';
import type { roles } from '../../../types/usuario.type';

const empleadoApi = new EmpleadoApi();

export class UsuarioService {
  public async getRoles(){
    return await empleadoApi.getRoles<roles[]>();
  }
}