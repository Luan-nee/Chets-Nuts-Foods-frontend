import { useState } from "react";
import { Edit2, Eye, Plus, Users } from "lucide-react";
import ContentPageMain from "../components/layouts/ContentPageMain";
import Table from "../components/ui/table/Table";
import FormCreate from "../features/accesos/components/FormCreateAcceso";
import DetallesAcceso from "../features/accesos/components/DetallesAcceso";
import FormUpdate from "../features/accesos/components/FormUpdateAcceso";
import { useFetchAccesos } from "../features/accesos/hooks/useFetchAccesos";

export default function Trabajadores () {
  const [showDetallesAcceso, setShowDetallesAcceso] = useState<boolean>(false);
  const [showFormUpdate, setShowFormUpdate] = useState<boolean>(false);
  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [selectAccesoId, setSelectAccesoId] = useState<number | null>(null);

  const {
    accesos,
    isLoading: isLoadingAccesos,
    isError: isErrorAccesos,
    execute: recargarAccesos,
    setPagina,
    infoPaginacion,
  } = useFetchAccesos();
  
  return (
    <ContentPageMain>
      {
        showDetallesAcceso ? (
          <DetallesAcceso
            showFormUpdateAcceso={setShowFormUpdate}
            showDetallesAcceso={setShowDetallesAcceso}
            idAcceso={selectAccesoId!}
          />
        ) : showFormUpdate ? (
          <FormUpdate
            setShowFormUpdateEmpleado={setShowFormUpdate}
            idEmpleado={selectAccesoId!}
          />
        ) : showFormCreate ? (
          <FormCreate
            setShowFormCreateEmpleado={setShowFormCreate}
          />
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-gray-900 border-b border-gray-800 px-8 py-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-xl bg-blue-600/20 p-2 border border-blue-500/20">
                      <Users className="w-6 h-6 text-blue-300" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Gestión del personal</h2>
                </div>
                <p className="text-sm text-gray-400 max-w-3xl">
                  Administra los empleados registrados en el sistema, revisa sus datos y realiza actualizaciones cuando sea necesario.
                </p>
              </div>

              <button
                onClick={() => setShowFormCreate(true)}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                Nuevo empleado
              </button>
            </div>

            {/* Table */}
            <div className="p-4">
              <Table
                cantidadDatos={accesos.length}
                dataIsError={isErrorAccesos}
                dataIsLoading={isLoadingAccesos}
                reload={recargarAccesos}
                tableHeader={[
                  "CORREO ELECTRÓNICO",
                  "ESTADO",
                  "ROL",
                  "ESTADO DE DISPONIBILIDAD",
                  "DNI",
                  "NOMBRES",
                ]}
                changePage={setPagina}
                dataPagination={infoPaginacion}
              >
                {accesos?.map((acceso, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-800/50 transition-colors"
                  >
                    {/* Correo */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-sm text-white">
                          {acceso.correo}
                        </span>
                      </div>
                    </td>

                    {/* Estado */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-300">
                        {(acceso.estado) ? "Activo" : "Inactivo"}
                      </span>
                    </td>

                    {/* Rol (tipo de acceso) */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-300">{acceso.tipos}</span>
                    </td>

                    {/* Estado de acceso */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-300">{acceso.estadoacceso}</span>
                    </td>

                    {/* DNI del usuario */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-300">{acceso.dniuser}</span>
                    </td>

                    {/* Nombres del usuario */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-300">{acceso.nombres}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectAccesoId(acceso.idacceso);
                            setShowFormUpdate(true);
                          }}
                          className="p-2 hover:bg-[#21262d] rounded-lg transition-colors"
                          aria-label="Editar acceso"
                        >
                          <Edit2 className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => {
                            setShowDetallesAcceso(true);
                            setSelectAccesoId(acceso.idacceso);
                          }}
                          className="p-2 hover:bg-[#21262d] rounded-lg transition-colors"
                          aria-label="Ver detalles"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </>
        )
      }
    </ContentPageMain>
  );
}