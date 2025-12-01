  interface PropProduct{ // Los datos que voy a recibir de la API
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

interface PropReturn_getProduct{
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

interface PropResponse{
  status: number;
  message: string;
  info: PropReturn_getProduct[] | PropProduct[];
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

  precioVenta(): number {
    return this.precio_compra_proveedor + (this.precio_compra_proveedor * this.porcentaje_ganancia) / 100;
  }

  // muestras los datos necesarios del producto 
  static getProduct(): PropResponse {
  // llamada a la API para obtener los productos
  // ...

    const products: PropProduct[] = [
      {
        id: 1,
        sku: 'P0001',
        nombre: 'Producto 1',
        stock_actual: 100,
        stock_minimo: 20,
        precio_compra_proveedor: 50,
        porcentaje_ganancia: 30,
        descripcion: 'Descripción del producto 1',
        id_administrador: 1
      },
      {
        id: 2,
        sku: 'P0002',
        nombre: 'Producto 2',
        stock_actual: 50,
        stock_minimo: 10,
        precio_compra_proveedor: 30,
        porcentaje_ganancia: 25,
        descripcion: 'Descripción del producto 2',
        id_administrador: 1
      },
      {
        id: 3,
        sku: 'P0003',
        nombre: 'Producto 3',
        stock_actual: 30,
        stock_minimo: 5,
        precio_compra_proveedor: 20,
        porcentaje_ganancia: 15,
        descripcion: 'Descripción del producto 3',
        id_administrador: 1
      }
    ];

    let response: PropResponse = {  
      status: 200,
      message: 'Productos obtenidos correctamente',
      info: products
    };

    return response;
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