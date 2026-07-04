import { useState } from 'react';
import { CalendarDays, Hash, Plus } from 'lucide-react';
import Table from '../../../components/ui/Table';
import ContentSectionProcess from '../../../components/layouts/ContentSectionProcess';
import { useFetchClientes } from '../hooks/useFetchClientes';

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
    "Cant. envíos",
    ""
  ];
  const { 
    clientes,
    isLoading: isLoadingClientes,
    isError: isErrorClientes,
    execute: obtenerClientes,
  } = useFetchClientes();

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
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-[#1f6feb]/15 p-2">
                    <Hash className="w-5 h-5 text-[#1f6feb]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-medium text-sm text-white truncate">
                      {index + 1}
                    </span>
                    <span className="block text-xs text-gray-400 truncate">
                      Cliente registrado
                    </span>
                  </div>
                </div>
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
                <span className="inline-flex rounded-full bg-[#1f6feb]/15 px-3 py-1 text-xs font-medium text-[#58a6ff]">
                  {cliente.cantenvios}
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
                        selectIdCliente(index + 1);
                        setIdSelected(index + 1);
                        onChange(index + 1);
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