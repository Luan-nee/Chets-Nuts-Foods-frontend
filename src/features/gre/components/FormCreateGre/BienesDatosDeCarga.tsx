import { useState, useEffect } from "react";
import { Info, Scale, Plus, Trash2, Minus } from "lucide-react";
import Table from "../../../../components/ui/Table";
import type { EmitirGre } from "../../types/gre.type";
import { useFetchProductos } from "../../../productos/hooks/useFetchProductos";
import ContentSectionProcess from "../../../../components/layouts/ContentSectionProcess";
import ButtonsPagination from "../../../../components/ui/ButtonsPagination";

interface BienesDatosDeCargaProps {
  handleAddProductToList: (
    field: string, 
    value: {
      idProducto: number;
      cantidad: number;
    }
  ) => void;
  handleRemoveProductFromList: (
    field: string,
    index: number,
  ) => void;
  formData: EmitirGre;
  setFormData: React.Dispatch<React.SetStateAction<EmitirGre>> ;
}

export default function BienesDatosDeCarga({ handleAddProductToList, handleRemoveProductFromList, formData, setFormData }: BienesDatosDeCargaProps) {
  const [unidadMedida, setUnidadMedida] = useState<'KG' | 'TN' | null>(null);
  const [pesoBruto, setPesoBruto] = useState<number>(0);
  const headerTabler: string[] = [
    "Nrº",
    "Nombre del producto",
    "Peso Unitario",
    "Adicionar a la carga",
    "Peso Total",
    "Acciones"
  ]

  useEffect(() => {
    setUnidadMedida("TN");
    console.log("Peso bruto actualizado: ", pesoBruto);
  }, []);

  const {data: productos, isLoading: productosCargando, isError: errorProductos, setPagina: cambiarPagina, fetchData: fetchProductos, infoPaginacion} = useFetchProductos();

  return (
    <div className="flex flex-col gap-4 px-8 py-6">
      {/* Content */}
      <div className="space-y-6">
        {/* Bienes Transportados */}
        <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          {/* Table */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden p-4">
            <ContentSectionProcess 
              isLoading={productosCargando}
              isError={errorProductos}
              textError="Error al cargar los productos"
              textButtonError="Reintentar"
              fetchData={() => fetchProductos}
            >
              <ButtonsPagination 
                total_paginas={infoPaginacion.total_paginas} 
                pivote={infoPaginacion.pagina_actual} 
                fetchData={cambiarPagina} 
                datos_por_pagina={infoPaginacion.datos_por_pagina} 
                total_data={infoPaginacion.total_data} 
              />
              <Table tableHeader={headerTabler} >
                {productos?.map((producto, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
                  >
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-white">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-300">
                        {producto.nombre}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm text-gray-300">{producto.peso} {producto.unidadPeso}</span>
                    </td>
                    <td className="px-4 py-4">
                      {/* AGREGAR BOTONES PARA SUMAR O RESTAR CANTIDAD */}
                      <div className="inline-flex items-center gap-2">
                        {
                          formData.bienes_transportados.find((item) => item.idProducto === producto.id)! && (
                            <>
                              {/* Botón Izquierdo - Decrementar */}
                              <button
                                onClick={
                                  () => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      bienes_transportados: prev.bienes_transportados.map((bien) =>
                                        bien.idProducto === producto.id
                                          ? { ...bien, cantidad: (bien.cantidad <= 0) ? 0 : bien.cantidad - 1 } 
                                          : bien
                                      ),
                                    }));
                                    setPesoBruto((prev) => (
                                      (prev <= 0) ? 0 : prev - ( 
                                        producto.unidadPeso === unidadMedida ? producto.peso :
                                        (producto.unidadPeso === "TN" ? producto.peso * 0.001 : producto.peso * 1000)
                                      )
                                    ))
                                  }
                                }
                                className="transition-colors duration-200 rounded-md hover:bg-red-300 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-gray-200 border border-gray-700"
                                aria-label="Disminuir valor"
                              >
                                <Minus size={20} />
                              </button>
                              {/* Input Central */}
                              <input
                                type="number"
                                onChange={(e) => {
                                  const newValue = parseInt(e.target.value) || 0;
                                  setFormData((prev) => ({
                                    ...prev,
                                    bienes_transportados: prev.bienes_transportados.map((bien) =>
                                      bien.idProducto === producto.id
                                        ? { ...bien, cantidad: newValue } 
                                        : bien
                                    ),
                                  }));

                                  // AGREGAR LOGICA PARA CALCULAR EL PESO BRUTO DE FORMA AUTOMÁTICA.
                                  setPesoBruto(
                                    formData.bienes_transportados.reduce((acc, item) => {
                                      const productoInfo = productos.find(p => p.id === item.idProducto);
                                      if (item.idProducto === producto.id) {
                                        return acc + (productoInfo ? productoInfo.peso * newValue : 0);
                                      } else {
                                        return acc + (productoInfo ? productoInfo.peso * item.cantidad : 0);
                                      }
                                    }, 0)
                                  );
                                }}
                                value={formData.bienes_transportados.find((item) => item.idProducto === producto.id)?.cantidad || 0}
                                min={0}
                                className="w-16 text-center bg-transparent border-none font-semibold text-white-700 border border-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              {/* Botón Derecho - Incrementar */}
                              <button
                                onClick={ () => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      bienes_transportados: prev.bienes_transportados.map((bien) =>
                                        bien.idProducto === producto.id
                                          ? { ...bien, cantidad: bien.cantidad + 1 } 
                                          : bien
                                      ),
                                    }));
                                    setPesoBruto((prev) => (
                                      prev + ( 
                                        producto.unidadPeso === unidadMedida ? producto.peso :
                                        (producto.unidadPeso === "TN" ? producto.peso * 0.001 : producto.peso * 1000)
                                      )
                                    ))
                                  }
                                }
                                className="transition-colors duration-200 rounded-md hover:bg-green-300 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-gray-200 border border-gray-700"
                                aria-label="Aumentar valor"
                              >
                                <Plus size={20} />
                              </button>
                            </>
                          )
                        }
                      </div>
                    </td>
                    {/* MOSTRAR EL VALOR TOTAL DEL PESO (peso unitario * cantidad) */}
                    <td className="px-4 py-4 text-center">
                      { formData.bienes_transportados.find((item) => item.idProducto === producto.id)! ? (
                        <span className="text-sm font-medium text-white">
                          {formData.bienes_transportados.find((item) => item.idProducto === producto.id)?.cantidad! * producto.peso} {producto.unidadPeso}
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-white">
                          0
                        </span>
                      )
                    }
                    </td>
                    <td className="px-4 py-4">
                      <div className={"flex items-center gap-2 justify-center"}>
                        {
                          formData.bienes_transportados.find((item) => item.idProducto === producto.id) ? (
                            <button 
                            onClick={() => {
                              setPesoBruto((prev) => (
                                prev - (formData.bienes_transportados.find((item) => item.idProducto === producto.id)?.cantidad! * producto.peso)
                              ))
                              handleRemoveProductFromList(`bienes_transportados`, producto.id);
                            }}
                            className="text-red-500 hover:text-red-400 flex flex-row gap-2">
                              <span>Eliminar</span>
                              <Trash2 className="w-5 h-5" />
                            </button>
                          ) : (
                            <button 
                              onClick={() => {
                                handleAddProductToList(`bienes_transportados`, {
                                  idProducto: producto.id,
                                  cantidad: 1
                                });
                                setPesoBruto((prev) => (
                                  prev + producto.peso
                                ))
                              }
                            }
                            className="text-green-500 hover:text-green-400 flex flex-row gap-2">
                              <span>Agregar</span>
                              <Plus className="w-5 h-5" />
                            </button>
                          )
                        }
                      </div>  
                    </td>
                  </tr>
                ))}
              </Table>
            </ContentSectionProcess>
          </div>

          <p className="text-xs text-gray-500 italic">
            Lista dinámica de bienes. Puedes añadir múltiples ítems a la guía.
          </p>
        </section>

        {/* Datos de la Carga */}
        <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Scale className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Datos de la Carga</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Unidad de Medida */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Unidad de Medida
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setUnidadMedida("KG");
                    setPesoBruto((prev) => (
                      prev * ( unidadMedida !== "KG" ? 1000 : 1 )
                    ));
                  }}

                  className={`p-4 rounded-lg border transition-colors ${
                    unidadMedida === "KG"
                      ? "bg-blue-500/10 border-blue-500 text-white"
                      : "bg-gray-950 border-gray-700 text-gray-400 hover:border-blue-500/50"
                  }`}
                >
                  <div className="text-center">
                    <p className="font-semibold text-sm mb-1">Kilogramo</p>
                    <p className="text-xs text-gray-500">KG</p>
                  </div>
                </button>   

                <button
                  onClick={() => {
                    setUnidadMedida("TN");
                    setPesoBruto((prev) => (
                      prev * ( unidadMedida !== "TN" ? 0.001 : 1 )
                    ));
                  }}
                  className={`p-4 rounded-lg border transition-colors ${
                    unidadMedida === "TN"
                      ? "bg-blue-500/10 border-blue-500 text-white"
                      : "bg-gray-950 border-gray-700 text-gray-400 hover:border-blue-500/50"
                  }`}
                >
                  <div className="text-center">
                    <p className="font-semibold text-sm mb-1">Tonelada</p>
                    <p className="text-xs text-gray-500">TN</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Peso Bruto Total */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Peso Bruto Total
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={pesoBruto}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white text-2xl font-bold focus:outline-none focus:border-blue-500 transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  {unidadMedida}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                El peso bruto total debe considerar la suma del peso de todos los bienes transportados.
              </p>
            </div>
          </div>
        </section>

        {/* Resumen de Carga */}
        <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-1">
                  Resumen de Carga
                </p>
                <p className="text-xs text-gray-400">
                  Total ítems:{" "}
                  <span className="text-white font-medium">
                    {/* MOSTRAR EL PESO TOTAL EN TIEMPO REAL */}
                    {formData.bienes_transportados.length}
                  </span>
                  {" "}
                  | Peso Bruto:{" "}
                  <span className="text-blue-500 font-bold">
                    {pesoBruto} {unidadMedida}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
