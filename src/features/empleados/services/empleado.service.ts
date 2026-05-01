// importación de clases
import EmpleadoApi from '../../../api/empleados.api';
// importación de tipos
import type { empleado as empleadoZ } from '../types/empleadoZ.type';
import type { empleado, DetallesEmpleado, UpdateEmpleadoData, DeshabilitarEmpleado, CreateEmpleadoData} from '../types/empleado.type';

const empleadoApi = new EmpleadoApi();
export default class EmpleadoService {
  public async getEmpleados(pagina: number) {
    const empleados = await empleadoApi.get<empleadoZ[]>(pagina);

    const empleadosformateados: empleado[] = empleados.data.map((emp) => ({
      id: emp.idacceso,
      nombres: emp.nombres,
      apellidos: '', // El backend no envía apellidos
      rol: emp.tipos as empleado['rol'],
      dni: emp.dniuser,
      estado: emp.estadoacceso,
      estadoHabilitado: emp.estado,
      correo: emp.correo,
    }));

    return {
      status: empleados.status,
      message: empleados.message,
      data: empleadosformateados,
      pagination: empleados.pagination
    };
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