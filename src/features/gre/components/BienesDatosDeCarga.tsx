import { Edit2, Info, Package, Plus, Scale, Trash2 } from "lucide-react";
import Table from "../../../components/ui/Table";
import { useState } from "react";
interface PropRowTable {
  index: number;
  codigo_del_bien: string;
  codigo_product_sunat: string;
  descripcion: string;
  unidad_de_medida: string;
  cantidad: number;
}

function RowTable({ index, codigo_del_bien, codigo_product_sunat, descripcion, unidad_de_medida, cantidad }: PropRowTable) {
  return (
    <tr
      key={index}
      className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
    >
      <td className="px-4 py-4">
        <span className="text-sm font-medium text-white">
          {codigo_del_bien}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-gray-300">
          {codigo_product_sunat}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-gray-300">
          {descripcion}
        </span>
      </td>
      <td className="px-4 py-4 text-center">
        <span className="text-sm text-gray-300">{unidad_de_medida}</span>
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
  const [measureUnit, setMeasureUnit] = useState<'KGM' | 'TNE'>('KGM');
  const [totalWeight, setTotalWeight] = useState('10');
  const headerTabler: string[] = [
    "Código",
    "Cod. SUNAT",
    "Descripción",
    "Unidad",
    "Valor Unidad",
    "Acciones"
  ]
  const [goods, setGoods] = useState<PropRowTable[]>([
    {
      index: 0,
      codigo_del_bien: 'HTA-001',
      codigo_product_sunat: '27111700',
      descripcion: 'Caja de herramientas de acero 20 pulgadas',
      unidad_de_medida: 'NIU',
      cantidad: 10
    }
  ]);

  return (
    <div className="flex flex-col gap-4 px-8 py-6">

      {/* Content */}
      <div className="space-y-6">
        {/* Bienes Transportados */}
        <section className="bg-[#0d1117] border border-[#30363d] rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#1f6feb]" />
              <h2 className="text-lg font-semibold">Bienes Transportados</h2>
            </div>
            <button
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
                  index={index}
                  codigo_del_bien={good.codigo_del_bien}
                  codigo_product_sunat={good.codigo_product_sunat}
                  descripcion={good.descripcion}
                  unidad_de_medida={good.unidad_de_medida}
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
        <section className="bg-[#0d1117] border border-[#30363d] rounded-lg p-6">
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
                  onClick={() => setMeasureUnit("KGM")}
                  className={`p-4 rounded-lg border transition-colors ${
                    measureUnit === "KGM"
                      ? "bg-[#1f6feb]/10 border-[#1f6feb] text-white"
                      : "bg-[#0d1117] border-[#30363d] text-gray-400 hover:border-[#1f6feb]/50"
                  }`}
                >
                  <div className="text-center">
                    <p className="font-semibold text-sm mb-1">Kilogramo</p>
                    <p className="text-xs text-gray-500">KGM</p>
                  </div>
                </button>

                <button
                  onClick={() => setMeasureUnit("TNE")}
                  className={`p-4 rounded-lg border transition-colors ${
                    measureUnit === "TNE"
                      ? "bg-[#1f6feb]/10 border-[#1f6feb] text-white"
                      : "bg-[#0d1117] border-[#30363d] text-gray-400 hover:border-[#1f6feb]/50"
                  }`}
                >
                  <div className="text-center">
                    <p className="font-semibold text-sm mb-1">Tonelada</p>
                    <p className="text-xs text-gray-500">TNE</p>
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
                  type="text"
                  value={totalWeight}
                  onChange={(e) => setTotalWeight(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 pr-12 text-white text-2xl font-bold focus:outline-none focus:border-[#1f6feb] transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  kg
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
                    {totalWeight} kg
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-400 uppercase">
                Completado
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
