import { Plus, User2Icon } from "lucide-react";
import { useState } from "react";
import TableClientes from "../features/clientes/components/TableClientes";
import FormCreateCliente from "../features/clientes/components/FormCreateCliente";
import FormUpdateCliente from "../features/clientes/components/FormUpdateCliente";
import { useFetchClientes } from "../features/clientes/hooks/useFetchClientes";

export default function Clientes() {
  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [showFormUpdate, setShowFormUpdate] = useState<boolean>(false);
  const [dniCliente, setDniCliente] = useState<string>("");
  const {
    clientes,
    isLoading,
    isError,
    execute: recargarClientes,
  } = useFetchClientes();

  return (
    <div className="relative flex-1 flex flex-col">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-gray-900 border-b border-gray-800 px-8 py-6">
				<div>
					<div className="flex items-center gap-3 mb-2">
						<div className="rounded-xl bg-blue-600/20 p-2 border border-blue-500/20">
              <User2Icon className="w-6 h-6 text-blue-300" />
						</div>
						<h2 className="text-3xl font-bold text-white">Gestión de clientes</h2>
					</div>
					<p className="text-sm text-gray-400 max-w-3xl">
						Gestiona la información de tus clientes
					</p>
				</div>

				<button
					onClick={() => setShowFormCreate(true)}
					className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
				>
					<Plus className="w-5 h-5" />
					Nuevo cliente
				</button>
			</div>
      
      <div className="flex-1 overflow-auto px-8 py-6">
        <TableClientes
          clientes={clientes}
          isLoading={isLoading}
          isError={isError}
          recargarClientes={recargarClientes}
          setShowFormUpdate={setShowFormUpdate}
          setDniCliente={setDniCliente}
        />
      </div>

      { showFormCreate && (
        <FormCreateCliente
          setShowFormCreate={setShowFormCreate}
          setDniCliente={setDniCliente}
          onClienteCreado={recargarClientes}
        />
      )}
      { showFormUpdate && (
        <FormUpdateCliente
          setShowFormUpdate={setShowFormUpdate}
          dniCliente={dniCliente}
          onClienteActualizado={recargarClientes}
        />
      )}

    </div>
  );
}