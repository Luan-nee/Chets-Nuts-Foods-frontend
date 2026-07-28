export type CreateProducto = {
  nombre: string;
  descripcion: string;
  calidad?: string;
  calibre?: string
}

export type ResponseGetAllProductos = {
  idproductdefect: number;
  nombre: string;
  descripcion: string;
  fechacreacion: string;
  calidadproductodefect: string;
  calibreproductdefect: string;
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
  calidadproductodefect?: string;
  calibreproductdefect?: string;
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
  calidadproductodefect: string;
  calibreproductdefect: string;
}