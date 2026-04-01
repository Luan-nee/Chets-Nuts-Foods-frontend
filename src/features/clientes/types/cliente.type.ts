export type Documento = 'DNI' | 'RUC';

export type Cliente = {
  id: number;
  tipoDocumento: Documento;
  numeroDocumento: string;
  nombreRazonSocial: string;
}

export type ListarCliente = Omit<Cliente, 'nombreRazonSocial'> & { nombre_razonSocial: string };