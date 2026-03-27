import Login from '../../../api/login.api';
import type { ResponseSesion, Credenciales, UserRole } from '../../../types/usuario.type';
import type { BodyResponse } from '../../../types/bodyResponse.type';

const loginApi = new Login();

export default class LoginService {
  public async login(
    credenciales: Credenciales,
    rol: UserRole = 'ADMIN',
    accesoRapido: boolean = false
  ){
    if (accesoRapido) {
      return ({
        "status": "success",
        "message": "Logeado con Exito !!",
        data: {
          tokenZ: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzZXIiOjEsImlhdCI6MTc2OTg4ODc0NCwiZXhwIjoxNzY5ODkyMzQ0fQ.PSKq6psWQVlbVm9GeMBq9-4k4xsRbKA9URZdTDDHYPc",
          rol: rol,
          nombreUser  : (`${
            rol === 'ADMIN' ? 'Vanny' :
            rol === 'COLABORADOR' ? 'Aracely' :
            rol === 'CHOFER' ? 'Juan Perez' :
            'Usuario'
          }`)
        }} as BodyResponse<ResponseSesion>);
    } else {
      return await loginApi.iniciarSesion<ResponseSesion>(credenciales);
    }
  }
}