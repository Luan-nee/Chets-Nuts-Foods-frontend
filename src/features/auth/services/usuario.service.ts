import Usuario from '../../../api/usuario.api';
import EmpleadoApi from '../../../api/empleados.api';
import type { ResponseSesion, Credenciales, roles } from '../../../types/usuario.type';

const usuarioApi = new Usuario();
const empleadoApi = new EmpleadoApi();

export class UsuarioService {
  public async login(credenciales: Credenciales){
    return await usuarioApi.login<ResponseSesion>(credenciales);
  }

  public async getRoles(){
    return await empleadoApi.getRoles<roles[]>();
  }
}