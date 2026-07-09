import { useState } from 'react';
import { CalendarDays, Plus } from 'lucide-react';
import Table from '../../../components/ui/Table';
import ContentSectionProcess from '../../../components/layouts/ContentSectionProcess';
import { useFetchClientesSinCompras } from '../hooks/useFetchClientesSinCompras';

interface TableSelectClienteProps {
  selectIdCliente: (idCliente: number | null) => void;
  onChange: (idCliente: number | null) => void;
}

export default function TableSelectCliente({ selectIdCliente, onChange }: TableSelectClienteProps) {
  const [idSelected, setIdSelected] = useState<number | null>(null);
  const tableHeader = [
    "N°",
    "Nombres",
    "Apellido Paterno",
    "Apellido Materno",
    "DNI",
    "Número telefónico",
    "RUC"
  ];
  const { 
    clientes,
    isLoading: isLoadingClientes,
    isError: isErrorClientes,
    execute: obtenerClientes,
  } = useFetchClientesSinCompras();

  return (
    <ContentSectionProcess
      isLoading={isLoadingClientes}
      isError={isErrorClientes}
      textError="Error al cargar los clientes"
      textButtonError="Reintentar"
      fetchData={() => obtenerClientes()}
    >
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium text-white">
            Selecciona un cliente
          </h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => obtenerClientes()}
          >
            Recargar
          </button>
        </div>
        <Table
          tableHeader={tableHeader}
          cantidadDatos={clientes.length}
        >
          {clientes.map((cliente, index) => (
            <tr
              key={index}
              className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
            >
              <td className="px-6 py-4">
                <span className="font-medium text-sm text-white">
                  {index + 1}
                </span>
              </td>

              <td className="px-6 py-4">
                <span className="font-medium text-sm text-white">
                  {cliente.nombres}
                </span>
              </td>

              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">
                  {cliente.apellidopaterno}
                </span>
              </td>

              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">
                  {cliente.apellidomaterno}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  <span>{cliente.dniuser}</span>
                </div>
              </td>

              <td className="px-6 py-4">
                <span className="inline-flex rounded-full bg-[#1f6feb]/15 px-3 py-1 text-xs font-medium text-[#58a6ff] text-center">
                  {cliente.numero ?? 'sin número'}
                </span>
              </td>

              <td className="px-6 py-4">
                <span className="inline-flex rounded-full bg-[#1f6feb]/15 px-3 py-1 text-xs font-medium text-[#58a6ff] text-center">
                  {cliente.rucuser ?? 'sin ruc'}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  { idSelected === index + 1 ? (
                    <button onClick={() => {
                      setIdSelected(null);
                      selectIdCliente(null);
                      onChange(null);
                    }} className="hover:text-red-400">
                      <span className="text-red-500 flex flex-row gap-2">
                        <span>Eliminar</span>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        selectIdCliente(cliente.iduser);
                        setIdSelected(cliente.iduser);
                        onChange(cliente.iduser);
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