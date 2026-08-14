import { useState } from "react";
import { Search, Filter, Plus, Package } from "lucide-react";
import ContentPageMain from "../components/layouts/ContentPageMain";
import FormUpdate from "../features/productos/components/FormUpdate";
import FormCreate from "../features/productos/components/FormCreate";
import TableProductos from "../features/productos/components/TableProductos";

export default function Productos() {
  const [showFormEditProduct, setShowFormEditProduct] = useState<boolean>(false);
  const [showFormCreateProduct, setShowFormCreateProduct] = useState<boolean>(false);
  const [selectProductoId, setSelectProductoId] = useState<number | null>(null);
  
  // Este estado se utiliza para compartir el estado actual de la pagina 
  // al componente FormUpdate, porque no existe un endpoint en en backend
  // que me permita obtener los datos de un solo producto por su ID.
  const [paginaActual, setPaginaActual] = useState<number>(1);

  return (
    <ContentPageMain>
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-gray-900 border-b border-gray-800 px-8 py-6">
				<div>
					<div className="flex items-center gap-3 mb-2">
						<div className="rounded-xl bg-blue-600/20 p-2 border border-blue-500/20">
              <Package className="w-6 h-6 text-blue-300" />
						</div>
						<h2 className="text-3xl font-bold text-white">Gestión de productos</h2>
					</div>
					<p className="text-sm text-gray-400 max-w-3xl">
						Administra los productos registrados en el sistema, revisa sus datos y realiza actualizaciones cuando sea necesario.
					</p>
				</div>

				<button
					onClick={() => setShowFormCreateProduct(true)}
					className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
				>
					<Plus className="w-5 h-5" />
					Nuevo producto
				</button>
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
    </ContentPageMain>
  );
}