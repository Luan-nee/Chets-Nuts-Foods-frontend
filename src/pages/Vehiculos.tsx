import { Plus, Truck, Edit2 } from "lucide-react";
import { useState } from "react";
import ContentPageMain from "../components/layouts/ContentPageMain";
import Table from "../components/ui/table/Table"
import FormCreate from "../features/vehiculos/components/FormCreate";
import FormUpdate from "../features/vehiculos/components/FormUpdate";
import { useFetchVehiculos } from "../features/vehiculos/hooks/useFetchVehiculos";

export default function Vehiculos() {
  const [selectVehiculoId, setSelectVehiculoId] = useState<number | null>(null);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);

  const {
    vehiculos,
    isLoading: vehiculosIsLoading,
    isError: vehiculosIsError,
    execute: recargarVehiculos,
    setPage,
    infoPaginacion,
  } = useFetchVehiculos();

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

      <div className="p-4">
        <Table
          cantidadDatos={vehiculos.length}
          dataIsError={vehiculosIsError}
          dataIsLoading={vehiculosIsLoading}
          reload={recargarVehiculos}
          changePage={setPage}
          dataPagination={infoPaginacion}
          tableHeader={[
            "PLACA",
            "MARCA",
            "MODELO",
            "AÑO",
            "CAPACIDAD (TN)",
            "ESTADO",
            "ACCIONES",
          ]}
        >
          {vehiculos?.map((vehiculo, index) => (
            <tr
              key={index}
              className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
            >
              {/* Placa */}
              <td className="px-6 py-4">
                <div className="inline-flex flex-col items-center justify-center bg-[#FACC15] text-[#1E1E1E] font-bold px-3 py-0.5 rounded-[3px] border-2 border-black border-double shadow-sm tracking-widest leading-none select-none">
                  <span className="text-base font-extrabold font-mono tracking-wider pt-0.5">
                    {vehiculo.placa}
                  </span>
                </div>
              </td>

              {/* Marca */}
              <td className="px-6 py-4">
                <span className="text-sm text-white uppercase">{vehiculo.marca}</span>
              </td>

              {/* Modelo */}
              <td className="px-6 py-4">
                <span className="text-sm text-white uppercase">{vehiculo.modelo}</span>
              </td>

              {/* Año */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">{vehiculo.anio}</span>
              </td>

              {/* Capacidad de carga */}
              <td className="px-8 py-4">
                <span className="text-sm text-white font-medium">
                  {vehiculo.capacidadCarga}
                </span>
              </td>

              {/* Estado del vehiculo */}
              <td className="px-6 py-4">
                <span className="text-sm text-white font-medium">
                  {vehiculo.estadovehiculo}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="p-2 hover:bg-[#21262d] rounded-lg transition-colors"
                    aria-label="Editar vehículo"
                    onClick={() => {
                      setShowFormUpdate(true);
                      setSelectVehiculoId(vehiculo.idvehempresa);
                    }}
                  >
                    <Edit2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {showFormCreate && (
        <FormCreate
          showFormCreate={setShowFormCreate}
          onSuccess={recargarVehiculos}
        />
      )}
      {showFormUpdate && selectVehiculoId !== null && (
        <FormUpdate
          showFormUpdate={setShowFormUpdate}
          idVehiculo={selectVehiculoId}
          onSuccess={recargarVehiculos}
        />
      )}
    </ContentPageMain>
  );
}
