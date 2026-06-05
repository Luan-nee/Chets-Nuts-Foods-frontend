// importación de componentes UI
import { Edit2, Truck } from "lucide-react";
import Table from "../../../components/ui/Table";
import Loading from "../../../components/ui/Loading";
// importación de custom hooks
import { useFetchVehiculos } from "../hooks/useFetchVehiculos";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";

interface PropTableVehiculo {
  setShowFormUpdate: (p: boolean) => void;
  setSelectVehiculoId: (p: number| null) => void;
}

export default function TableVehiculos({
  setShowFormUpdate,
  setSelectVehiculoId,
}: PropTableVehiculo) {
  
  const {
    vehiculos,
    isLoading,
    isError,
    execute: recargarVehiculos,
    setPagina,
    infoPaginacion,
  } = useFetchVehiculos();

  const tableHeader: string[] = [
    "Placa",
    "Marca/Modelo",
    "Año",
    "Tipo",
    "Capacidad (KG)",
    "estado",
    "Acciones",
  ];

  if (isLoading) {
    // has uso del componente de carga Loading.tsx
    return (
      <div className="flex justify-center items-center py-10">
        <Loading w={6} h={6} color="blue" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500">Error al cargar los vehículos.</p>
        {/* agrega un botón para reintentar la carga */}
        <button
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={ () => recargarVehiculos(1)}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (vehiculos === null || vehiculos.length === 0) {
    return <div>No hay vehículos disponibles.</div>;
  }

  return (
    <div className="flex-1 overflow-auto px-8 py-6">
      <div className="p-4 flex justify-end gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setPagina(infoPaginacion.pagina_actual)}>
          Recargar
        </button>
      </div>

      <ButtonsPagination 
      total_paginas={infoPaginacion.total_paginas} 
      pivote={infoPaginacion.pagina_actual} 
      fetchData={setPagina}
      datos_por_pagina={infoPaginacion.datos_por_pagina} 
      total_data={infoPaginacion.total_data} 
      />

      <Table tableHeader={tableHeader}>
        {vehiculos?.map((vehiculo, index) => (
          <tr
            key={index}
            className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
          >
            {/* Plate */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#1f6feb]" />
                <span className="font-medium text-sm text-white">
                  {vehiculo.placa}
                </span>
              </div>
            </td>

            {/* Marca/Modelo */}
            <td className="px-6 py-4">
              <span className="text-sm text-white">{vehiculo.marca} / {vehiculo.modelo}</span>
            </td>

            {/* Año */}
            <td className="px-6 py-4">
              <span className="text-sm text-gray-300">{vehiculo.anio}</span>
            </td>

            {/* Tipo de vehiculo */}
            <td className="px-6 py-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border bg-blue-500/20 text-blue-400 border-blue-500/30`}
              >
                {vehiculo.tipoVehiculo}
              </span>
            </td>

            {/* Capacidad de carga */}
            <td className="px-6 py-4">
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
  );
}
