import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import InputPassword from "../../../components/ui/InputPassword";
import InputText from "../../../components/ui/InputText";
import ContentPage from "../../../components/layouts/ContentPage";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import InputSelect from "../../../components/ui/InputSelect";
import type { 
  UserRole as empleadoRol 
} from "../../../types/constantes.type";
import type { UpdateAcceso } from "../../../types/accesos.type";
import { useFetchRoles } from "../hooks/useFetchRoles";
import { useUpdateAcceso } from "../hooks/useUpdateAcceso";
import { InfoSuccess } from "../../../components/messages/InfoSuccess";
import { InfoError } from "../../../components/messages/InfoError";
import Loading from "../../../components/ui/Loading";

interface FormCreateEmpleadoProps {
  idEmpleado: number;
  setShowFormCreateEmpleado: (p: boolean) => void;
}

export default function FormCreate({ idEmpleado, setShowFormCreateEmpleado }: FormCreateEmpleadoProps ) {
  const {
    roles, 
    isLoading: cargandoRoles, 
    isError: errorRoles,
    execute: recargarRoles 
  } = useFetchRoles();
  const { 
    isLoading: cargandoActualizarAcceso, 
    message: messageUpdateAcceso, 
    execute: updateAcceso 
  } = useUpdateAcceso();

  const [ formData, setFormData ] = useState<UpdateAcceso>({
    idacceso: idEmpleado,
    estado: false,
    correo: '',
    password: '',
    tipos: 'ADMIN'
  });

  const handleSubmit = async () => {
    // Validar campos requeridos
    if (!formData.idacceso || !formData.estado || !formData.correo || 
        !formData.password || !formData.tipos) {
      InfoError('Validación', 'Por favor completa todos los campos requeridos');
      return;
    }

    const response = await updateAcceso(formData);
    if (response && response.status === 'success') {
      InfoSuccess('Éxito', response.message || 'Acceso actualizado exitosamente');
      setShowFormCreateEmpleado(false);
    } else if (response && response.status === 'error') {
      InfoError('Error', response.message || 'Error al actualizar el acceso');
    } else if (messageUpdateAcceso) {
      InfoError('Error', messageUpdateAcceso);
    }
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
            Actualizar las credenciales de acceso del empleado
          </h1>
          <p className="text-gray-400">
            Ingresa nuevos datos del empleado para actualizar sus credenciales de acceso. Asegúrate de proporcionar información precisa y completa.
          </p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mx-8 my-6">
        <div className="space-y-6">

          {/* Row 1: Correo */}
          <div className="grid grid-cols-1 gap-6">
            <InputText
              label="Correo electrónico"
              value={formData.correo ?? ''}
              htmlForm="correo"
              onChange={(value) => setFormData(prev => ({ ...prev, correo: value }))}
            />
          </div>

          {/* Row 2: Tip*/}
          <div>
            {
              cargandoRoles ? (
                <div className="flex justify-center items-center py-2">
                  <Loading w={6} h={6} color="blue" />
                </div>
              ) : errorRoles ? (
                <div className="flex justify-center items-center py-2">
                  <p className="text-red-500">Error al cargar los roles.</p>
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
                <InputSelect 
                  label="Tipo de acceso"
                  options={roles.map(te => ({ label: te.rol, value: te.rol }))}
                  placeholder="Seleccione el tipo de empleado"
                  onSelect={(value) => setFormData(prev => ({ ...prev, tipos: value as empleadoRol }))}
                  valueSelected={formData.tipos}
                />
              )
            }
          </div>

          {/* Row 3: Contraseña (solo lectura) */}
          <InputPassword
            label="Contraseña generada automáticamente"
            value={formData.password ?? ''}
            htmlForm="password"
            onChange={(e) => {
              setFormData(prev => ({ ...prev, password: e }));
            }} 
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <div className="flex flex-row gap-4 w-full justify-end">
            <div className="flex flex-row gap-4">
              <ButtonCancelForm
                handleCancel={() => setShowFormCreateEmpleado(false)}
                isLoading={cargandoActualizarAcceso}
                textButton="Cancelar"
                color="red"
              />
              <ButtonSubmitForm
                handleSubmit={handleSubmit}
                isLoading={cargandoActualizarAcceso}
                isError={!!messageUpdateAcceso}
                textButton="Guardar Cambios"
                textError={messageUpdateAcceso || "Error al guardar los cambios"}
                color="blue"
              />
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  )
}