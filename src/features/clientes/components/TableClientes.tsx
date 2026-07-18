import Table from "../../../components/ui/Table";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import { useFetchClientes } from "../hooks/useFetchClientes";
import { Edit2 } from "lucide-react";

interface TableClientesProps {
  setShowFormUpdate: (value: boolean) => void;
  setDniCliente: (value: string) => void;
}

export default function TableClientes({ setShowFormUpdate, setDniCliente }: TableClientesProps) {
  const {
    clientes,
    isLoading: clientesLoading,
    isError: clientesError,
    execute: fetchClientes
  } = useFetchClientes();

  const tableHeader: string[] = [
    "Nr.",
    "Nombres",
    "Apellido Paterno",
    "Apellido Materno",
    "DNI",
    "cantidad de compras"
  ];

  return (
    <ContentSectionProcess
      isLoading={clientesLoading}
      isError={clientesError}
      textError="Error al cargar los clientes."
      textButtonError="Reintentar"
      fetchData={() => fetchClientes}
    >
      <div className="flex-1 overflow-auto p-2">
        <div className="p-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => fetchClientes()}
          >
            Recargar
          </button>
        </div>

        <Table tableHeader={tableHeader} cantidadDatos={clientes.length}>
          {clientes?.map((cliente, index) => (
            <tr key={index} className="hover:bg-gray-800/50 transition-colors">
              {/* NUMERO */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-400">{index}</span>
              </td>

              {/* Nombres */}
              <td className="px-6 py-4">
                <span className="font-medium text-sm text-white">
                  {cliente.nombres}
                </span>
              </td>

              {/* Apellido paterno */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">
                  {cliente.apellidopaterno}
                </span>
              </td>

              {/* Apellido materno */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">
                  {cliente.apellidomaterno}
                </span>
              </td>

              {/* DNI */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">
                  {cliente.dniuser}
                </span>
              </td>

              {/* RUC */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-300">
                  {cliente.cantenvios}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowFormUpdate(true);
                      setDniCliente(cliente.dniuser);
                    }}
                    className="p-2 hover:bg-[#21262d] rounded-lg transition-colors"
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
