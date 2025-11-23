import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, X, Package, AlertTriangle, Hash, Box, TrendingUp } from 'lucide-react';
import dataProducts from './data/productos.json';

// Interfaz del producto
interface Product {
  id: number;
  sku: string;
  nombre: string;
  stock_actual: number;
  stock_minimo: number;
  porcentaje_ganancia: number;
  precio_compra_proveedor: number;
  descripcion?: string;
  id_usuario_admin: number;
}

// Componente ProductCard
const ProductCard: React.FC<Product> = ({
  sku,
  nombre,
  stock_actual,
  stock_minimo,
  porcentaje_ganancia,
  precio_compra_proveedor,
  descripcion,
}) => {
  const precioVenta = precio_compra_proveedor * (1 + porcentaje_ganancia);
  const gananciaTotal = precioVenta - precio_compra_proveedor;
  const stockBajo = stock_actual <= stock_minimo;
  const porcentajeStock = (stock_actual / stock_minimo) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200">
      {stockBajo && (
        <div className="bg-red-500 text-white px-4 py-2 flex items-center gap-2 text-sm font-semibold">
          <AlertTriangle size={16} />
          <span>Stock Bajo</span>
        </div>
      )}

      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Hash size={14} />
            <span className="font-mono font-semibold">{sku}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{nombre}</h3>
          {descripcion && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{descripcion}</p>
          )}
        </div>

        <div className="mb-4 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Box size={16} />
              <span className="font-semibold text-sm">Stock</span>
            </div>
            <span className={`text-xl font-bold ${stockBajo ? 'text-red-600' : 'text-green-600'}`}>
              {stock_actual}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full transition-all ${stockBajo ? 'bg-red-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(porcentajeStock, 100)}%` }}
            ></div>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Package size={12} />
            <span>Mínimo: {stock_minimo}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Precio Compra</span>
            <span className="text-gray-800 font-semibold">${precio_compra_proveedor.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Ganancia</span>
            <span className="text-blue-600 font-semibold">{(porcentaje_ganancia * 100).toFixed(2)}%</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-gray-800 font-semibold">Precio Venta</span>
            <span className="text-xl font-bold text-green-600">${precioVenta.toFixed(2)}</span>
          </div>

          <div className="bg-green-50 rounded-lg p-2 text-center">
            <span className="text-xs text-gray-600">Ganancia/unidad: </span>
            <span className="text-sm font-bold text-green-700">${gananciaTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
            Editar
          </button>
          <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
            Ver Más
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal de inventario
export default function ProductosView() {
  // Datos de ejemplo
  const [products] = useState<Product[]>(dataProducts as Product[]);

  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'sufficient' | 'sinStock'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Productos filtrados
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Filtro de búsqueda
      const matchesSearch = 
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro de stock
      const matchesStock = 
        stockFilter === 'all' ||
        (stockFilter === 'low' && product.stock_actual <= product.stock_minimo) ||
        (stockFilter === 'sufficient' && product.stock_actual > product.stock_minimo) ||
        (stockFilter === 'sinStock' && product.stock_actual === 0);

      // Filtro de precio
      const precioVenta = product.precio_compra_proveedor * (1 + product.porcentaje_ganancia);
      const matchesPrice = 
        priceRange === 'all' ||
        (priceRange === 'low' && precioVenta < 100) ||
        (priceRange === 'medium' && precioVenta >= 100 && precioVenta <= 500) ||
        (priceRange === 'high' && precioVenta > 500);

      return matchesSearch && matchesStock && matchesPrice;
    });
  }, [products, searchTerm, stockFilter, priceRange]);

  // Estadísticas
  const stats = useMemo(() => {
    const total = products.length;
    const lowStock = products.filter(p => p.stock_actual <= p.stock_minimo).length;
    const totalValue = products.reduce((sum, p) => sum + (p.precio_compra_proveedor * p.stock_actual), 0);
    const cantidadSinStock = products.filter(p => p.stock_actual === 0).length;
    return { total, lowStock, totalValue, cantidadSinStock };
  }, [products]);

  // Limpiar filtros
  const clearFilters = () => {
    setSearchTerm('');
    setStockFilter('all');
    setPriceRange('all');
  };

  const hasActiveFilters = searchTerm || stockFilter !== 'all' || priceRange !== 'all';

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Inventario de Productos</h1>
          <p className="text-gray-600">Gestiona y visualiza todos tus productos</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Productos</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Stock Bajo</p>
                <p className="text-3xl font-bold text-red-600">{stats.lowStock}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Valor Inventario</p>
                <p className="text-3xl font-bold text-green-600">${stats.totalValue.toFixed(2)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Búsqueda */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nombre, SKU o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Botón de filtros */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                showFilters ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <SlidersHorizontal size={20} />
              Filtros
            </button>
          </div>

          {/* Panel de filtros expandible */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Filtro de stock */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estado de Stock
                  </label>
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="all">Todos</option>
                    <option value="low">Stock Bajo</option>
                    <option value="sufficient">Stock Suficiente</option>
                    <option value="sinStock">Sin Stock</option>
                  </select>
                </div>

                {/* Filtro de precio */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rango de Precio de Venta
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="all">Todos</option>
                    <option value="low">Menos de $100</option>
                    <option value="medium">$100 - $500</option>
                    <option value="high">Más de $500</option>
                  </select>
                </div>
              </div>

              {/* Botón limpiar filtros */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold text-sm"
                >
                  <X size={16} />
                  Limpiar Filtros
                </button>
              )}
            </div>
          )}
        </div>

        {/* Resultados */}
        <div className="mb-4">
          <p className="text-gray-600">
            Mostrando <span className="font-semibold text-gray-800">{filteredProducts.length}</span> de{' '}
            <span className="font-semibold text-gray-800">{stats.total}</span> productos
          </p>
        </div>

        {/* Grid de productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Filter className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600 mb-4">Intenta ajustar los filtros de búsqueda</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Limpiar Filtros
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}