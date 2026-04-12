import { useState, useEffect } from "react";
import { Info, Scale, Plus, Trash2, Minus } from "lucide-react";
import Table from "../../../../components/ui/Table";
import type { EmitirGre } from "../../types/gre.type";
import { useFetchProductos } from "../../../productos/hooks/useFetchProductos";
import ContentSectionProcess from "../../../../components/layouts/ContentSectionProcess";
import ButtonsPagination from "../../../../components/ui/ButtonsPagination";
import InputNumber from "../../../../components/ui/InputNumber";

interface BienesDatosDeCargaProps {
  handleAddProductToList: (
    field: string,
    value: {
      idProducto: number;
      cantidad: number;
    },
  ) => void;
  handleRemoveProductFromList: (field: string, index: number) => void;
  setFormData: React.Dispatch<React.SetStateAction<EmitirGre>>;
  formData: EmitirGre;
}

export default function BienesDatosDeCarga({
  handleAddProductToList,
  handleRemoveProductFromList,
  formData,
  setFormData,
}: BienesDatosDeCargaProps) {
  const [unidadMedida, setUnidadMedida] = useState<"KG" | "TN" | null>(null);
  const [pesoBruto, setPesoBruto] = useState<number>(0);
  const headerTabler: string[] = [
    "Nrº",
    "Nombre del producto",
    "Adicionar a la carga",
    "Acciones",
  ];

  useEffect(() => {
    setUnidadMedida("TN");
    console.log("Peso bruto actualizado: ", pesoBruto);
  }, []);

  const {
    data: productos,
    isLoading: productosCargando,
    isError: errorProductos,
    setPagina: cambiarPagina,
    fetchData: fetchProductos,
    infoPaginacion,
  } = useFetchProductos();

  return (
    <div className="flex flex-col gap-4 px-8 py-6">
      {/* Content */}
      <div className="space-y-6">
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
                  </span>{" "}
                  | Peso Bruto:{" "}
                  <span className="text-blue-500 font-bold">
                    {pesoBruto} {unidadMedida}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

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
              <Table tableHeader={headerTabler}>
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
                    <td className="px-4 py-4">
                      {/* AGREGAR BOTONES PARA SUMAR O RESTAR CANTIDAD */}
                      <div className="inline-flex items-center gap-2">
                        {formData.bienes_transportados.find(
                          (item) => item.idProducto === producto.id,
                        )! && (
                          <>
                            {/* Botón Izquierdo - Decrementar */}
                            <button
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  bienes_transportados:
                                    prev.bienes_transportados.map((bien) =>
                                      bien.idProducto === producto.id
                                        ? {
                                            ...bien,
                                            cantidad:
                                              bien.cantidad <= 0
                                                ? 0
                                                : bien.cantidad - 1,
                                          }
                                        : bien,
                                    ),
                                }));
                                setPesoBruto((prev) =>
                                  prev <= 0 ? 0 : prev - 1,
                                );
                              }}
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
                                  bienes_transportados:
                                    prev.bienes_transportados.map((bien) =>
                                      bien.idProducto === producto.id
                                        ? { ...bien, cantidad: newValue }
                                        : bien,
                                    ),
                                }));
                                setPesoBruto(
                                  formData.bienes_transportados.reduce(
                                    (acc, item) => {
                                      return acc + item.cantidad;
                                    },
                                    0,
                                  ),
                                );
                              }}
                              value={
                                formData.bienes_transportados.find(
                                  (item) => item.idProducto === producto.id,
                                )?.cantidad || 0
                              }
                              min={0}
                              className="w-16 text-center bg-transparent border-none font-semibold text-white-700 border border-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            {/* Botón Derecho - Incrementar */}
                            <button
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  bienes_transportados:
                                    prev.bienes_transportados.map((bien) =>
                                      bien.idProducto === producto.id
                                        ? {
                                            ...bien,
                                            cantidad: bien.cantidad + 1,
                                          }
                                        : bien,
                                    ),
                                }));
                                setPesoBruto((prev) => prev + 1);
                              }}
                              className="transition-colors duration-200 rounded-md hover:bg-green-300 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-gray-200 border border-gray-700"
                              aria-label="Aumentar valor"
                            >
                              <Plus size={20} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className={"flex items-center gap-2 justify-center"}>
                        {formData.bienes_transportados.find(
                          (item) => item.idProducto === producto.id,
                        ) ? (
                          <button
                            onClick={() => {
                              setPesoBruto(
                                (prev) =>
                                  prev -
                                  formData.bienes_transportados.find(
                                    (item) => item.idProducto === producto.id,
                                  )?.cantidad!,
                              );
                              handleRemoveProductFromList(
                                `bienes_transportados`,
                                producto.id,
                              );
                            }}
                            className="text-red-500 hover:text-red-400 flex flex-row gap-2"
                          >
                            <span>Eliminar</span>
                            <Trash2 className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleAddProductToList(`bienes_transportados`, {
                                idProducto: producto.id,
                                cantidad: 1,
                              });
                              setPesoBruto((prev) => prev + 1);
                            }}
                            className="text-green-500 hover:text-green-400 flex flex-row gap-2"
                          >
                            <span>Agregar</span>
                            <Plus className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </Table>
            </ContentSectionProcess>
          </div>
        </section>

        {/* Datos de la Carga */}
        <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Scale className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Datos de la Carga</h2>
          </div>

          <InputNumber 
            placeholder="0.00"
            disabled={true}
            label="Peso Bruto Total (Toneladas)" 
            simbol={"TN"}
            defaultValue={pesoBruto}
            onChange={(value)=>{
              setPesoBruto(value);
            }}
          />
        </section>

      </div>
    </div>
  );
}
