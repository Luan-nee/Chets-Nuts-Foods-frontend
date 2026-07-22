import { useState } from 'react';
import { Plus } from 'lucide-react';
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
    "Marca",
    "Modelo",
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
          <p className="text-lg text-xl font-medium text-white">
            Selecciona un vehículo para la guía de remisión
          </p>
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
                <div className="inline-flex flex-col items-center justify-center bg-[#FACC15] text-[#1E1E1E] font-bold px-3 py-0.5 rounded-[3px] border-2 border-black border-double shadow-sm tracking-widest leading-none select-none">
                  <span className="text-base font-extrabold font-mono tracking-wider pt-0.5">
                    {vehiculo.placa}
                  </span>
                </div>
              </td>

              {/* Marca */}
              <td className="px-6 py-4">
                <div className="text-sm text-gray-300 uppercase">
                  {vehiculo.marca}
                </div>
              </td>

              {/* Modelo */}
              <td className="px-6 py-4">
                <div className="text-sm text-gray-300 uppercase">
                  {vehiculo.modelo}
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