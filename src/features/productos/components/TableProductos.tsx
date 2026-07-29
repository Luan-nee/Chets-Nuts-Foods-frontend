import { Edit } from "lucide-react";
import Table from "../../../components/ui/Table";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";
import { useFetchProductos } from "../hooks/useFetchProductos";
import { useAutorizacion } from "../../../config/useAutorizacion";
import { useSocket } from "../../../context/SocketContext";
import { useEffect } from "react";
import type { ResponseCreateProducto } from "../../../types/producto.type";
import { NotificationProductDefect } from "../../../components/messages/NotificationProductDefect";

interface PropTableProductos {
  setSelectProductoId: (p: number | null) => void;
  showFormEdit: (p: boolean) => void;
  showFormCreateVariante: (p: boolean) => void;
  setPaginActual: (p: number) => void;
}

export default function TableProductos({
  setSelectProductoId,
  showFormEdit,
  showFormCreateVariante,
  setPaginActual
}: PropTableProductos) {
  const { tienePermiso } = useAutorizacion();
  const socket = useSocket();

  const {
    productos,
    isLoading,
    isError,
    setPagina,
    execute: recargarProductos,
    infoPaginacion
  } = useFetchProductos();


  useEffect(() => {
    if(socket === null){
    return
    }

    const handler = (data: ResponseCreateProducto) => {
      NotificationProductDefect(data);
      productos.push(data)
    };

    socket.on("server::newProductDefect", handler);

    return () => {
      socket.off("server::newProductDefect", handler);
    };
  }, [socket]);


  const tableHeader: string[] = [
    "Nº",
    "Nombre",
    "Descripción del producto",
    "Acciones"
  ];

  return (
    <ContentSectionProcess
      isLoading={isLoading}
      isError={isError}
      textError="Error al cargar los productos"
      textButtonError="Reintentar"
      fetchData={() => recargarProductos(infoPaginacion.pagina_actual)}
    >
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

        <Table tableHeader={tableHeader} cantidadDatos={productos.length}>
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
                { tienePermiso('PUEDE_EDITAR_PRODUCTO') && (
                  <button
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Editar"
                    onClick={() => {
                      setSelectProductoId(producto.idproductdefect);
                      setPaginActual(infoPaginacion.pagina_actual);
                      showFormEdit(true);
                    }}>
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </ContentSectionProcess>
  );
}