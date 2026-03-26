type Producto = {
  id: number;
  nombre: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export type ProductoListado = Omit< Producto, 'fechaCreacion' | 'fechaActualizacion' >;

export type CrearProducto = Omit< Producto, 'id' | 'fechaCreacion' | 'fechaActualizacion' >;

export type ModificarProducto = Omit< Producto, 'id' | 'fechaCreacion' | 'fechaActualizacion' >;

export type DetallesProducto =  Omit< Producto, 'fechaCreacion' | 'fechaActualizacion' >;