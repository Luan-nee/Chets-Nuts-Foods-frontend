import { Plus, Search, Filter, Truck } from "lucide-react";
import { useState } from "react";
import ContentPageMain from "../components/layouts/ContentPageMain";
import TableVehiculos from "../features/vehiculos/components/TableVehiculos";
import FormCreate from "../features/vehiculos/components/FormCreate";
import FormUpdate from "../features/vehiculos/components/FormUpdate";
import Desplegable from "../components/ui/Desplegable";
import type { EstadoVehiculo } from "../types/constantes.type";

export default function Vehiculos() {
  const [selectVehiculoId, setSelectVehiculoId] = useState<number | null>(null);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [refreshVehiculosKey, setRefreshVehiculosKey] = useState(0);
  const [searchPlaca, setSearchPlaca] = useState<string | null>(null);
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [estado, setEstado] = useState<EstadoVehiculo | string>("");

  const estados = [
    "INACTIVO",
    "OPERATIVO",
  ];
  const busquedaPlaca = (valor: React.KeyboardEvent<HTMLInputElement>) => {
    if (valor.key === "Enter") {
      setSearchTrigger((valorActual) => valorActual + 1);
    }
  };

  const ejecutarBusquedaVehiculos = () => {
    setSearchTrigger((valorActual) => valorActual + 1);
  };

  const limpiarFiltrosVehiculos = () => {
    setSearchPlaca("");
    setEstado("");
    setRefreshVehiculosKey((valor) => valor + 1);
    setSearchTrigger((valorActual) => valorActual + 1);
  };

  const refrescarTablaVehiculos = () => {
    setRefreshVehiculosKey((valor) => valor + 1);
  };

  return (
    <ContentPageMain>
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-gray-900 border-b border-gray-800 px-8 py-6">
				<div>
					<div className="flex items-center gap-3 mb-2">
						<div className="rounded-xl bg-blue-600/20 p-2 border border-blue-500/20">
							<Truck className="w-6 h-6 text-blue-300" />
						</div>
						<h2 className="text-3xl font-bold text-white">Gestión de vehículos</h2>
					</div>
					<p className="text-sm text-gray-400 max-w-3xl">
						Administra los vehículos registrados en el sistema, revisa sus datos y realiza actualizaciones cuando sea necesario.
					</p>
				</div>

				<button
					onClick={() => setShowFormCreate(true)}
					className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
				>
					<Plus className="w-5 h-5" />
					Nuevo establecimiento
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
              placeholder="Buscar un vehículo por placa ..."
              className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={searchPlaca ?? ""}
              onChange={(e) => setSearchPlaca(e.target.value)}
              onKeyDown={busquedaPlaca}
            />
          </div>
          
          <Desplegable
            valores={estados}
            setValores={setEstado}
            setEstado={ejecutarBusquedaVehiculos}
            valorSeleccionado={estado}
          />      
          
          {/* Filter Button */}
          <button
            className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            onClick={ejecutarBusquedaVehiculos}
            aria-label="Buscar vehículo"
            type="button"
          >
            <Filter className="w-5 h-5 text-white" />
          </button>

          <button
            className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors text-sm font-medium"
            onClick={limpiarFiltrosVehiculos}
            type="button"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Table */}
      <TableVehiculos
        setShowFormUpdate={setShowFormUpdate}
        setSelectVehiculoId={setSelectVehiculoId}
        SearchPlaca={searchPlaca}
        searchTrigger={searchTrigger}
        estado={estado}
        refreshKey={refreshVehiculosKey}
      />

      {showFormCreate && (
        <FormCreate
          showFormCreate={setShowFormCreate}
          onSuccess={refrescarTablaVehiculos}
        />
      )}
      {showFormUpdate && selectVehiculoId !== null && (
        <FormUpdate
          showFormUpdate={setShowFormUpdate}
          idVehiculo={selectVehiculoId}
          onSuccess={refrescarTablaVehiculos}
        />
      )}
    </ContentPageMain>
  );
}
