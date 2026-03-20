// importación de clases
import EmpleadoApi from '../../../api/empleados.api';
// importación de tipos
import type { empleado, DetallesEmpleado, UpdateEmpleadoData, DeshabilitarEmpleado, CreateEmpleadoData} from '../types/empleado.type';

const empleadoApi = new EmpleadoApi();
export default class EmpleadoService {
  public async getEmpleados(pagina: number) {
    return empleadoApi.get<empleado[]>(pagina);
  }

  public async getEmpleadoById(idEmpleado: number) {
    return empleadoApi.getEmpleadoById<DetallesEmpleado>(idEmpleado);
  }

  public async UpdateEmpleadoById(idEmpleado: number, body: UpdateEmpleadoData) {
    return empleadoApi.UpdateEmpleadoById<null>(idEmpleado, body);
  }

  public async inhabilitarEmpleado(idEmpleado: number, body: DeshabilitarEmpleado) {
    return empleadoApi.deshabilitarEmpleado<null>(idEmpleado, body);
  }

  public async createEmpleado(body: CreateEmpleadoData) { 
    return empleadoApi.createEmpleado<null>(body);
  }
}