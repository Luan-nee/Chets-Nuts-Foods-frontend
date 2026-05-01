import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import InputSelectTest from "../../../components/ui/InputSelect";
import InputPassword from "../../../components/ui/InputPassword";
import InputText from "../../../components/ui/InputText";
import ContentPage from "../../../components/layouts/ContentPage";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import type { CreateEmpleadoData, empleadoRol, sexoEmpleado, tipoPersona } from "../types/empleado.type";
import { useFetchRoles } from "../../auth/hooks/useFetchRoles";
import { useCreateEmpleado } from "../hooks/useCreateEmpleado";
import Loading from "../../../components/ui/Loading";
import { InfoSuccess } from "../../../components/messages/InfoSuccess";
import { InfoError } from "../../../components/messages/InfoError";

interface FormCreateEmpleadoProps {
  setShowFormCreateEmpleado: (p: boolean) => void;
}

export default function FormCreate({ setShowFormCreateEmpleado }: FormCreateEmpleadoProps ) {
  const { data: roles, isLoading: cargandoRoles, isError: errorRoles, fetchData: recargarRoles } = useFetchRoles();
  const { isLoading: cargandoCreateEmpleado, errorMessage, successMessage, refresh: crearEmpleado } = useCreateEmpleado();

  const [ formData, setFormData ] = useState<CreateEmpleadoData>({
    password: '',
    tipos: 'ADMIN',
    correo: '',
    nombre: '',
    apellidomaterno: '',
    apellidopaterno: '',
    dni: '',
    numero: '',
    edad: 0,
    sexo: 'MASCULINO',
    tipo: 'NATURAL',
    numeroLicenciaConducir: '',
    ruc: '',
  });

  // Generar contraseña automáticamente
  useEffect(() => {
    if (formData.dni && formData.nombre && formData.apellidopaterno && formData.apellidomaterno) {
      const generatedPassword = (formData.dni || '') +
        (formData.nombre[0]?.toUpperCase() || '') +
        (formData.apellidopaterno[0]?.toUpperCase() || '') +
        (formData.apellidomaterno[0]?.toUpperCase() || '');
      setFormData(prev => ({
        ...prev,
        password: generatedPassword
      }));
    }
  }, [
    formData.dni,
    formData.nombre,
    formData.apellidopaterno,
    formData.apellidomaterno
  ]);

  const handleSubmit = async () => {
    // Validar campos requeridos
    if (!formData.nombre || !formData.apellidopaterno || !formData.apellidomaterno || 
        !formData.dni || !formData.correo || !formData.numero || formData.edad === 0) {
      InfoError('Validación', 'Por favor completa todos los campos requeridos');
      return;
    }

    // Validar campos específicos para CHOFER
    if (formData.tipos === 'CHOFER' && (!formData.numeroLicenciaConducir || !formData.ruc)) {
      InfoError('Validación', 'Para un CHOFER es obligatorio el número de licencia y RUC');
      return;
    }

    const response = await crearEmpleado(formData);
    if (response && response.status === 'success') {
      InfoSuccess('Éxito', response.message || 'Empleado creado exitosamente');
      setShowFormCreateEmpleado(false);
    } else if (response && response.status === 'error') {
      InfoError('Error', response.message || 'Error al crear el empleado');
    } else if (errorMessage) {
      InfoError('Error', errorMessage);
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
            Registra un nuevo empleado
          </h1>
          <p className="text-gray-400">
            Ingresa los datos del nuevo empleado para agregarlo al sistema. Asegúrate de proporcionar información precisa y completa.
          </p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mx-8 my-6">
        <div className="space-y-6">
          {/* Row 1: Nombre y DNI */}
          <div className="grid grid-cols-2 gap-6">
            <InputText
              label="Nombre"
              value={formData.nombre}
              htmlForm="nombre"
              onChange={(value) => setFormData(prev => ({ ...prev, nombre: value }))}
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
              value={formData.apellidopaterno}
              htmlForm="apellidopaterno"
              onChange={(value) => setFormData(prev => ({ ...prev, apellidopaterno: value }))}
            />
            <InputText
              label="Apellido Materno"
              value={formData.apellidomaterno}
              htmlForm="apellidomaterno"
              onChange={(value) => setFormData(prev => ({ ...prev, apellidomaterno: value }))}
            />
          </div>

          {/* Row 3: Correo y Teléfono */}
          <div className="grid grid-cols-2 gap-6">
            <InputText
              label="Correo electrónico"
              value={formData.correo}
              htmlForm="correo"
              onChange={(value) => setFormData(prev => ({ ...prev, correo: value }))}
            />
            <InputText
              label="Número de teléfono"
              value={formData.numero}
              htmlForm="numero"
              onChange={(value) => setFormData(prev => ({ ...prev, numero: value }))}
            />
          </div>

          {/* Row 4: Edad, Sexo, Tipo */}
          <div className="grid grid-cols-3 gap-6">
            <InputText
              label="Edad"
              value={formData.edad.toString()}
              htmlForm="edad"
              onChange={(value) => setFormData(prev => ({ ...prev, edad: parseInt(value) || 0 }))}
            />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sexo</label>
              <select
                value={formData.sexo}
                onChange={(e) => setFormData(prev => ({ ...prev, sexo: e.target.value as sexoEmpleado }))}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="MASCULINO">Masculino</option>
                <option value="FEMENINO">Femenino</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Persona</label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value as tipoPersona }))}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="NATURAL">Natural</option>
                <option value="JURIDICO">Jurídico</option>
              </select>
            </div>
          </div>

          {/* Row 5: Rol */}
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
                <InputSelectTest
                  label="Rol del empleado"
                  options={roles ? roles.map(te => ({ label: te.rol, value: te.rol })) : []}
                  placeholder="Seleccione el rol del empleado"
                  onSelect={(value) => setFormData(prev => ({ ...prev, tipos: value as empleadoRol }))}
                />
              )
            }
          </div>

          {/* Row 6: Número de Licencia y RUC (solo si es CHOFER) */}
          {formData.tipos === 'CHOFER' && (
            <div className="grid grid-cols-2 gap-6">
              <InputText
                label="Número de Licencia de Conducir"
                value={formData.numeroLicenciaConducir || ''}
                htmlForm="numeroLicencia"
                onChange={(value) => setFormData(prev => ({ ...prev, numeroLicenciaConducir: value }))}
              />
              <InputText
                label="RUC"
                value={formData.ruc || ''}
                htmlForm="ruc"
                onChange={(value) => setFormData(prev => ({ ...prev, ruc: value }))}
              />
            </div>
          )}

          {/* Row 7: Contraseña (solo lectura) */}
          <InputPassword
            label="Contraseña generada automáticamente"
            value={formData.password}
            htmlForm="password"
            onChange={() => {}} // Solo lectura
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
                handleSubmit={handleSubmit}
                isLoading={cargandoCreateEmpleado}
                isError={!!errorMessage}
                textButton="Guardar Cambios"
                textError={errorMessage || "Error al guardar los cambios"}
                color="blue"
              />
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  )
}