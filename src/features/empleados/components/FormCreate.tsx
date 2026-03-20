import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import InputSelect from "../../../components/ui/InputSelect";
import ContentPage from "../../../components/layouts/ContentPage";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import type { CreateEmpleadoData } from "../types/empleado.type";
import { useFetchRoles } from "../../auth/hooks/useFetchRoles";
import { useCreateEmpleado } from "../hooks/useCreateEmpleado";
import Loading from "../../../components/ui/Loading";

interface FormCreateEmpleadoProps {
  setShowFormCreateEmpleado: (p: boolean) => void;
}

export default function FormCreate({ setShowFormCreateEmpleado }: FormCreateEmpleadoProps ) {
  const { data: roles, isLoading: cargandoRoles, isError: errorRoles, fetchData: recargarRoles } = useFetchRoles();
  const { isLoading: cargandoCreateEmpleado, isError: errorCreateEmpleado, refresh: crearEmpleado } = useCreateEmpleado();

  const [ formDate, setFormData ] = useState<CreateEmpleadoData>({
    nombres: '',
    apellidoMaterno: '',
    apellidoPaterno: '',
    correo: '',
    dni: '',
    rol: 0,
    contrasenia_temporal: '',
  });

  
  const handleInputChange = (
    field: string,    
    value: string | boolean | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ContentPage>
      {/* Header */}
      <div className="flex gap-4 border bg-gray-900 border-gray-700 rounded-lg px-6 py-4 mb-8">
        <button
          onClick={() => setShowFormCreateEmpleado(false)}
          className="p-2 bg-blue-700 hover:bg-blue-500 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Registra un nuevo empleado
          </h1>
          <p className="text-gray-400">
            Ingresa los datos del nuevo empleado para agregarlo al sistema. Asegúrate de proporcionar información precisa y completa.
          </p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mx-8 my-6">
        <div className="space-y-6">
          {/* Row 1: Nombres y DNI */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Nombres
              </label>
              <input
                type="text"
                value={formDate.nombres}
                onChange={(e) => handleInputChange("nombres", e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                DNI
              </label>
              <input
                type="text"
                value={formDate.dni}
                onChange={(e) => handleInputChange("dni", e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Apellidos */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Apellido Paterno
              </label>
              <input
                type="text"
                value={formDate.apellidoPaterno}
                onChange={(e) => handleInputChange("apellidoPaterno", e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Apellido Materno
              </label>
              <input
                type="text"
                value={formDate.apellidoMaterno}
                onChange={(e) => handleInputChange("apellidoMaterno", e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Correo y Rol */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={formDate.correo}
                onChange={(e) => handleInputChange("correo", e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Rol
              </label>
              {
                cargandoRoles ? (
                  <div className="flex justify-center items-center py-2">
                    <Loading w={6} h={6} color="blue" />
                  </div>
                ) : errorRoles ? (
                  <div className="flex justify-center items-center py-2">
                    <p className="text-red-500">Error al cargar los roles.</p>
                    {/* agrega un botón para reintentar la carga */}
                    <button
                      className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
                      onClick={recargarRoles}
                    >
                      Reintentar
                    </button>
                  </div>
                ) : roles === null || roles.length === 0 ? (
                  <div>No hay roles registrados en el sistema.</div>
                ) : (
                  <div className="flex flex-row gap-2">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                      onClick={recargarRoles}
                    >
                      Recargar
                    </button>
                    <InputSelect
                      inputName="tipoEst"
                      placeholder="Seleccione el tipo de establecimiento"
                      options={roles ? roles.map(te => ({ label: te.rol, value: te.id })) : []}
                      handleInputChange={handleInputChange}
                      valueSelect={formDate.rol}
                    />
                  </div>
                )
              }
            </div>
          </div>

          {/* Row 4: Contraseña */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Contraseña temporal
              </label>
              <input
                type="text"
                value={formDate.dni+formDate.nombres[0]?.toUpperCase()+formDate.apellidoPaterno[0]?.toUpperCase()+formDate.apellidoMaterno[0]?.toUpperCase()}
                onChange={(e) => handleInputChange("contraseniaTemporal", e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <div className="flex flex-row gap-4 w-full justify-end">
            <div className="flex flex-row gap-4">
              <ButtonCancelForm
                handleCancel={() => setShowFormCreateEmpleado(false)}
                isLoading={cargandoCreateEmpleado}
                textButton="Cancelar"
                color="red"
              />
              <ButtonSubmitForm
                handleSubmit={() => {
                  crearEmpleado(formDate);
                  console.log("Datos del nuevo empleado: ", formDate);
                }}
                isLoading={cargandoCreateEmpleado}
                isError={errorCreateEmpleado}
                textButton="Guardar Cambios"
                textError="Error al guardar los cambios"
                color="blue"
              />
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  )
}