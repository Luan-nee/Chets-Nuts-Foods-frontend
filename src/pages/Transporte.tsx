import { useState } from "react";
import { Navigation } from "lucide-react";
import FormCreate from "../features/seguimiento/components/FormCreate";
import Seguimiento from "../features/seguimiento/components/Seguimiento"

export default function Transporte() {
  const [showFormSeguimiento, setShowFormSeguimiento] = useState<boolean>(true);
  const [showSeguimiento, setShowSeguimiento] = useState<boolean>(false);

  return (
    <div className="relative flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            Actualizar seguimiento
          </h2>
          <p className="text-sm text-gray-400 text-center">
            Registra información de seguimiento para la guía de remisión seleccionada.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-2">
        <button 
          onClick={() => {
            setShowFormSeguimiento(false)
            setShowSeguimiento(true)
          }}
          className="flex items-center justify-center gap-2 
          bg-yellow-600 hover:bg-yellow-700 
          text-white px-5 py-4 rounded-lg font-medium transition-colors"
        >
          <Navigation className="w-4 h-4 text-white"/>
          Realizar seguimiento
        </button>
        <button 
          onClick={() => {
            setShowFormSeguimiento(true)
            setShowSeguimiento(false)
          }}
          className="flex items-center justify-center gap-2 
          bg-green-600 hover:bg-green-700 
          text-white px-5 py-2 rounded-lg font-medium transition-colors"
        >
          <Navigation className="w-4 h-4 text-white"/>
          Registrar seguimiento
        </button>
      </div>


      { showFormSeguimiento && (
        <FormCreate />
      )} 
      { showSeguimiento && (
        <Seguimiento />
      )} 
    </div>
  );
}
