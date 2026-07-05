import { useState } from 'react';
import { CalendarDays, Hash, Plus } from 'lucide-react';
import Table from '../../../components/ui/Table';
import ContentSectionProcess from '../../../components/layouts/ContentSectionProcess';
import ButtonsPagination from '../../../components/ui/ButtonsPagination';
import type { ProductoEnPaquete } from '../../../types/constantes.type';
import { useFetchProductos } from '../hooks/useFetchProductos';

interface TableSelectProductosProps {
  selectIdProducto: (idProducto: number | null) => void;
  selectInfoProducto: (infoProducto: ProductoEnPaquete) => void;
  onChange: (idProducto: number) => void;
}

export default function TableSelectProductos({ 
  selectIdProducto, 
  selectInfoProducto,
  onChange }: TableSelectProductosProps
) {
  const [idSelected, setIdSelected] = useState<number | null>(null);
  const tableHeader = [
    "N°",
    "Nombre",
    "Descripción",
    "Fecha de creación",
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
      fetchData={() => listarProductos(1)}
    >
      <div className="flex-1 overflow-auto">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium text-white">
              Selecciona un producto para la guía de remisión
          </h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => listarProductos(infoPaginacion.pagina_actual)}
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
                  <div className="mt-0.5 rounded-lg bg-[#1f6feb]/15 p-2">
                    <Hash className="w-5 h-5 text-[#1f6feb]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-medium text-sm text-white truncate">
                      {index + 1}
                    </span>
                    <span className="block text-xs text-gray-400 truncate">
                      Producto registrado
                    </span>
                  </div>
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

              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  <span>{new Date(producto.fechacreacion).toLocaleDateString('es-PE')}</span>
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  { idSelected === producto.idproductdefect ? (
                    <button onClick={() => {
                      setIdSelected(null);
                      selectIdProducto(null);
                    }} className="hover:text-red-400">
                      <span className="text-red-500 flex flex-row gap-2">
                        <span>Eliminar</span>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        selectIdProducto(producto.idproductdefect);
                        setIdSelected(producto.idproductdefect);
                        onChange(producto.idproductdefect);
                        selectInfoProducto({
                          nombreproducto: producto.nombre,
                          pesounitario: 1.0,
                          observacion: "",
                          cantidad: 777
                        })
                      }}
                      className="text-green-500 hover:text-green-400 flex flex-row gap-2"
                    >
                      <span>Seleccionar</span>
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