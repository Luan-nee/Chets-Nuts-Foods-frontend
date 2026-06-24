export type CreateProducto = {
  nombre: string;
  descripcion: string;
}

export type ResponseGetAllProductos = {
  idproductdefect: number;
  nombre: string;
  descripcion: string;
  fechacreacion: string;
}

export type ResponseCreateProducto = {
  idproductdefect: number;
  nombre: string;
  descripcion: string;
  fechacreacion: string;
}

export type UpdateProducto = {
  idProductDefect: number;
  nombre?: string;
  descripcion?: string;
}

export type ResponseUpdateProducto = {
  idproductodefect: number;
  nombre: string;
  descripcion: string;
  fechacreacion: string;
}

export type ResponseGetProductoById = {
  nombre: string;
  descripcion: string;
}