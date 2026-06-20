import { useState } from 'react'
import Form from "../features/datosEmpresa/components/Form";
import { Plus } from 'lucide-react';

export default function Configuraciones() {
  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  return (
    <div className="relative flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Configuraciones</h2>
            <p className="text-sm text-gray-400">
              Registra la información de tu empresa para generar guías de remisión y otros documentos relacionados. Asegúrate de que los datos sean correctos para evitar problemas futuros.
            </p>
          </div>
        </div>
      </div>
      { showFormCreate && (
        <Form setShowFormCreate={setShowFormCreate}/>
      )}
    </div>
  );
}
