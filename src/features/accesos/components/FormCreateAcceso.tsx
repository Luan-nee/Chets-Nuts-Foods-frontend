import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import ContentForm from "../../../components/layouts/ContentForm";
import InputSelect from "../../../components/ui/InputSelect";
import InputPassword from "../../../components/ui/InputPassword";
import InputText from "../../../components/ui/InputText";
import InputPhoneNumber from "../../../components/ui/InputPhoneNumber";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import { sexos, tiposPersona } from "../../../config/constantes";
import { useFetchBasicDataByDni } from "../../../hooks/useFetchBasicDataByDni";
import type {
  UserGender as sexoEmpleado,
  UserType as tipoPersona,
  UserRole as empleadoRol
} from "../../../types/constantes.type";
import type { CreateAcceso } from "../../../types/accesos.type";
import { useFetchRoles } from "../hooks/useFetchRoles";
import { useCreateAcceso } from "../hooks/useCreateAcceso";
import { InfoSuccess } from "../../../components/messages/InfoSuccess";
import { InfoError } from "../../../components/messages/InfoError";

interface FormCreateEmpleadoProps {
  setShowFormCreateEmpleado: (p: boolean) => void;
}

export default function FormCreate({ setShowFormCreateEmpleado }: FormCreateEmpleadoProps) {
  const {
    roles,
    isLoading: cargandoRoles,
    isError: errorRoles,
    execute: recargarRoles
  } = useFetchRoles();
  const {
    isLoading: cargandoCreateEmpleado,
    message: messageCreateAcceso,
    execute: crearAcceso
  } = useCreateAcceso();

  const [formData, setFormData] = useState<CreateAcceso>({
    password: '',
    tipos: 'ADMIN',
    correo: '',
    nombre: '',
    apellidomaterno: '',
    apellidopaterno: '',
    dni: '',
    edad: 0,
    sexo: 'MASCULINO',
    numero: '',
    tipo: 'NATURAL'
  });

  const dniBusqueda = formData.dni.trim().length === 8 ? formData.dni.trim() : "";

  const {
    basicData
  } = useFetchBasicDataByDni(dniBusqueda);

  useEffect(() => {
    if (basicData) {
      setFormData(prev => ({
        ...prev,
        nombre: basicData.nombres ?? '',
        apellidopaterno: basicData.apellido_paterno ?? '',
        apellidomaterno: basicData.apellido_materno ?? '',
        edad: basicData.edad ?? 0,
        sexo: basicData.sexo ?? "MASCULINO"
      }));
      return;
    }

    if (!dniBusqueda) {
      setFormData(prev => ({
        ...prev,
        nombre: '',
        apellidopaterno: '',
        apellidomaterno: ''
      }));
    }
  }, [basicData, dniBusqueda]);

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

    const response = await crearAcceso(formData);
    if (response && response.status === 'success') {
      InfoSuccess('Éxito', response.message || 'Acceso creado exitosamente');
      setShowFormCreateEmpleado(false);
    } else if (response && response.status === 'error') {
      InfoError('Error', response.message || 'Error al crear el acceso');
    } else if (messageCreateAcceso) {
      InfoError('Error', messageCreateAcceso);
    }
  };

  return (
    <ContentForm>
      {/* Header */}
      <div className="flex flex-row gap-2">
        <div className="rounded-xl bg-blue-500/15 p-3 border border-blue-500/20">
          <Users className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-white">Registro de nuevo empleado</h2>
          <p className="text-sm text-gray-400">Ingresa los datos del nuevo empleado para agregarlo al sistema.</p>
        </div>
      </div>

      {/* Row 1: Nombre y DNI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputText
          label="DNI"
          value={formData.dni}
          htmlForm="dni"
          onChange={(value) => setFormData((prev) => ({ ...prev, dni: value }))}
        />
        <InputText
          label="Nombre"
          value={formData.nombre}
          htmlForm="nombre"
          onChange={(value) => setFormData((prev) => ({ ...prev, nombre: value }))}
        />
      </div>

      {/* Row 2: Apellidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputText
          label="Apellido Paterno"
          value={formData.apellidopaterno}
          htmlForm="apellidopaterno"
          onChange={(value) => setFormData((prev) => ({ ...prev, apellidopaterno: value }))}
        />
        <InputText
          label="Apellido Materno"
          value={formData.apellidomaterno}
          htmlForm="apellidomaterno"
          onChange={(value) => setFormData((prev) => ({ ...prev, apellidomaterno: value }))}
        />
      </div>

      {/* Row 3: Correo y Teléfono */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputText
          label="Correo electrónico"
          value={formData.correo}
          htmlForm="correo"
          onChange={(value) => setFormData((prev) => ({ ...prev, correo: value }))}
        />
        <InputText
          label="Edad"
          value={formData.edad.toString()}
          htmlForm="edad"
          onChange={(value) => setFormData((prev) => ({ ...prev, edad: parseInt(value) || 0 }))}
        />
      </div>

      {/* Row 4: Edad, Sexo, Tipo */}
      <div className="grid grid-cols-3 gap-6">
        <InputPhoneNumber
          label="Número de teléfono"
          defaultValue={0}
          placeholder="Ingrese el número de teléfono"
          onChange={(value) => setFormData((prev) => ({ ...prev, numero: value.toString() }))}
        />
        <InputSelect
          label="Sexo"
          options={sexos}
          placeholder="Seleccione el sexo del empleado"
          onSelect={(value) => setFormData((prev) => ({ ...prev, sexo: value as sexoEmpleado }))}
        />
        <InputSelect
          label="Tipo de Persona"
          options={tiposPersona}
          placeholder="Seleccione el tipo de persona"
          onSelect={(value) => setFormData((prev) => ({ ...prev, tipo: value as tipoPersona }))}
        />
      </div>

      {/* Row 5: Rol y Contraseña temporal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentSectionProcess
          isLoading={cargandoRoles}
          isError={errorRoles}
          textError="Error al cargar los roles"
          textButtonError="Reintentar"
          fetchData={recargarRoles}
        >
          <InputSelect
            label="Rol del empleado"
            options={roles ? roles.map((te) => ({ label: te.rol, value: te.rol })) : []}
            placeholder="Seleccione el rol del empleado"
            onSelect={(value) => setFormData((prev) => ({ ...prev, tipos: value as empleadoRol }))}
          />
        </ContentSectionProcess>

        <InputPassword
          label="Contraseña generada automáticamente"
          value={formData.password}
          htmlForm="password"
          onChange={() => { }} // Solo lectura
        />
      </div>

      {/* Row 6: Número de Licencia y RUC (solo si es CHOFER) */}
      {formData.tipos === 'CHOFER' && (
        <div className="grid grid-cols-2 gap-6">
          <InputText
            label="Número de Licencia de Conducir"
            value={formData.numeroLicenciaConducir || ''}
            htmlForm="numeroLicencia"
            onChange={(value) => setFormData((prev) => ({ ...prev, numeroLicenciaConducir: value }))}
          />
          <InputText
            label="RUC"
            value={formData.ruc || ''}
            htmlForm="ruc"
            onChange={(value) => setFormData((prev) => ({ ...prev, ruc: value }))}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <ButtonCancelForm
          handleCancel={() => setShowFormCreateEmpleado(false)}
          isLoading={cargandoCreateEmpleado}
          textButton="Cancelar"
          color="red"
        />
        <ButtonSubmitForm
          handleSubmit={handleSubmit}
          isLoading={cargandoCreateEmpleado}
          isError={!!messageCreateAcceso}
          textButton="Guardar Cambios"
          textError={messageCreateAcceso || "Error al guardar los cambios"}
          color="blue"
        />
      </div>
    </ContentForm>
  )
}