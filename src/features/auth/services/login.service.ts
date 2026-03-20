import Login from '../../../api/login.api';
import type { ResponseSesion, Credenciales } from '../../../types/usuario.type';

const loginApi = new Login();

export default class LoginService {
  public async login(credenciales: Credenciales){
    return await loginApi.iniciarSesion<ResponseSesion>(credenciales);
  }
}