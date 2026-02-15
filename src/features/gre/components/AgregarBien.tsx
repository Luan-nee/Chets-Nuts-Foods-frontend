import { Package, PlusCircle, X } from "lucide-react";

interface AgregarBienProps {
  setShowAgregarBien: (p: boolean) => void;
}

export default function AgregarBien({setShowAgregarBien} : AgregarBienProps) {


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg border border-[#1f2937] w-full max-w-xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
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
          <div className="grid grid-cols-2 gap-4">
            {/* Código del Bien */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Código del Bien
              </label>
              <input
                type="text"
                placeholder="HTA-001"
                className="w-full bg-black/40 border border-[#1f2937] rounded-lg px-3.5 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>

            {/* Cód. Subpartida Nacional */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Cód. Subpartida Nacional
              </label>
              <input
                type="text"
                placeholder="Opcional"
                className="w-full bg-black/40 border border-[#1f2937] rounded-lg px-3.5 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>

            {/* Cód. Producto SUNAT */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Cód. Producto SUNAT
              </label>
              <input
                type="text"
                placeholder="27111700"
                className="w-full bg-black/40 border border-[#1f2937] rounded-lg px-3.5 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>

            {/* Código GTIN */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Código GTIN
              </label>
              <input
                type="text"
                placeholder="Global Trade Item Number"
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
              placeholder="Caja de herramientas de acero 20 pulgadas"
              className="w-full bg-black/40 border border-[#1f2937] rounded-lg px-3.5 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] transition-colors"
            />
          </div>

          {/* Unidad de Medida y Cantidad */}
          <div className="grid grid-cols-2 gap-4">
            {/* Unidad de Medida */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Unidad de Medida
              </label>
              <div className="relative">
                <select
                  className="w-full bg-black/40 border border-[#1f2937] rounded-lg px-3.5 py-2.5 pr-10 text-white text-sm focus:outline-none focus:border-[#3b82f6] transition-colors appearance-none cursor-pointer"
                >
                  <option value="NIU">Unidades - NIU</option>
                  <option value="KGM">Kilogramos - KGM</option>
                  <option value="TNE">Toneladas - TNE</option>
                  <option value="MTR">Metros - MTR</option>
                  <option value="LTR">Litros - LTR</option>
                  <option value="M3">Metros cúbicos - M3</option>
                </select>
                <svg 
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Cantidad */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Cantidad
              </label>
              <input
                type="text"
                placeholder="10"
                className="w-full bg-black/40 border border-[#1f2937] rounded-lg px-3.5 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-[#1f2937]">
          <button
            onClick={() => {setShowAgregarBien(false)}}
            className="px-5 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:text-white transition-colors text-sm font-medium"
          >
            Descartar
          </button>
          <button
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