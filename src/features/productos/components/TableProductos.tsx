import { Edit } from "lucide-react";

import { useFetchProductos } from "../hooks/useFetchProductos";
// importación de tipos
import Loading from "../../../components/ui/Loading";
import Table from "../../../components/ui/Table";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";

interface PropTableProductos {
  setSelectProductoId: (p: number | null) => void;
  showFormEdit: (p: boolean) => void;
}

export default function TableProductos({
  setSelectProductoId,
  showFormEdit,
}: PropTableProductos) {
  const tableHeader: string[] = [
    "Nº",
    "Nombre",
    "Peso"
  ];
  const {
    data: productos,
    isLoading,
    isError,
    fetchData: recargarProductos,
    setPagina,
    infoPaginacion
  } = useFetchProductos();

  if (isLoading) {
    // has uso del componente de carga Loading.tsx
    return (
      <div className="flex justify-center items-center py-10">
        <Loading w={6} h={6} color="blue" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500">Error al cargar los productos.</p>
        {/* agrega un botón para reintentar la carga */}
        <button
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={() => recargarProductos(1)}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (productos === null || productos.length === 0) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <div className="flex-1 overflow-auto px-8 py-6">
      <div className="p-4 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => recargarProductos(infoPaginacion.pagina_actual)}
        >
          Recargar
        </button>
      </div>

      <ButtonsPagination 
        total_paginas={infoPaginacion.total_paginas} 
        pivote={infoPaginacion.pagina_actual} 
        fetchData={setPagina} 
        datos_por_pagina={infoPaginacion.datos_por_pagina} 
        total_data={infoPaginacion.total_data} 
      />

      <Table tableHeader={tableHeader}>
        {productos?.map((producto, index) => (
          <tr key={index} className="hover:bg-gray-800/50 transition-colors">
            <td className="px-6 py-4">
              <span className="text-blue-400">
                {index}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className="text-white font-medium">
                {producto.nombre}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className="text-white">
                {producto.peso} {producto.unidadMedida}
              </span>
            </td>
            <td className="px-6 py-4">
              <button
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                title="Editar"
                onClick={() => {
                  setSelectProductoId(producto.id);
                  showFormEdit(true);
                }}
              >
                <Edit className="w-4 h-4 text-gray-400" />
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}