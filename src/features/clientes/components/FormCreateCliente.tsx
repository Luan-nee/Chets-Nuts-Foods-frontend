import { useEffect, useState } from "react";
import { User2Icon } from "lucide-react";
import ContentForm from "../../../components/layouts/ContentForm";
import InputText from "../../../components/ui/InputText";
import InputNumber from "../../../components/ui/InputNumber";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import InputSelect from "../../../components/ui/InputSelect";
import { useCreateCliente } from "../hooks/useCreateCliente";
import { useFetchBasicDataByDni } from "../../../hooks/useFetchBasicDataByDni";
import { tiposPersona } from "../../../config/constantes";
import type { CreateCliente } from "../../../types/clientes.type";
import type { UserGender, UserType } from "../../../types/constantes.type";

interface FormCreateClienteProps {
  setShowFormCreate: (value: boolean) => void;
  setDniCliente?: (value: string) => void;
  onClienteCreado: () => Promise<void> | void;
}

export default function FormCreateCliente({ 
  setShowFormCreate, 
  onClienteCreado 
}: FormCreateClienteProps) {
  const {
    isLoading: cargandoCreateCliente,
    isError: errorCreateCliente,
    message: messageCreateCliente,
    execute: registrarCliente,
  } = useCreateCliente();
  const [formData, setFormData] = useState<CreateCliente>({
    nombre: '',
    apellidomaterno: '',
    apellidopaterno: '',
    dni: '',
    edad: 0,
    sexo: 'MASCULINO',
    numero: '',
    correo: '',
  });

  const dniBusqueda = formData.dni.trim().length === 8 ? formData.dni.trim() : "";

  const {
    basicData,
  } = useFetchBasicDataByDni(dniBusqueda);

  useEffect(() => {
    if (basicData) {
      setFormData(prev => ({
        ...prev,
        nombre: basicData.nombres ?? '',
        apellidopaterno: basicData.apellido_paterno ?? '',
        apellidomaterno: basicData.apellido_materno ?? '',
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

  return (
    <ContentForm>
      {/* Header */}
			<div className="flex flex-row gap-2">
				<div className="rounded-xl bg-blue-500/15 p-3 border border-blue-500/20">
					<User2Icon className="w-6 h-6 text-blue-400" />
				</div>
				<div className="flex flex-col">
					<h2 className="text-xl font-semibold text-white">Datos del cliente</h2>
					<p className="text-sm text-gray-400">Registra los datos del cliente para tenerlo en la base de datos.</p>
				</div>
			</div>

      {/* Row 1: DNI, RUC y Correo */}
      <div className="grid grid-cols-3 gap-6">
        <InputText
          label="DNI"
          value={formData.dni}
          htmlForm="dni"
          onChange={(value) => setFormData(prev => ({ ...prev, dni: value }))}
        />
        <InputText
          label="RUC (opcional)"
          value={formData.ruc ?? ''}
          htmlForm="ruc"
          onChange={(value) => setFormData(prev => ({ ...prev, ruc: value }))}
        />
        <InputText
          label="Correo electrónico"
          value={formData.correo ?? ''}
          htmlForm="correo electrónico"
          onChange={(value) => setFormData(prev => ({ ...prev, correo: value }))}
        />
      </div>

      {/* Row 2: Nombres, Apellidos Paterno y Apellido Materno */}
      <div className="grid grid-cols-3 gap-6">
        <InputText
          label="Nombres"
          value={formData.nombre}
          htmlForm="nombres"
          onChange={(value) => setFormData(prev => ({ ...prev, nombre: value }))}
        />
        <InputText
          label="Apellido paterno"
          value={formData.apellidopaterno}
          htmlForm="apellido paterno"
          onChange={(value) => setFormData(prev => ({ ...prev, apellidopaterno: value }))}
        />
        <InputText
          label="Apellido materno"
          value={formData.apellidomaterno}
          htmlForm="apellido materno"
          onChange={(value) => setFormData(prev => ({ ...prev, apellidomaterno: value }))}
        />
      </div>

      {/* Row 3: Sexo, Edad y numero telefónico */}
      <div className="grid grid-cols-3 gap-6">
        <InputSelect
          label="Género"
          options={[
            { value: "MASCULINO", label: "MASCULINO" },
            { value: "FEMENINO", label: "FEMENINO" }
          ]}
          placeholder="Selecciona el género del cliente"
          onSelect={(value) => setFormData(prev => ({ ...prev, sexo: value as UserGender }))}
        />
        <InputNumber
          value={formData.edad}
          label="Edad"
          simbol="años"
          onChange={(value) => setFormData(prev => ({ ...prev, edad: value }))}
          placeholder="Ingrese la edad del cliente"
        />
        <InputNumber
          value={parseInt(formData.numero ?? '000000000')}
          label="Número telefónico"
          simbol="celular"
          onChange={(value) => setFormData(prev => ({ ...prev, numero: value.toString() }))}
          placeholder="Número telefónico del cliente"
        />
      </div>

      {/* Row 4: Tipo de persona */}
      <div className="grid grid-cols-3 gap-6">
        <InputSelect
          label="Tipo"
          valueSelected={formData.tipo}
          options={tiposPersona}
          onSelect={(value) => setFormData(prev => ({ ...prev, tipo: value as UserType }))}
          placeholder="seleccione el tipo de persona"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <ButtonCancelForm
          handleCancel={() => setShowFormCreate(false)}
          isLoading={cargandoCreateCliente}
          textButton="Cancelar"
          color="red"
        />
        <ButtonSubmitForm
          handleSubmit={async () => {
            console.log("Datos del cliente registrados:", formData);
            const wasCreated = await registrarCliente(formData);
            if (wasCreated) {
              await onClienteCreado();
              setShowFormCreate(false);
            }
          }}
          isLoading={cargandoCreateCliente}
          isError={errorCreateCliente}
          textButton="Guardar Cambios"
          textError={messageCreateCliente || "Error al guardar los cambios"}
          color="blue"
        />
      </div>
    </ContentForm>
  );
}