import { useState } from "react";
import { Plus, Package, Edit } from "lucide-react";
import ContentPageMain from "../components/layouts/ContentPageMain";
import Table from "../components/ui/table/Table";
import FormUpdate from "../features/productos/components/FormUpdate";
import FormCreate from "../features/productos/components/FormCreate";
import TableProductos from "../features/productos/components/TableProductos";
import { useFetchProductos } from "../features/productos/hooks/useFetchProductos";

export default function Productos() {
  const [showFormEditProduct, setShowFormEditProduct] = useState<boolean>(false);
  const [showFormCreateProduct, setShowFormCreateProduct] = useState<boolean>(false);
  const [selectProductoId, setSelectProductoId] = useState<number | null>(null);
  
  const {
    productos,
    isLoading: isLoadingProductos,
    isError: isErrorProductos,
    execute: recargarProductos,
    setPagina,
    infoPaginacion
  } = useFetchProductos();

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
      
      <div className="p-4">
        <Table
          cantidadDatos={productos.length}
          dataIsError={isErrorProductos}
          dataIsLoading={isLoadingProductos}
          reload={recargarProductos}
          changePage={setPagina}
          tableHeader={[
            "Nº",
            "Nombre",
            "Descripción del producto",
            "Acciones"
          ]}
          dataPagination={infoPaginacion}
        >
          {productos?.map((producto, index) => (
            <tr key={index} className="hover:bg-gray-800/50 transition-colors">
              <td className="px-6 py-4">
                <span className="text-blue-400">
                  {index + 1}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-white">
                  {producto.nombre}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-white">
                  {producto.descripcion}
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  title="Editar"
                  onClick={() => {
                    setSelectProductoId(producto.idproductdefect);
                    setPaginaActual(infoPaginacion.pagina_actual);
                    setShowFormEditProduct(true);
                  }}>
                  <Edit className="w-4 h-4 text-gray-400" />
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </div>

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