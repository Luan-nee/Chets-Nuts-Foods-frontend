import { useState } from 'react';
import { Search, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import TableProductos from '../../features/productos/components/TableProductos';
import FormCreateProducto from '../../features/productos/components/FormCreateProducto';

export default function Productos() {
  const [showFromCreateProducto, setShowFromCreateProducto] = useState<boolean>(false);
  const [showFromUpdateProducto, setShowFromUpdateProducto] = useState<boolean>(false);
  const [selectProductoId, setSelectProductoId] = useState<number | null>(null);
  
  
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Gestión de Productos</h2>
            <p className="text-sm text-gray-400">Administra el inventario de artículos para tus traslados de carga.</p>
          </div>
          <button 
            onClick={() => setShowFromCreateProducto(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Nuevo Producto
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por SKU o nombre de producto..."
              className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <button className="flex items-center gap-2 bg-gray-950 border border-gray-800 hover:border-gray-700 text-gray-300 px-4 py-2.5 rounded-lg text-sm transition-colors">
            <span>Categoría</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Stock Filter */}
          <button className="flex items-center gap-2 bg-gray-950 border border-gray-800 hover:border-gray-700 text-gray-300 px-4 py-2.5 rounded-lg text-sm transition-colors">
            <span>Stock</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Filter Button */}
          <button className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <TableProductos setShowFromUpdateProducto={setShowFromUpdateProducto} setSelectProductoId={setSelectProductoId} />
        </div>

        {/* Pagination : INHABILITADO */}
        
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-400">
            Mostrando <span className="font-medium text-gray-300">1</span> a <span className="font-medium text-gray-300">4</span> de <span className="font-medium text-gray-300">124</span> productos
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium">1</button>
            <button className="px-3 py-1.5 hover:bg-gray-800 text-gray-400 rounded-lg text-sm font-medium transition-colors">2</button>
            <button className="px-3 py-1.5 hover:bg-gray-800 text-gray-400 rounded-lg text-sm font-medium transition-colors">3</button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div> 
      </div>

      { showFromCreateProducto && 
        <div className="absolute inset-0 z-50 bg-gray-950">
          <FormCreateProducto setShowFromCreateProducto={setShowFromCreateProducto} />
        </div>
      }
    </div>
  );
}