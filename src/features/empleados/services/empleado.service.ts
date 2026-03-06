// importación de clases
import EmpleadoApi from '../../../api/empleados.api';
// importación de tipos
import type { empleado } from '../types/empleado.type';

const empleadoApi = new EmpleadoApi();
export default class EmpleadoService {
  public async getEmpleados(pagina: number) {
    return empleadoApi.get<empleado[]>(pagina);
  }
}