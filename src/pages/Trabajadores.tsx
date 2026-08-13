import { useState } from "react";
import { Filter, Plus, Search, Users } from "lucide-react";
import ContentPageMain from "../components/layouts/contentPageMain";
import FormCreate from "../features/accesos/components/FormCreateAcceso";
import TableAccesos from "../features/accesos/components/TableAccesos";
import DetallesAcceso from "../features/accesos/components/DetallesAcceso";
import FormUpdate from "../features/accesos/components/FormUpdateAcceso";

export default function Trabajadores () {
  const [showDetallesAcceso, setShowDetallesAcceso] = useState<boolean>(false);
  const [showFormUpdate, setShowFormUpdate] = useState<boolean>(false);
  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [selectAccesoId, setSelectAccesoId] = useState<number | null>(null);

  return (
    <ContentPageMain>
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-gray-900 border-b border-gray-800 px-8 py-6">
				<div>
					<div className="flex items-center gap-3 mb-2">
						<div className="rounded-xl bg-blue-600/20 p-2 border border-blue-500/20">
              <Users className="w-6 h-6 text-blue-300" />
						</div>
						<h2 className="text-3xl font-bold text-white">Gestión del personal</h2>
					</div>
					<p className="text-sm text-gray-400 max-w-3xl">
						Administra los empleados registrados en el sistema, revisa sus datos y realiza actualizaciones cuando sea necesario.
					</p>
				</div>

				<button
					onClick={() => setShowFormCreate(true)}
					className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
				>
					<Plus className="w-5 h-5" />
					Nuevo empleado
				</button>
			</div>

      {/* Search and Filters */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar a un empleado..."
              className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filter */}
          <button className="flex items-center gap-2 bg-gray-950 border border-gray-800 hover:border-gray-700 text-gray-300 px-4 py-2.5 rounded-lg text-sm transition-colors">
            <span>Filtra según...</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Filter Button */}
          <button className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Table */}
      <TableAccesos 
        setShowDetallesAcceso={setShowDetallesAcceso}
        setShowFormUpdate={setShowFormUpdate} 
        setSelectAccesoId={setSelectAccesoId} 
      />

      { showDetallesAcceso && 
        <div className="absolute inset-0 z-50 bg-gray-950">
          <DetallesAcceso 
            showFormUpdateAcceso={setShowFormUpdate}
            showDetallesAcceso={setShowDetallesAcceso} 
            idAcceso={selectAccesoId!} 
          />
        </div>
      }
      { showFormUpdate && 
        <FormUpdate 
          setShowFormUpdateEmpleado={setShowFormUpdate} 
          idEmpleado={selectAccesoId!} 
        />
      }
      { showFormCreate && 
        <FormCreate 
          setShowFormCreateEmpleado={setShowFormCreate}
        />
      }
    </ContentPageMain>
  );
}