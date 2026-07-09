import { useState } from 'react';
import InputSearch from '../../../../components/ui/InputSearch';
import Table from '../../../../components/ui/Table';
import ButtonSubmitForm from '../../../../components/ui/ButtonSubmitForm';
import ButtonCancelForm from '../../../../components/ui/ButtonCancelForm';
import { useRegistrarProductoEnPaquete } from '../../../paquetes/hooks/useRegistrarProductoEnPaquete';
import { useFetchProductos } from '../../../productos/hooks/useFetchProductos';
import type { ProductoEnPaquete } from '../../../../types/constantes.type';
import type { ResponseGetAllProductos } from '../../../../types/producto.type';

export default function FormProductos () {
  const [formData, setFormData] = useState<ProductoEnPaquete[]>([]);
  const { 
    isLoading: isLoadingProductos, 
    isError: isErrorProductos
  } = useRegistrarProductoEnPaquete();
  const { productos } = useFetchProductos();

  const handleProductoSelected = (producto: ResponseGetAllProductos) => {
    setFormData((prev) => {
      const alreadySelected = prev.some(
        (item) => item.idproductdefect === producto.idproductdefect
      );

      if (alreadySelected) {
        return prev.map((item) =>
          item.idproductdefect === producto.idproductdefect
            ? {
                ...item,
                nombreproducto: producto.nombre,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          idproductdefect: producto.idproductdefect,
          nombreproducto: producto.nombre,
          pesounitario: 1,
          observacion: "sin observación",
          cantidad: 1,
        },
      ];
    });
  };

  const handleRemoveProducto = (idproductdefect: number) => {
    setFormData((prev) => prev.filter((item) => item.idproductdefect !== idproductdefect));
  };

  return (
    <div className="px-6 py-4 bg-gray-900 mx-6">
      <div className="mb-4">
        <InputSearch<ResponseGetAllProductos>
          atributes={["nombre", "descripcion"]}
          objets={productos}
          setObjetSelected={handleProductoSelected}
          placeholder="Buscar producto"
        />
      </div>

      <div className="mb-4 overflow-hidden rounded-lg border border-gray-800">
        <Table
          tableHeader={[
            "N°",
            "Producto",
            "Descripción",
            "Cantidad",
            "Acción",
          ]}
          cantidadDatos={formData.length}
        >
          {formData.map((producto, index) => (
            <tr
              key={producto.idproductdefect}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-6 py-4 text-sm text-gray-300">
                {index + 1}
              </td>
              <td className="px-6 py-4 text-sm text-white font-medium">
                {producto.nombreproducto}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {producto.observacion}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {producto.cantidad}
              </td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  onClick={() => handleRemoveProducto(producto.idproductdefect)}
                  className="rounded-md border border-red-500/40 px-3 py-1.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                  aria-label={`Eliminar producto ${producto.nombreproducto}`}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      <div className='flex gap-2'>
        <ButtonSubmitForm 
          isError={isErrorProductos}
          isLoading={isLoadingProductos}
          textButton="Registrar productos en paquete"
          textError='Error al registrar productos en paquete'
          color='blue'
          handleSubmit={async () => {
            // await registrarProductoEnPaquete(formData, 1); // Aquí se pasa el ID del paquete (1) como ejemplo
            // console.log('Productos registrados en paquete:', formData);
          }}
        />
        <ButtonCancelForm 
        handleCancel={() => {}}
        isLoading={isLoadingProductos}
        textButton="Cancelar"
        color='red'
        />

      </div>
    </div>
  );
}