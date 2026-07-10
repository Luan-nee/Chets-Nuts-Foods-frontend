import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import InputSearch from '../../../../components/ui/InputSearch';
import Table from '../../../../components/ui/Table';
import ButtonSubmitForm from '../../../../components/ui/ButtonSubmitForm';
import ButtonCancelForm from '../../../../components/ui/ButtonCancelForm';
import TableSelectPaquete from "../../../paquetes/components/TableSelectPaquete";
import { useRegistrarProductoEnPaquete } from '../../../paquetes/hooks/useRegistrarProductoEnPaquete';
import { useFetchProductos } from '../../../productos/hooks/useFetchProductos';
import type { ProductoEnPaquete } from '../../../../types/constantes.type';
import type { ResponseGetAllProductos } from '../../../../types/producto.type';
import { useGreContext } from '../../../../context/GreContext';

export default function FormProductos () {
  const { setIdPaquete: setIdPaqueteContext, setDataEmitirGre } = useGreContext();
  const [formData, setFormData] = useState<ProductoEnPaquete[]>([]);
  const [idSalidaTransporte, ] = useState<number>(1);
  const [idPaqueteLocal, setIdPaqueteLocal] = useState<number | null>(1);
  const { 
    isLoading: isLoadingProductos, 
    isError: isErrorProductos,
    execute: registrarProductoEnPaquete
  } = useRegistrarProductoEnPaquete();
  const { productos } = useFetchProductos();

  const syncProductosEnContexto = (nextProductos: ProductoEnPaquete[]) => {
    setFormData(nextProductos);
    setDataEmitirGre((current) => ({
      ...current,
      productosEnPaquete: nextProductos,
      idPaquete: idPaqueteLocal || 0,
    }));
  };

  const handleProductoSelected = (producto: ResponseGetAllProductos) => {
    setFormData((prev) => {
      const alreadySelected = prev.some(
        (item) => item.idproductdefect === producto.idproductdefect
      );

      if (alreadySelected) {
        const updatedList = prev.map((item) =>
          item.idproductdefect === producto.idproductdefect
            ? {
                ...item,
                nombreproducto: producto.nombre,
              }
            : item
        );

        syncProductosEnContexto(updatedList);

        return updatedList;
      }

      const updatedList = [
        ...prev,
        {
          idproductdefect: producto.idproductdefect,
          nombreproducto: producto.nombre,
          pesounitario: 1,
          observacion: "sin observación",
          cantidad: 1,
        },
      ];

      syncProductosEnContexto(updatedList);

      return updatedList;
    });
  };

  const handleRemoveProducto = (idproductdefect: number) => {
    setFormData((prev) => {
      const updatedList = prev.filter((item) => item.idproductdefect !== idproductdefect);

      syncProductosEnContexto(updatedList);

      return updatedList;
    });
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
              <td className="px-4 py-4">
                {/* AGREGAR BOTONES PARA SUMAR O RESTAR CANTIDAD */}
                <div className="inline-flex items-center gap-2">
                    {/* Botón Izquierdo - Decrementar */}
                    <button
                      onClick={ () => {
                        setFormData((prev) => {
                          const updatedList = prev.map((p) => {
                            if (p.nombreproducto === producto.nombreproducto) {
                              return {
                                ...p,
                                cantidad: (p.cantidad == 0 ? 0 : p.cantidad - 1)
                              };
                            }
                            return p;
                          });
                          syncProductosEnContexto(updatedList);
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
                      value={formData.find((p) => p.idproductdefect === producto.idproductdefect)?.cantidad || 0}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value, 10);
                        if (!isNaN(newValue) && newValue >= 0) {
                          setFormData((prev) => {
                            const updatedList = prev.map((p) => {
                              if (p.nombreproducto === producto.nombreproducto) {
                                return {
                                  ...p,
                                  cantidad: newValue
                                };
                              }
                              return p;
                            });
                            syncProductosEnContexto(updatedList);
                            return updatedList;
                          });
                        }
                      }}
                      min={0}
                      className="w-16 text-center bg-transparent border-none font-semibold text-white-700 border border-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    {/* Botón Derecho - Incrementar */}
                    <button
                      onClick={() => {
                        setFormData((prev) => {
                          const updatedList = prev.map((p) => {
                            if (producto.nombreproducto == p.nombreproducto) {
                              return {
                                ...p,
                                cantidad: p.cantidad + 1
                              };
                            }
                            return p;
                          });
                          syncProductosEnContexto(updatedList);
                          return updatedList;
                        })
                      }}
                      className="transition-colors duration-200 rounded-md hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-gray-200 border border-gray-700"
                      aria-label="Aumentar valor"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
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

      <TableSelectPaquete 
        SelectIdPaquete={setIdPaqueteLocal}
        idSalidaTransporte={idSalidaTransporte}
      />

      <div className='flex gap-2'>
        <ButtonSubmitForm 
          isError={isErrorProductos}
          isLoading={isLoadingProductos}
          textButton="Registrar productos en paquete"
          textError='Error al registrar productos en paquete'
          color='blue'
          handleSubmit={async () => {
              setIdPaqueteContext(idPaqueteLocal);
              syncProductosEnContexto(formData);
              await registrarProductoEnPaquete(formData, idPaqueteLocal);
            console.log('Productos registrados en paquete:', formData);
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