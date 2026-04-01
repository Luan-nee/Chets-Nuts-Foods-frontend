import ClienteApi from '../../../api/cliente.api';
import type { ListarCliente } from '../types/cliente.type';

const clienteApi = new ClienteApi();

export default class ClienteService {
  public async listarClientes(pagina: number) {
    return clienteApi.listarClientes<ListarCliente[]>(pagina);
  }
}