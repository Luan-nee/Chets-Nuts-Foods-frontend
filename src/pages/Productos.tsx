import { useState } from "react";
import { useAutorizacion } from "../config/useAutorizacion";
import { Search, Filter, Plus } from "lucide-react";
import FormUpdate from "../features/productos/components/FormUpdate";
import FormCreate from "../features/productos/components/FormCreate";
import TableProductos from "../features/productos/components/TableProductos";

export default function Productos() {
  const { tienePermiso } = useAutorizacion();
  const [showFormEditProduct, setShowFormEditProduct] = useState<boolean>(false);
  const [showFormCreateProduct, setShowFormCreateProduct] = useState<boolean>(false);
  const [selectProductoId, setSelectProductoId] = useState<number | null>(null);
  
  // Este estado se utiliza para compartir el estado actual de la pagina 
  // al componente FormUpdate, porque no existe un endpoint en en backend
  // que me permita obtener los datos de un solo producto por su ID.
  const [paginaActual, setPaginaActual] = useState<number>(1);

  return (
    <div className="relative flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Gestión de productos</h2>
            <p className="text-sm text-gray-400">Administra los productos de la empresa.</p>
          </div>

          { tienePermiso('PUEDE_REGISTRAR_NUEVO_PRODUCTO') && (
            <button 
              onClick={() => setShowFormCreateProduct(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
              <Plus className="w-5 h-5" />
              Nuevo Producto
            </button>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por nombre de producto..."
              className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filter Button */}
          <button className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Table */}
      <TableProductos 
        setSelectProductoId={setSelectProductoId}  
        showFormEdit={setShowFormEditProduct} 
        setPaginActual={setPaginaActual} 
      />

      { showFormEditProduct && 
        <FormUpdate 
          showFormEdit={setShowFormEditProduct} 
          idProducto={selectProductoId? selectProductoId : 0} 
          pagina={paginaActual}  
        />
      }

      { showFormCreateProduct && 
        <FormCreate 
          showFormCreate={setShowFormCreateProduct} 
        />
      }
    </div>
  );
}