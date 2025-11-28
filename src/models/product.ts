interface PropProduct{
  id: number;
  sku: string;
  nombre: string;
  stock_actual: number;
  stock_minimo: number;
  precio_compra_proveedor: number;
  porcentaje_ganancia: number;
  descripcion: string;
  id_administrador: number;
}

interface PropGetProducts{
  id: number;
  sku: string;
  nombre: string;
  stock_actual: number;
  stock_minimo: number;
  precio_venta: number;
  descripcion: string;
}

interface PropUpdateProduct{
  nombre: string;
  stock_actual: number;
  stock_minimo: number;
  precio_compra_proveedor: number;
  porcentaje_ganancia: number;
  descripcion: string;
}

interface PropResponse{
  status: string;
  message: string;
}

export class Product {
  public readonly id: number;
  public readonly sku: string;
  public readonly nombre: string;
  public readonly stock_actual: number;
  public readonly stock_minimo: number;
  public readonly precio_compra_proveedor: number;
  public readonly porcentaje_ganancia: number;
  public readonly descripcion: string;
  public readonly id_administrador: number;

  constructor(param: PropProduct) {
    this.id = param.id;
    this.sku = param.sku;
    this.nombre = param.nombre;
    this.stock_actual = param.stock_actual;
    this.stock_minimo = param.stock_minimo;
    this.precio_compra_proveedor = param.precio_compra_proveedor;
    this.porcentaje_ganancia = param.porcentaje_ganancia;
    this.descripcion = param.descripcion;
    this.id_administrador = param.id_administrador;
  }

  // muestras los datos necesarios del producto 
  getProductInfo(): PropGetProducts {
    return {
      id: this.id,
      sku: this.sku,
      nombre: this.nombre,
      stock_actual: this.stock_actual,
      stock_minimo: this.stock_minimo,
      precio_venta: Math.round(this.precio_compra_proveedor * (1 + this.porcentaje_ganancia / 100)),
      descripcion: this.descripcion,
    };
  }

  // updateProduct(param: PropUpdateProduct): PropResponse {
  //   // Cödigo para actualizar el producto
  //   // ...
    
  //   // mensaje del estado de las operaciones
  //   let response: PropResponse = {
  //     status: 'success',
  //     message: 'Producto actualizado correctamente',
  //   };

  //   return response;
  // }
}