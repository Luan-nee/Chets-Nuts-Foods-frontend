import { useState } from "react";
import TableSelectSalidaTransporte from "../features/transporte/components/TableSelectSalidaTransporte";
import FormCreate from "../features/seguimiento/components/FormCreate";

export default function Seguimiento() {
  const [, setShowFormCreate] = useState<boolean>(false);
  const [, setSelectedSalidaTransporte] = useState<number | null>(null);

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

      <TableSelectSalidaTransporte
        onChange={(selectedId) => {
          console.log("Selected Salida Transporte ID:", selectedId);
        }}
        selectIdSalidaTransporte={setSelectedSalidaTransporte}
      />
      <FormCreate 
        setShowFormCreateEmpleado={setShowFormCreate}
      />
    </div>
  );
}
