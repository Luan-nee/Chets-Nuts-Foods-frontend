import { useState, useEffect, useRef } from 'react';
import { Minus, Plus, ArrowLeft } from 'lucide-react';
import Table from '../../../../components/ui/Table';
import ButtonSubmitForm from '../../../../components/ui/ButtonSubmitForm';
import ButtonCancelForm from '../../../../components/ui/ButtonCancelForm';
import Loading from '../../../../components/ui/Loading';
import InputSelect from '../../../../components/ui/InputSelect';
import { useRegistrarProductoEnPaquete } from '../../../paquetes/hooks/useRegistrarProductoEnPaquete';
import { useFetchProductos } from '../../../productos/hooks/useFetchProductos';
import { useFetchProductosDelPaquete } from '../../../paquetes/hooks/useFetchProductosDelPaquete';
import type { ProductoEnPaquete } from '../../../../types/constantes.type';
import type { ResponseGetAllProductos } from '../../../../types/producto.type';
import { useGreContext } from '../../../../context/GreContext';

export default function FormProductos() {
  const {
    dataEmitirGre,
    setDataEmitirGre
  } = useGreContext();

  const [formData, setFormData] = useState<ProductoEnPaquete[]>([]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [productSearchTerm, setProductSearchTerm] = useState<string>("");
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const {
    isLoading: isLoadingProductos,
    isError: isErrorProductos,
    execute: registrarProductoEnPaquete
  } = useRegistrarProductoEnPaquete();

  const { productos } = useFetchProductos();

  const {
    productos: productosExistentes,
    resumen: resumenExistente,
    isLoading: isLoadingExistentes,
    isError: isErrorExistentes,
    execute: refetchExistentes,
  } = useFetchProductosDelPaquete(dataEmitirGre.idPaquete || null);

  useEffect(() => {
    if (!isLoadingExistentes && productosExistentes.length === 0) {
      setShowAddForm(true);
    }
  }, [isLoadingExistentes, productosExistentes]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const combined = [
      ...productosExistentes.map(pe => ({
        idproductdefect: pe.idproductdefect || Date.now(),
        nombreproducto: pe.nombreproducto,
        pesounitario: parseFloat(pe.pesounitario) || 0,
        observacion: pe.observacion || "",
        cantidad: pe.cantidad,
      })),
      ...formData
    ];
    setDataEmitirGre(current => {
      if (JSON.stringify(current.productosEnPaquete) === JSON.stringify(combined)) {
        return current;
      }
      return {
        ...current,
        productosEnPaquete: combined
      };
    });
  }, [productosExistentes, formData, setDataEmitirGre]);

  const syncProductosEnContexto = (nextProductos: ProductoEnPaquete[]) => {
    setFormData(nextProductos);
  };

  const handleAutocompleteSelect = (p: ResponseGetAllProductos) => {
    setProductSearchTerm(p.nombre);
    setShowAutocomplete(false);
  };

  const handleAddProduct = () => {
    if (productSearchTerm.trim() === "") return;

    setFormData((prev) => {
      const alreadySelected = prev.some(
        (item) => item.nombreproducto.toLowerCase() === productSearchTerm.trim().toLowerCase()
      );
      if (alreadySelected) {
        return prev;
      }

      const matchedDbProduct = productos.find(
        (p) => p.nombre.toLowerCase() === productSearchTerm.trim().toLowerCase()
      );

      const newProduct = {
        idproductdefect: matchedDbProduct ? matchedDbProduct.idproductdefect : Date.now(),
        nombreproducto: productSearchTerm.trim(),
        pesounitario: 1000,
        observacion: "sin observación",
        shadow: true,
        cantidad: 1,
      };

      const updatedList = [...prev, newProduct];
      syncProductosEnContexto(updatedList);
      return updatedList;
    });
    setProductSearchTerm("");
    setShowAutocomplete(false);
  };

  const handleRemoveProducto = (idproductdefect: number) => {
    setFormData((prev) => {
      const updatedList = prev.filter((item) => item.idproductdefect !== idproductdefect);
      syncProductosEnContexto(updatedList);
      return updatedList;
    });
  };

  const formatFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    if (isNaN(fecha.getTime())) return fechaStr;
    return new Intl.DateTimeFormat("es-PE", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(fecha);
  };

  const matchingProducts = productSearchTerm.trim() === "" ? [] : productos.filter(p =>
    p.nombre.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  if (isLoadingExistentes) {
    return (
      <div className="flex items-center justify-center p-12 bg-gray-900 mx-6 rounded-xl border border-gray-800">
        <Loading w={8} h={8} color="blue" />
      </div>
    );
  }

  if (isErrorExistentes) {
    return (
      <div className="p-8 bg-gray-900 mx-6 rounded-xl border border-gray-800 text-center">
        <p className="text-red-400 mb-4">Error al cargar los productos del paquete</p>
        <button
          onClick={() => dataEmitirGre.idPaquete && refetchExistentes(dataEmitirGre.idPaquete)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!showAddForm) {
    const tableHeader = ["N°", "Producto", "Cantidad", "Peso Unitario", "Peso Total", "Observación", "Fecha Creación"];
    return (
      <div className="px-6 py-6 bg-gray-900 mx-6 rounded-xl border border-gray-800 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">Productos en el Paquete #{dataEmitirGre.idPaquete}</h3>
            <p className="text-sm text-slate-400">Listado de productos cargados actualmente para este paquete.</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Agregar más productos
          </button>
        </div>

        <Table tableHeader={tableHeader} cantidadDatos={productosExistentes.length}>
          {productosExistentes.map((prod, index) => (
            <tr
              key={index}
              className="border-b border-gray-800 hover:bg-gray-800/40 transition-colors"
            >
              <td className="px-6 py-4 text-sm text-slate-400">{index + 1}</td>
              <td className="px-6 py-4 text-sm font-medium text-white">{prod.nombreproducto}</td>
              <td className="px-6 py-4 text-sm text-slate-300">{prod.cantidad}</td>
              <td className="px-6 py-4 text-sm text-slate-300">{prod.pesounitario} kg</td>
              <td className="px-6 py-4 text-sm text-slate-300">{prod.pesototal} kg</td>
              <td className="px-6 py-4 text-sm text-slate-300">{prod.observacion || "Sin observación"}</td>
              <td className="px-6 py-4 text-sm text-slate-400">{formatFecha(prod.fechacreacion)}</td>
            </tr>
          ))}
        </Table>

        {resumenExistente && (
          <div className="flex justify-end pr-4 text-slate-300 font-medium text-sm">
            <span className="bg-gray-800/60 px-4 py-2 rounded-lg border border-gray-700">
              Peso Total del Paquete: <strong className="text-white text-base ml-1">{resumenExistente.totalPesoPaquete} kg</strong>
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-6 py-4 bg-gray-900 mx-6 rounded-xl border border-gray-800 flex flex-col gap-4">
      {productosExistentes.length > 0 && (
        <button
          onClick={() => setShowAddForm(false)}
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-2 transition-colors font-medium self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la lista de productos
        </button>
      )}

      <div className="mb-2">
        <h3 className="text-lg font-semibold text-slate-100">Agregar Productos al Paquete</h3>
        <p className="text-sm text-slate-400">Busca productos y agrégalos definiendo su cantidad, peso unitario y observaciones.</p>
      </div>

      <div className="mb-4 relative" ref={wrapRef}>
        <span className="text-sm font-medium text-slate-200 block mb-2">Producto</span>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Escribe el nombre del producto..."
              value={productSearchTerm}
              onChange={(e) => {
                setProductSearchTerm(e.target.value);
                setShowAutocomplete(true);
              }}
              onFocus={() => setShowAutocomplete(true)}
              className="w-full p-3 bg-dark-deep border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 text-sm animate-fade-in"
            />
            {showAutocomplete && matchingProducts.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-gray-900 border border-gray-500 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                {matchingProducts.map((p) => (
                  <button
                    key={p.idproductdefect}
                    type="button"
                    onClick={() => handleAutocompleteSelect(p)}
                    className="w-full px-4 py-3 text-left text-slate-200 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-0 flex flex-col"
                  >
                    <span className="font-medium text-sm">{p.nombre}</span>
                    <span className="text-xs text-slate-500">{p.descripcion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleAddProduct}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium text-sm flex items-center justify-center whitespace-nowrap"
          >
            Agregar
          </button>
        </div>
      </div>

      <div className="mb-4 rounded-lg border border-gray-800">
        <Table
          tableHeader={[
            "N°",
            "Producto",
            "Cantidad",
            "Peso total",
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
              <td className="px-6 py-4 text-sm text-gray-300">
                {producto.nombreproducto}
              </td>
              <td className="pxs-4 py-4">
                <div className="inline-flex items-center gap-2">
                  {/* Botón Izquierdo - Decrementar */}
                  <button
                    onClick={() => {
                      setFormData((prev) => {
                        const updatedList = prev.map((p) => {
                          if (p.idproductdefect === producto.idproductdefect) {
                            return {
                              ...p,
                              shadow: true,
                              cantidad: (p.cantidad === 0 ? 0 : p.cantidad - 1)
                            };
                          }
                          return p;
                        });
                        syncProductosEnContexto(updatedList);
                        return updatedList;
                      })
                    }}
                    className="transition-colors duration-200 rounded-md hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-gray-200 border border-gray-700 p-1"
                    aria-label="Disminuir valor"
                  >
                    <Minus size={16} />
                  </button>
                  {/* Input Central */}
                  <input
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) => {
                      const newValue = parseFloat(e.target.value);
                      if (!isNaN(newValue) && newValue >= 0) {
                        setFormData((prev) => {
                          const updatedList = prev.map((p) => {
                            if (p.idproductdefect === producto.idproductdefect) {
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
                    className="w-16 text-center bg-transparent border border-gray-700 rounded py-0.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-white font-semibold"
                  />
                  {/* Botón Derecho - Incrementar */}
                  <button
                    onClick={() => {
                      setFormData((prev) => {
                        const updatedList = prev.map((p) => {
                          if (p.idproductdefect === producto.idproductdefect) {
                            return {
                              ...p,
                              shadow: true,
                              cantidad: p.cantidad + 1
                            };
                          }
                          return p;
                        });
                        syncProductosEnContexto(updatedList);
                        return updatedList;
                      })
                    }}
                    className="transition-colors duration-200 rounded-md hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-gray-200 border border-gray-700 p-1"
                    aria-label="Aumentar valor"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </td>
              <td className="px-4 py-4">
                {producto.pesounitario * producto.cantidad} kg = {producto.pesounitario * producto.cantidad / 1000} TN
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
        <ButtonCancelForm
          handleCancel={() => {
            setShowAddForm(false);
          }}
          isLoading={isLoadingProductos}
          textButton="Cancelar"
          color='red'
        />
        <ButtonSubmitForm
          isError={isErrorProductos}
          isLoading={isLoadingProductos}
          textButton="Registrar productos en paquete"
          textError='Error al registrar productos en paquete'
          color='blue'
          handleSubmit={async () => {
            await registrarProductoEnPaquete(formData, dataEmitirGre.idPaquete || 0);
            if (dataEmitirGre.idPaquete) {
              refetchExistentes(dataEmitirGre.idPaquete).then(() => {
                setShowAddForm(false);
                setFormData([]);
              });
            }
          }}
        />
      </div>
    </div>
  );
}