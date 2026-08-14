import { Edit2, Plus, User2Icon } from "lucide-react";
import { useState } from "react";
import ContentPageMain from "../components/layouts/ContentPageMain";
import Table from "../components/ui/table/Table"
import FormCreateCliente from "../features/clientes/components/FormCreateCliente";
import FormUpdateCliente from "../features/clientes/components/FormUpdateCliente";
import { useFetchClientes } from "../features/clientes/hooks/useFetchClientes";

export default function Clientes() {
  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [showFormUpdate, setShowFormUpdate] = useState<boolean>(false);
  const [dniCliente, setDniCliente] = useState<string>("");

  const {
    clientes,
    isLoading: isLoadingClientes,
    isError: isErrorClientes,
    execute: recargarClientes,
  } = useFetchClientes();

  return (
    <ContentPageMain>
      { showFormCreate ? (
        <FormCreateCliente
          setShowFormCreate={setShowFormCreate}
          setDniCliente={setDniCliente}
          onClienteCreado={recargarClientes}
        />
      ) : showFormUpdate ? (
        <FormUpdateCliente
          setShowFormUpdate={setShowFormUpdate}
          dniCliente={dniCliente}
          onClienteActualizado={recargarClientes}
        />
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-gray-900 border-b border-gray-800 px-8 py-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-xl bg-blue-600/20 p-2 border border-blue-500/20">
                  <User2Icon className="w-6 h-6 text-blue-300" />
                </div>
                <h2 className="text-3xl font-bold text-white">Gestión de clientes</h2>
              </div>
              <p className="text-sm text-gray-400 max-w-3xl">
                Gestiona la información de tus clientes
              </p>
            </div>

            <button
              onClick={() => setShowFormCreate(true)}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Nuevo cliente
            </button>
          </div>

          <div className="p-4">
            <Table
              cantidadDatos={clientes.length}
              dataIsError={isErrorClientes}
              dataIsLoading={isLoadingClientes}
              reload={recargarClientes}
              tableHeader={[
                "N°",
                "NOMBRES",
                "APELLIDO PATERNO",
                "APELLIDO MATERNO",
                "DNI",
                "RUC",
                ""
              ]}
            >
              {clientes?.map((cliente, index) => (
                <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                  {/* NUMERO */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{index + 1}</span>
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
                    <span className="text-sm font-bold text-gray-300">
                      {cliente.dniuser}
                    </span>
                  </td>

                  {/* RUC */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-300">
                      {cliente.rucuser || "-"}
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
        </>
      )}
    </ContentPageMain>
  );
}