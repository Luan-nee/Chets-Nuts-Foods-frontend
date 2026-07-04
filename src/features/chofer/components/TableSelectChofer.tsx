import { useState } from 'react';
import { Building2, Plus } from 'lucide-react';
import Table from '../../../components/ui/Table';
import ButtonsPagination from '../../../components/ui/ButtonsPagination';
import ContentSectionProcess from '../../../components/layouts/ContentSectionProcess';
import { useFetchChoferes } from '../hooks/useFetchChoferes';

interface TableSelectChoferProps {
  selectIdChofer: (idChofer: number | null) => void;
}

export default function TableSelectChofer({ selectIdChofer }: TableSelectChoferProps) {
  const [idSelected, setIdSelected] = useState<number | null>(null);
  const tableHeader = [
    "Nombre",
    "DNI",
    "Correo",
    ""
  ];
  const { 
    choferes,
    isLoading: isLoadingChoferes,
    isError: isErrorChoferes,
    execute: listarChoferes,
    setPagina,
    infoPaginacion,
  } = useFetchChoferes();

  return (
    <ContentSectionProcess
      isLoading={isLoadingChoferes}
      isError={isErrorChoferes}
      textError="Error al cargar los choferes"
      textButtonError="Reintentar"
      fetchData={() => listarChoferes(1)}
    >
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="p-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => listarChoferes(infoPaginacion.pagina_actual)}
          >
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

        <Table
          tableHeader={tableHeader}
          cantidadDatos={choferes.length}
        >
          {choferes.map((chofer) => (
            <tr
              key={chofer.idacceso}
              className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
            >
              {/* Nombre */}
              <td className="px-6 py-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-[#1f6feb]/15 p-2">
                    <Building2 className="w-5 h-5 text-[#1f6feb]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-medium text-sm text-white truncate">
                      {chofer.nombres}
                    </span>
                    <span className="block text-xs text-gray-400 truncate">
                      {chofer.estadoacceso}
                    </span>
                  </div>
                </div>
              </td>

              {/* DNI */}
              <td className="px-6 py-4">
                <div className="text-sm text-gray-300">
                  {chofer.dniuser}
                </div>
              </td>

              {/* Correo */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300 truncate">{chofer.correo ?? '-'}</span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  { idSelected === chofer.idacceso ? (
                    <button onClick={() => {
                      setIdSelected(null);
                      selectIdChofer(null);
                    }} className="hover:text-red-400">
                      <span className="text-red-500 flex flex-row gap-2">
                        <span>Eliminar</span>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        selectIdChofer(chofer.idacceso);
                        setIdSelected(chofer.idacceso);
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