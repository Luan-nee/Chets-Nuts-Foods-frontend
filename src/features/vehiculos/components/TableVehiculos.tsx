// importación de componentes UI
import { Edit2 } from "lucide-react";
import Table from "../../../components/ui/Table";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
// importación de custom hooks
import { useFetchVehiculos } from "../hooks/useFetchVehiculos";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";
import { useEffect, useRef } from "react";
import { ESTADOS, type EstadoVehiculo } from "../../../types/constantes.type";

interface PropTableVehiculo {
  setShowFormUpdate: (p: boolean) => void;
  setSelectVehiculoId: (p: number | null) => void;
  SearchPlaca: string | null;
  estado?:string;
  searchTrigger: number;
  refreshKey?: number;
}

export default function TableVehiculos({
  setShowFormUpdate,
  setSelectVehiculoId,
  SearchPlaca,
  estado,
  refreshKey,
}: PropTableVehiculo) {
  
  const {
    vehiculos,
    isLoading: vehiculosIsLoading,
    isError: vehiculosIsError,
    execute: listarVehiculos,
    setPage,
    infoPaginacion,
  } = useFetchVehiculos();
  
  const isEstadoVehiculo = (value: any): value is EstadoVehiculo =>
    ESTADOS.includes(value);

  const estado2 = isEstadoVehiculo(estado) ? estado : undefined;
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    if (refreshKey === undefined) return;

  }, [refreshKey, SearchPlaca, estado2, infoPaginacion.pagina_actual]);

  const tableHeader: string[] = [
    "Placa",
    "Marca",
    "Modelo",
    "Año",
    "Capacidad (TN)",
    "estado",
    "Acciones",
  ];

  return (
    <ContentSectionProcess 
      isLoading={vehiculosIsLoading}
      isError={vehiculosIsError}
      textError="Error al cargar los vehículos."
      textButtonError="Reintentar"
      fetchData={listarVehiculos}
    >

    <div className="flex-1 overflow-auto">
      <div className="p-4 flex justify-end gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => listarVehiculos()}>
          Recargar
        </button>
      </div>

      <ButtonsPagination 
      total_paginas={infoPaginacion.total_paginas} 
      pivote={infoPaginacion.pagina_actual} 
      fetchData={setPage}
      datos_por_pagina={infoPaginacion.datos_por_pagina} 
      total_data={infoPaginacion.total_data} 
      />

      <Table tableHeader={tableHeader} cantidadDatos={vehiculos.length}>
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

    </ContentSectionProcess>
  );
}
