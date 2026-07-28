import { useEffect, useState } from "react";
import ContentPage from "../../../components/layouts/ContentPage";
import InputText from "../../../components/ui/InputText";
import InputNumber from "../../../components/ui/InputNumber";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import InputSelect from "../../../components/ui/InputSelect";
import HeaderFormPage from "../../../components/layouts/HeaderFormPage";
import { useCreateCliente } from "../hooks/useCreateCliente";
import { useFetchBasicDataByDni } from "../../../hooks/useFetchBasicDataByDni";
import type { CreateCliente } from "../../../types/clientes.type";
import type { UserGender } from "../../../types/constantes.type";

interface FormCreateClienteProps {
  setShowFormCreate: (value: boolean) => void;
  setDniCliente?: (value: string) => void;
}

export default function FormCreateCliente({ setShowFormCreate }: FormCreateClienteProps) {
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
    numero: null,
    tipo: null,
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
    <ContentPage>
      {/* Header */}
      <HeaderFormPage
        title="Gestión de clientes"
        description="Registra un nuevo cliente en el sistema."
        setShowForm={setShowFormCreate}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mx-8 my-6">
        <div className="space-y-6">
          {/* Row 1: DNI y RUC */}
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

          {/* Row 3: Nombres, Apellidos Paterno y Apellido Materno */}
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

          {/* Row 4: Sexo y Edad */}
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
              defaultValue={formData.edad}
              label="Edad"
              simbol="años"
              onChange={(value) => setFormData(prev => ({ ...prev, edad: value }))}
              placeholder="Ingrese la edad del cliente"
            />
            <InputNumber
              defaultValue={parseInt(formData.numero ?? '000000000')}
              label="Número telefónico"
              simbol="celular"
              onChange={(value) => setFormData(prev => ({ ...prev, numero: value.toString() }))}
              placeholder="Ingrese el número telefónico del cliente"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <div className="flex flex-row gap-4 w-full justify-end">
            <div className="flex flex-row gap-4">
              <ButtonCancelForm
                handleCancel={() => setShowFormCreate(false)}
                isLoading={cargandoCreateCliente}
                textButton="Cancelar"
                color="red"
              />
              <ButtonSubmitForm
                handleSubmit={() => {
                  // Formateando los datos del estado 
                  // "formData" para que coinicidan 
                  // con la estructura del objeto 
                  // que el backend espera recibir para crear
                  // un nuevo cliente.
                  // esto es debido a que las propiedades
                  // con valor "null" no permite registrar
                  // un nuevo cliente, por lo que se omiten esas propiedades.
                  const formateandoDatos = {
                    nombre: formData.nombre,
                    apellidomaterno: formData.apellidomaterno,
                    apellidopaterno: formData.apellidopaterno,
                    dni: formData.dni,
                    numero: formData.numero,
                    edad: formData.edad,
                    sexo: formData.sexo,
                    correo: formData.correo,
                  };
                  registrarCliente(formateandoDatos as CreateCliente)
                  setShowFormCreate(false);
                }}
                isLoading={cargandoCreateCliente}
                isError={errorCreateCliente}
                textButton="Guardar Cambios"
                textError={messageCreateCliente || "Error al guardar los cambios"}
                color="blue"
              />
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  );
}