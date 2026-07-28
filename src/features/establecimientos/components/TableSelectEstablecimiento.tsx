import Table from '../../../components/ui/Table';
import ContentSectionProcess from '../../../components/layouts/ContentSectionProcess';
import { Building2, MapPin, Plus } from 'lucide-react';
import { useFetchEstablecimientos } from '../hooks/useFetchEstablecimientos'; 
import { useState, useEffect } from 'react';

interface TableSelectEstablecimientoProps {
  selectIdEstablecimiento: (idEstablecimiento: number | null) => void;
  onChange: (idEstablecimiento: number) => void;
  initialSelectedId?: number | null;
}

export default function TableSelectEstablecimiento({ selectIdEstablecimiento, onChange, initialSelectedId }: TableSelectEstablecimientoProps) {
  const [idSelected, setIdSelected] = useState<number | null>(initialSelectedId || null);

  useEffect(() => {
    if (initialSelectedId !== undefined) {
      setIdSelected(initialSelectedId);
    }
  }, [initialSelectedId]);
  const tableHeader = [
    "Nombre", 
    "Distrito / Provincia / Departamento", 
    "Dirección", 
    ""
  ];
  const { 
    establecimientos,
    isLoading: isLoadingEstablecimientos,
    isError: isErrorEstablecimientos,
    execute: listarEstablecimientos,
  } = useFetchEstablecimientos();

  return (
    <ContentSectionProcess
      isLoading={isLoadingEstablecimientos}
      isError={isErrorEstablecimientos}
      textError="Error al cargar los establecimientos"
      textButtonError="Reintentar"
      fetchData={listarEstablecimientos}
    >
      <div className="flex-1 overflow-auto">
        <div className="p-4 flex justify-between items-center">
          <p className="text-lg text-xl font-medium text-white">
            Selecciona un establecimiento de destino
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => listarEstablecimientos()}
          >
            Recargar
          </button>
        </div>
        <Table
          tableHeader={tableHeader}
          cantidadDatos={establecimientos.length}
        >
          {establecimientos.map((establecimiento, index) => (
            <tr
              key={index}
              className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
            >
              {/* Establecimiento */}
              <td className="px-6 py-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-[#1f6feb]/15 p-2">
                    <Building2 className="w-5 h-5 text-[#1f6feb]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-medium text-sm text-white truncate">
                      {establecimiento.nombreEst}
                    </span>
                    <span className="block text-xs text-gray-400 truncate">
                      {establecimiento.descripcion}
                    </span>
                  </div>
                </div>
              </td>

              {/* Ubicación */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{establecimiento.distrito}, {establecimiento.provincia}</span>
                </div>
              </td>

              {/* Dirección */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">{establecimiento.direccion}</span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  { idSelected === establecimiento.idEst ? (
                    <button onClick={() => {
                      setIdSelected(null);
                      selectIdEstablecimiento(null);
                    }} className="hover:text-red-400">
                      <span className="text-red-500 flex flex-row gap-2">
                        <span>Eliminar</span>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        selectIdEstablecimiento(establecimiento.idEst);
                        setIdSelected(establecimiento.idEst);
                        onChange(establecimiento.idEst);
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