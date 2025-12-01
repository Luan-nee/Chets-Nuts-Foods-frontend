import { Plus, Search } from 'lucide-react';
import ProductCard from '../../layouts/ProductCard';
import { Product } from '../../models/product';

export default function ProductosView() {
  const solicitud = Product.getProduct(); // Llamada a la API para obtener los productos
  
  const products = solicitud.info.map((prop) => new Product(prop));

  return (
    <div className="space-y-6">
      
      <div className="flex  items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Productos</h1>
          <p className="text-gray-400 mt-1">Gestión del catálogo de productos</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} />
          Nuevo Producto
        </button>
      </div>

    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por SKU o nombre..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          solicitud.status !== 200 ? (
            <p className="text-red-500 font-bold text-3xl">Error al solicitar productos.</p>
          ) : (
            products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                sku={product.sku}
                nombre={product.nombre}
                stock_actual={product.stock_actual}
                stock_minimo={product.stock_minimo}
                precio_venta={product.precioVenta()}
                descripcion={product.descripcion}
              />
            ))
          )
        }
      </div>
    </div>
  </div>
  );
}