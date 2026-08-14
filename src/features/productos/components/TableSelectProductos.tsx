import { Minus, Plus, Trash } from 'lucide-react';
import Table from '../../../components/ui/Table';
import ContentSectionProcess from '../../../components/layouts/ContentSectionProcess';
import ButtonsPagination from '../../../components/ui/ButtonsPagination';
import type { ProductoEnPaquete } from '../../../types/constantes.type';
import { useFetchProductos } from '../hooks/useFetchProductos';

interface TableSelectProductosProps {
  setListProductsSelected: React.Dispatch<React.SetStateAction<ProductoEnPaquete[]>>;
  listProductsSelected: ProductoEnPaquete[];
}

export default function TableSelectProductos({ 
  setListProductsSelected,
  listProductsSelected
}: TableSelectProductosProps ) {
  const tableHeader = [
    "N°",
    "Nombre",
    "Descripción",
    "Cantidad",
    ""
  ];
  const { 
    productos,
    isLoading: isLoadingProductos,
    isError: isErrorProductos,
    execute: listarProductos,
    setPagina,
    infoPaginacion,
  } = useFetchProductos();

  return (
    <ContentSectionProcess
      isLoading={isLoadingProductos}
      isError={isErrorProductos}
      textError="Error al cargar los productos"
      textButtonError="Reintentar"
      fetchData={() => listarProductos()}
    >
      <div className="flex-1 overflow-auto">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium text-white">
              Selecciona un producto para la guía de remisión
          </h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => listarProductos()}
          >
            Recargar
          </button>
        </div>

        <ButtonsPagination 
          total_paginas={infoPaginacion.total_paginas}
          pivote={infoPaginacion.pagina_actual}
          datos_por_pagina={infoPaginacion.datos_por_pagina}
          total_data={infoPaginacion.total_data}
          fetchData={setPagina}
        />

        <Table
          tableHeader={tableHeader}
          cantidadDatos={productos.length}
        >
          {productos.map((producto, index) => (
            <tr
              key={index}
              className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-start gap-3">
                  {index + 1}
                </div>
              </td>

              <td className="px-6 py-4">
                <span className="font-medium text-sm text-white">
                  {producto.nombre}
                </span>
              </td>

              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">
                  {producto.descripcion}
                </span>
              </td>

              <td className="px-4 py-4">
                {/* AGREGAR BOTONES PARA SUMAR O RESTAR CANTIDAD */}
                { listProductsSelected.some((p) => p.nombreproducto === producto.nombre) ? (
                  <div className="inline-flex items-center gap-2">
                    {/* Botón Izquierdo - Decrementar */}
                    <button
                      onClick={ () => {
                        setListProductsSelected((prev) => {
                          const updatedList = prev.map((p) => {
                            if (p.nombreproducto === producto.nombre) {
                              return {
                                ...p,
                                cantidad: (p.cantidad == 0 ? 0 : p.cantidad - 1)
                              };
                            }
                            return p;
                          });
                          return updatedList;
                        })
                      }}
                      className="transition-colors duration-200 rounded-md hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-gray-200 border border-gray-700"
                      aria-label="Disminuir valor"
                    >
                      <Minus size={20} />
                    </button>
                    {/* Input Central */}
                    <input
                      type="number"
                      value={listProductsSelected.find((p) => p.nombreproducto === producto.nombre)?.cantidad || 0}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value, 10);
                        if (!isNaN(newValue) && newValue >= 0) {
                          setListProductsSelected((prev) => {
                            const updatedList = prev.map((p) => {
                              if (p.nombreproducto === producto.nombre) {
                                return {
                                  ...p,
                                  cantidad: newValue
                                };
                              }
                              return p;
                            });
                            return updatedList;
                          });
                        }
                      }}
                      min={0}
                      className="w-16 text-center bg-transparent border-none font-semibold text-white-700 border border-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    {/* Botón Derecho - Incrementar */}
                    <button
                      onClick={ () => {
                        setListProductsSelected((prev) => {
                          const updatedList = prev.map((p) => {
                            if (p.nombreproducto === producto.nombre) {
                              return {
                                ...p,
                                cantidad: p.cantidad + 1
                              };
                            }
                            return p;
                          });
                          return updatedList;
                        })
                      }}
                      className="transition-colors duration-200 rounded-md hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-gray-200 border border-gray-700"
                      aria-label="Aumentar valor"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </td>

              {/* Botón para agregar/quitar producto */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  { listProductsSelected.some((p) => p.nombreproducto === producto.nombre) ? (
                    <button 
                      onClick={() => {
                        setListProductsSelected((prev) => 
                          prev.filter((listProducts) => listProducts.idproductdefect !== producto.idproductdefect)
                        );
                      }}
                    className="text-red-500 hover:text-red-400">
                      <Trash className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setListProductsSelected((prev) => [
                          ...prev,
                          {
                            idproductdefect: producto.idproductdefect,
                            nombreproducto: producto.nombre,
                            pesounitario: 1.0,
                            observacion: "sin observación",
                            cantidad: 1
                          }
                        ]);
                      }}
                      className="text-green-500 hover:text-green-400"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </ContentSectionProcess>
  );
}