import ProductoApi from "../../../api/producto.api";
import type { ProductoListado, Producto, ModificarProducto} from "../types/producto.type";

const productoApi = new ProductoApi();

export default class ProductoService {
  public async listarProductos(pagina: number) {
    return productoApi.get<ProductoListado[]>(pagina);
  }

  public async registrarProducto(body: Producto) {
    return productoApi.registrarProducto(body);
  }

  public async modificarProducto(idProducto: number, body: ModificarProducto) {
    return productoApi.modificarProducto(idProducto, body);
  }

  public async inhabilitarProducto(idProducto: number) {
    return productoApi.inhabilitarProducto(idProducto);
  }
}