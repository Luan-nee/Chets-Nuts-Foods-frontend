export type Producto = {
  nombre: string;
  peso: number;
  unidadMedida: string;
}

export type ProductoListado = {
  id: number;
  nombre: string;
  peso: number;
  unidadPeso: string;
}

export type CrearProducto = {
  nombre: string;
  peso: number;
  unidadMedidaId: number;
}

export type ModificarProducto = {
  nombre: string;
  peso: number;
  unidadMedida: number;
}

export type DetallesProducto = {
  id: number;
  nombre: string;
  peso: number;
  unidadMedidaId: number;
}