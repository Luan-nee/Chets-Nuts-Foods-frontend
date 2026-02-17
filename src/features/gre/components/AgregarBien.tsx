import { useState } from "react";
import { Package, PlusCircle, X } from "lucide-react";
import InputSelect from "../../../components/ui/InputSelect";
import type { Producto }  from "../../../types/producto.type";

interface AgregarBienProps {
  setShowAgregarBien: (p: boolean) => void;
  setGoods: (newGood: Producto) => void;
}

const unidadesMedida: { value: string; label: string }[] = [
  { value: 'NIU', label: 'Unidades - NIU' },
  { value: 'KGM', label: 'Kilogramos - KGM' },
  { value: 'TNE', label: 'Toneladas - TNE' },
  { value: 'MTR', label: 'Metros - MTR' },
  { value: 'LTR', label: 'Litros - LTR' },
  { value: 'M3', label: 'Metros cúbicos - M3' }
]

export default function AgregarBien({setShowAgregarBien, setGoods} : AgregarBienProps) {
  const [ formData, setFormData ] = useState<Producto>({
    codigo_del_bien: '',
    descripcion_detallada_del_bien: '',
    unidad_de_medida_del_bien: '',
    cantidad: 0
  });
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const handleSubmit = () => {
    const newGood: Producto = {
      codigo_del_bien: formData.codigo_del_bien,
      descripcion_detallada_del_bien: formData.descripcion_detallada_del_bien,
      unidad_de_medida_del_bien: formData.unidad_de_medida_del_bien,
      cantidad: formData.cantidad
    };
    setGoods(newGood);
    console.log(newGood);
    setShowAgregarBien(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg border border-[#1f2937] w-full max-w-3xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1f2937]">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-[#3b82f6]" />
            <h2 className="text-lg font-bold text-white">Registro de Bien Transportado</h2>
          </div>
          <button
            onClick={() => setShowAgregarBien(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">

          {/* Form Grid */}
          <div className="grid grid-cols-1 gap-4">
            {/* Código del Bien */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Código del Bien
              </label>
              <input
                type="text"
                name="codigo_del_bien"
                placeholder="S/C"
                value={formData.codigo_del_bien}
                onChange={(e) => handleInputChange("codigo_del_bien", e.target.value)}
                className="w-full bg-black/40 border border-[#1f2937] rounded-lg px-3.5 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>
          </div>

          {/* Descripción Detallada */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
              Descripción Detallada
            </label>
            <input
              type="text"
              name="descripcion_detallada_del_bien"
              placeholder="Describa detalladamente el bien transportado..."
              value={formData.descripcion_detallada_del_bien}
              onChange={(e) => handleInputChange("descripcion_detallada_del_bien", e.target.value)}
              className="w-full bg-black/40 border border-[#1f2937] rounded-lg px-3.5 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] transition-colors"
            />
          </div>

          {/* Unidad de Medida y Cantidad */}
          <div className="grid grid-cols-2 gap-4">
            {/* Unidad de Medida */}
            <div>
              <InputSelect name={"unidad_de_medida_del_bien"} placeholder={"seleccionar la unidad de medida..."} options={unidadesMedida} handleInputChange={handleInputChange} />
            </div>

            {/* Cantidad */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Cantidad
              </label>
              <input
                type="text"
                name="cantidad"
                placeholder="0"
                value={formData.cantidad}
                onChange={(e) => handleInputChange("cantidad", e.target.value)}
                className="w-full bg-black/40 border border-[#1f2937] rounded-lg px-3.5 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-[#1f2937]">
          <button
            onClick={() => setShowAgregarBien(false)}
            className="px-5 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:text-white transition-colors text-sm font-medium"
          >
            Descartar
          </button>
          <button
            onClick={() => {
              // setGoods((prev: Producto[]) => [...prev, formData]);
              handleSubmit();
              setShowAgregarBien(false);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg transition-colors text-white text-sm font-medium"
          >
            <PlusCircle className="w-4 h-4" />
            Agregar a la Guía
          </button>
        </div>
      </div>
    </div>
  );
}