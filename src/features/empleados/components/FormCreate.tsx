import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import InputSelectTest from "../../../components/ui/InputSelect";
import InputPassword from "../../../components/ui/InputPassword";
import InputText from "../../../components/ui/InputText";
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

  const [ formData, setFormData ] = useState<CreateEmpleadoData>({
    nombres: '',
    apellidoMaterno: '',
    apellidoPaterno: '',
    correo: '',
    dni: '',
    rol: 0,
    contrasenia_temporal: '',
  });
  
  useEffect(() => {
    if (
      formData.dni && 
      formData.nombres && 
      formData.apellidoPaterno && 
      formData.apellidoMaterno
    ) {
      setFormData(prev => ({
        ...prev,
        contrasenia_temporal: (formData.dni || '') +
          (formData.nombres[0]?.toUpperCase() || '') +
          (formData.apellidoPaterno[0]?.toUpperCase() || '') +
          (formData.apellidoMaterno[0]?.toUpperCase() || '')
      }));
    }
  }, [
    formData.dni, 
    formData.nombres, 
    formData.apellidoPaterno, 
    formData.apellidoMaterno
  ]);

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
            <InputText
              label="Nombres"
              value={formData.nombres}
              htmlForm="nombres"
              onChange={(value) => setFormData(prev => ({ ...prev, nombres: value }))}
            />
            <InputText
              label="DNI"
              value={formData.dni}
              htmlForm="dni"
              onChange={(value) => setFormData(prev => ({ ...prev, dni: value }))}
            />
          </div>

          {/* Row 2: Apellidos */}
          <div className="grid grid-cols-2 gap-6">
            <InputText
              label="Apellido Paterno"
              value={formData.apellidoPaterno}
              htmlForm="apellidoPaterno"
              onChange={(value) => setFormData(prev => ({ ...prev, apellidoPaterno: value }))}
            />
            <InputText
              label="Apellido Materno"
              value={formData.apellidoMaterno}
              htmlForm="apellidoMaterno"
              onChange={(value) => setFormData(prev => ({ ...prev, apellidoMaterno: value }))}
            />
          </div>

          {/* Row 3: Correo y Rol */}
          <div className="grid grid-cols-2 gap-6">
            <InputText
              label="Correo electrónico"
              value={formData.correo}
              htmlForm="correo"
              onChange={(value) => setFormData(prev => ({ ...prev, correo: value }))}
            />

            <div>
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
                  <InputSelectTest
                    label="Rol del empleado"
                    options={roles ? roles.map(te => ({ label: te.rol, value: te.id })) : []}
                    placeholder="Seleccione el rol del empleado"
                    onSelect={(value) => setFormData(prev => ({ ...prev, rol: value as number }))}
                  />
                )
              }
            </div>
          </div>

          {/* Row 4: Contraseña */}
          <InputPassword
            label="Contraseña"
            value={
              (formData.dni || '') +
              (formData.nombres[0]?.toUpperCase() || '') +
              (formData.apellidoPaterno[0]?.toUpperCase() || '') +
              (formData.apellidoMaterno[0]?.toUpperCase() || '')
            }
            htmlForm="contrasenia"
            onChange={(value) => setFormData(prev => ({ ...prev, contrasenia_temporal: value }))}
          />
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
                  crearEmpleado(formData);
                  console.log("Datos del nuevo empleado: ", formData);
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