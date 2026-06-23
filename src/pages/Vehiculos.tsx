import { Plus, Search, Filter } from "lucide-react";
import { useState } from "react";
import TableVehiculos from "../features/vehiculos/components/TableVehiculos";
import FormCreate from "../features/vehiculos/components/FormCreate";
import FormUpdate from "../features/vehiculos/components/FormUpdate";
import Desplegable from "../components/ui/Desplegable";
import type { EstadoVehiculo } from "../types/constantes.type";

export default function Vehiculos() {
  const [selectVehiculoId, setSelectVehiculoId] = useState<number | null>(null);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [searchPlaca, setSearchPlaca] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState(false);
  const [estado, setEstado] = useState<EstadoVehiculo | string>("");

  const estados = [
    "RESERVADO",
    "INACTIVO",
    "OPERATIVO",
  ];
  const busquedaPlaca = (valor: React.KeyboardEvent<HTMLInputElement>) => {
    if (valor.key === "Enter") {
      setBusqueda(true);
    }
  };

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Gestión de vehículos
            </h2>
            <p className="text-sm text-gray-400">
              Gestiona la información de tus vehículos.
            </p>
          </div>
          <button
            onClick={() => setShowFormCreate(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nuevo Vehículo
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar un vehículo por placa ..."
              className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={(e) => setSearchPlaca(e.target.value)}
              onKeyDown={busquedaPlaca}
            />
          </div>
          
          <Desplegable valores={estados} setValores={setEstado} setEstado={setBusqueda}/>      
         
          {/* Filter Button */}
          <button className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <TableVehiculos
          setShowFormUpdate={setShowFormUpdate}
          setSelectVehiculoId={setSelectVehiculoId}
          SearchPlaca={searchPlaca}
          setBusqueda={setBusqueda}
          busqueda={busqueda}
          estado={estado}
        />
      </div>

      {showFormCreate && <FormCreate showFormCreate={setShowFormCreate} />}

      {showFormUpdate && selectVehiculoId !== null && (
        <FormUpdate
          showFormUpdate={setShowFormUpdate}
          idVehiculo={selectVehiculoId}
        />
      )}
    </div>
  );
}
