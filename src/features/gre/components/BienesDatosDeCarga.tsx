import { Edit2, Info, Package, Plus, Scale, Trash2 } from "lucide-react";
import AgregarBien from "./AgregarBien";
import type { Producto } from "../../../types/producto.type";
import Table from "../../../components/ui/Table";
import { useState } from "react";

function RowTable({ id, codigo_del_bien, codigo_producto_sunat, descripcion_detallada_del_bien, unidad_de_medida_del_bien, cantidad }: Producto) {
  return (
    <tr
      key={id}
      className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
    >
      <td className="px-4 py-4">
        <span className="text-sm font-medium text-white">
          {codigo_del_bien}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-gray-300">
          {codigo_producto_sunat}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-gray-300">
          {descripcion_detallada_del_bien}
        </span>
      </td>
      <td className="px-4 py-4 text-center">
        <span className="text-sm text-gray-300">{unidad_de_medida_del_bien}</span>
      </td>
      <td className="px-4 py-4 text-center">
        <span className="text-sm font-medium text-white">
          {cantidad}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            className="p-2 hover:bg-[#21262d] rounded-lg transition-colors"
            aria-label="Editar"
          >
            <Edit2 className="w-4 h-4 text-gray-400" />
          </button>
          <button
            className="p-2 hover:bg-[#21262d] rounded-lg transition-colors"
            aria-label="Eliminar"
          >
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function BienesDatosDeCarga() {
  const [measureUnit, setMeasureUnit] = useState<'KG' | 'T'>('KG');
  const [totalWeight, setTotalWeight] = useState('10');
  const [showAgregarBien, setShowAgregarBien] = useState<boolean>(false);
  const headerTabler: string[] = [
    "Código",
    "Cod. SUNAT",
    "Descripción",
    "Unidad",
    "Valor Unidad",
    "Acciones"
  ]
  const [goods, setGoods] = useState<Producto[]>([
  {
    id: 1,
    codigo_del_bien: 'ILU-205',
    codigo_producto_sunat: '39111516',
    descripcion_detallada_del_bien: 'Panel LED circular empotrable 18W - Luz Blanca',
    unidad_de_medida_del_bien: 'Unidades (NIU)',
    cantidad: 15
  },
  {
    id: 2,
    codigo_del_bien: 'HER-882',
    codigo_producto_sunat: '27111703',
    descripcion_detallada_del_bien: 'Martillo de uña 16oz mango de fibra de vidrio',
    unidad_de_medida_del_bien: 'Unidades (NIU)',
    cantidad: 8
  },
  {
    id: 3,
    codigo_del_bien: 'TUB-040',
    codigo_producto_sunat: '40142115',
    descripcion_detallada_del_bien: 'Tubo PVC SAP presión clase 10 de 1/2 pulgada',
    unidad_de_medida_del_bien: 'Metros (MTR)',
    cantidad: 120
  }
]);

  return (
    <div className="flex flex-col gap-4 px-8 py-6">
      {showAgregarBien && (
        <AgregarBien setShowAgregarBien={setShowAgregarBien} />
      )}

      {/* Content */}
      <div className="space-y-6">
        {/* Bienes Transportados */}
        <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#1f6feb]" />
              <h2 className="text-lg font-semibold">Bienes Transportados</h2>
            </div>
            <button
              onClick={() => setShowAgregarBien(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#1f6feb] hover:bg-[#1a5cd9] rounded-lg transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Agregar Ítem
            </button>
          </div>

          {/* Table */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden mb-4">
            <Table tableHeader={headerTabler} >
              {goods.map((good, index) => (
                <RowTable 
                  key={index}
                  id={good.id}
                  codigo_del_bien={good.codigo_del_bien}
                  codigo_producto_sunat={good.codigo_producto_sunat}
                  descripcion_detallada_del_bien={good.descripcion_detallada_del_bien}
                  unidad_de_medida_del_bien={good.unidad_de_medida_del_bien}
                  cantidad={good.cantidad}
                />
              ))}
            </Table>
          </div>

          <p className="text-xs text-gray-500 italic">
            Lista dinámica de bienes. Puedes añadir múltiples ítems a la guía.
          </p>
        </section>

        {/* Datos de la Carga */}
        <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Scale className="w-5 h-5 text-[#1f6feb]" />
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
                  onClick={() => setMeasureUnit("KG")}
                  className={`p-4 rounded-lg border transition-colors ${
                    measureUnit === "KG"
                      ? "bg-[#1f6feb]/10 border-[#1f6feb] text-white"
                      : "bg-[#0d1117] border-[#30363d] text-gray-400 hover:border-[#1f6feb]/50"
                  }`}
                >
                  <div className="text-center">
                    <p className="font-semibold text-sm mb-1">Kilogramo</p>
                    <p className="text-xs text-gray-500">KG</p>
                  </div>
                </button>   

                <button
                  onClick={() => setMeasureUnit("T")}
                  className={`p-4 rounded-lg border transition-colors ${
                    measureUnit === "T"
                      ? "bg-[#1f6feb]/10 border-[#1f6feb] text-white"
                      : "bg-[#0d1117] border-[#30363d] text-gray-400 hover:border-[#1f6feb]/50"
                  }`}
                >
                  <div className="text-center">
                    <p className="font-semibold text-sm mb-1">Tonelada</p>
                    <p className="text-xs text-gray-500">T</p>
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
                  placeholder="0"
                  value={totalWeight}
                  onChange={(e) => setTotalWeight(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 pr-12 text-white text-2xl font-bold focus:outline-none focus:border-[#1f6feb] transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  {measureUnit}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                El peso bruto total debe considerar el peso de los bienes + el
                embalaje.
              </p>
            </div>
          </div>
        </section>

        {/* Resumen de Carga */}
        <div className="bg-gradient-to-r from-[#1f6feb]/10 to-[#1f6feb]/5 border border-[#1f6feb]/30 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1f6feb]/20 rounded-full flex items-center justify-center">
                <Info className="w-5 h-5 text-[#1f6feb]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-1">
                  Resumen de Carga
                </p>
                <p className="text-xs text-gray-400">
                  Total ítems:{" "}
                  <span className="text-white font-medium">{goods.length}</span>{" "}
                  | Peso Bruto:{" "}
                  <span className="text-[#1f6feb] font-bold">
                    {totalWeight} {measureUnit}
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
