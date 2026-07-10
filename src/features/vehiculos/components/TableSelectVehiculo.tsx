import { useState } from 'react';
import { Building2, Plus } from 'lucide-react';
import Table from '../../../components/ui/Table';
import ButtonsPagination from '../../../components/ui/ButtonsPagination';
import ContentSectionProcess from '../../../components/layouts/ContentSectionProcess';
import { useFetchVehiculos } from '../hooks/useFetchVehiculos';

interface TableSelectVehiculoProps {
  selectIdVehiculo: (idVehiculo: number | null) => void;
  onChange: (idVehiculo: number) => void;
}

export default function TableSelectVehiculo({ selectIdVehiculo, onChange }: TableSelectVehiculoProps) {
  const [idSelected, setIdSelected] = useState<number | null>(null);
  const tableHeader = [
    "Placa",
    "Marca / Modelo",
    "Año",
    "Estado",
    ""
  ];
  const { 
    vehiculos,
    isLoading: isLoadingVehiculos,
    isError: isErrorVehiculos,
    execute: listarVehiculos,
    setQueryVehiculo,
    infoPaginacion,
  } = useFetchVehiculos();

  const vehiculosOperativos = vehiculos.filter(
    (vehiculo) => vehiculo.estadovehiculo === "OPERATIVO"
  );
  
  const cambiarPagina = (pagina: number) => {
    setQueryVehiculo({page:pagina});
  };
  return (
    <ContentSectionProcess
      isLoading={isLoadingVehiculos}
      isError={isErrorVehiculos}
      textError="Error al cargar los vehículos."
      textButtonError="Reintentar"
      fetchData={() => listarVehiculos({page: 1})}
    >
      <div className="flex-1 overflow-auto">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium text-white">
            Selecciona un vehículo para la guía de remisión
          </h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setQueryVehiculo({page:infoPaginacion.pagina_actual})}
          >
            Recargar
          </button>
        </div>
        
        <ButtonsPagination 
          total_paginas={infoPaginacion.total_paginas} 
          pivote={infoPaginacion.pagina_actual} 
          fetchData={cambiarPagina}
          datos_por_pagina={infoPaginacion.datos_por_pagina} 
          total_data={infoPaginacion.total_data} 
        />

        <Table
          tableHeader={tableHeader}
          cantidadDatos={vehiculosOperativos.length}
        >
          {vehiculosOperativos.map((vehiculo) => (
            <tr
              key={vehiculo.idvehempresa}
              className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
            >
              {/* Placa */}
              <td className="px-6 py-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-[#1f6feb]/15 p-2">
                    <Building2 className="w-5 h-5 text-[#1f6feb]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-medium text-sm text-white truncate">
                      {vehiculo.placa}
                    </span>
                    <span className="block text-xs text-gray-400 truncate">
                      {vehiculo.tipoVehiculo}
                    </span>
                  </div>
                </div>
              </td>

              {/* Marca / Modelo */}
              <td className="px-6 py-4">
                <div className="text-sm text-gray-300">
                  {vehiculo.marca} / {vehiculo.modelo}
                </div>
              </td>

              {/* Año */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">{vehiculo.anio}</span>
              </td>

              {/* Estado */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">{vehiculo.estadovehiculo}</span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  { idSelected === vehiculo.idvehempresa ? (
                    <button onClick={() => {
                      setIdSelected(null);
                      selectIdVehiculo(null);
                    }} className="hover:text-red-400">
                      <span className="text-red-500 flex flex-row gap-2">
                        <span>Eliminar</span>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        selectIdVehiculo(vehiculo.idvehempresa);
                        setIdSelected(vehiculo.idvehempresa);
                        onChange(vehiculo.idvehempresa);
                      }}
                      className="text-green-500 hover:text-green-400 flex flex-row gap-2"
                    >
                      <span>Seleccionar</span>
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </ContentSectionProcess>
  );
}