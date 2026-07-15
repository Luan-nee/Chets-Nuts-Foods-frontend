import { Plus } from "lucide-react";
import { useState } from "react";
import TableClientes from "../features/clientes/components/TableClientes";
import FormCreateCliente from "../features/clientes/components/FormCreateCliente";
import FormUpdateCliente from "../features/clientes/components/FormUpdateCliente";

export default function Clientes() {
  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [showFormUpdate, setShowFormUpdate] = useState<boolean>(false);
  const [dniCliente, setDniCliente] = useState<string>("");

  return (
    <div className="relative flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Gestión de clientes</h2>
            <p className="text-sm text-gray-400">Gestiona la información de tus clientes.</p>
          </div>
          <button 
            onClick={() => setShowFormCreate(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Nuevo Cliente
          </button>
        </div>
      </div>

      <TableClientes setShowFormUpdate={setShowFormUpdate} setDniCliente={setDniCliente} />

      { showFormCreate && (
        <FormCreateCliente setShowFormCreate={setShowFormCreate} setDniCliente={setDniCliente} />
      )}
      { showFormUpdate && (
        <FormUpdateCliente setShowFormUpdate={setShowFormUpdate} dniCliente={dniCliente} />
      )}

    </div>
  );
}