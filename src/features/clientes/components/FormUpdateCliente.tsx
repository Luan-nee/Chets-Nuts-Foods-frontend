import { useState, useEffect } from "react";
import ContentPage from "../../../components/layouts/ContentPage";
import InputText from "../../../components/ui/InputText";
import InputNumber from "../../../components/ui/InputNumber";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import InputSelect from "../../../components/ui/InputSelect";
import HeaderFormPage from "../../../components/layouts/HeaderFormPage";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import { useUpdateCliente } from "../hooks/useUpdateCliente";
import { useFetchClienteByDNI } from "../hooks/useFetchClienteByDNI";
import { tiposPersona } from "../../../config/constantes";
import type { UpdateCliente } from "../../../types/clientes.type";
import type { UserType } from "../../../types/constantes.type";

interface FormUpdateClienteProps {
  setShowFormUpdate: (value: boolean) => void;
  dniCliente: string;
}

export default function FormCreateCliente ({ setShowFormUpdate, dniCliente }: FormUpdateClienteProps) {
  const {
    cliente,
    isLoading: cargandoCliente,
    isError: errorCliente,
    execute: obtenerCliente,
  } = useFetchClienteByDNI(dniCliente);

  const {
    execute: registrarCliente,
    isLoading: cargandoCreateCliente,
    isError: errorCreateCliente,
  } = useUpdateCliente();

  const [formData, setFormData] = useState<UpdateCliente>({
    iduser: 0,
    nombre: '',
    apellidomaterno: '',
    apellidopaterno: '',
    ruc: '',
    numero: '',
    edad: 0,
    dni: '',
    tipo: 'NATURAL',
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        iduser: cliente.iduser,
        nombre: cliente.nombres,
        apellidomaterno: cliente.apellidomaterno,
        apellidopaterno: cliente.apellidopaterno,
        ruc: cliente.rucuser ?? '',
        numero: cliente.numero,
        edad: cliente.edad,
        dni: cliente.dniuser,
        tipo: cliente.tipo,
      });
    }
    console.log("Cliente obtenido en FormUpdateCliente: ", cliente);
  }, [cliente]);


  return (
    <ContentPage>
      {/* Header */}
      <HeaderFormPage
        title="Gestión de clientes"
        description="Registra un nuevo cliente en el sistema."
        setShowForm={setShowFormUpdate}
      />
      <ContentSectionProcess 
      fetchData={() => obtenerCliente(dniCliente)}
      isError={errorCliente}
      isLoading={cargandoCliente}
      textButtonError="Reintentar"
      textError="Se produjo un error al obtener el cliente"
      >
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mx-8 my-6">
          <div className="space-y-6">
            {/* Row 1: */}
            <div className="grid grid-cols-3 gap-6">
              <InputText
                label="Nombres"
                value={formData.nombre}
                htmlForm="dni"
                onChange={(value) => setFormData(prev => ({ ...prev, nombre: value }))}
              />
              <InputText
                label="Apellido Materno"
                value={formData.apellidopaterno}
                htmlForm="dni"
                onChange={(value) => setFormData(prev => ({ ...prev, apellidopaterno: value }))}
              />
              <InputText
                label="Apellido Paterno"
                value={formData.apellidomaterno}
                htmlForm="dni"
                onChange={(value) => setFormData(prev => ({ ...prev, apellidomaterno: value }))}
              />
            </div>

            {/* Row 3: */}
            <div className="grid grid-cols-3 gap-6">
              <InputText
                label="RUC"
                value={formData.ruc ?? ''}
                htmlForm="nombres"
                onChange={(value) => setFormData(prev => ({ ...prev, ruc: value }))}
              />
              <InputText
                label="DNI"
                value={formData.dni ?? ''}
                htmlForm="nombres"
                onChange={(value) => setFormData(prev => ({ ...prev, dni: value }))}
              />
            </div>

            {/* Row 4: */}
            <div className="grid grid-cols-3 gap-6">
              <InputNumber
                defaultValue={formData.edad}
                label="Edad"
                simbol="años"
                onChange={(value) => setFormData(prev => ({ ...prev, edad: value}))}
                placeholder="Ingrese la edad del cliente"
              />
              <InputNumber
                defaultValue={parseInt(formData.numero ?? '0')}
                label="Número telefónico"
                simbol="celular"
                onChange={(value) => setFormData(prev => ({ ...prev, numero: value.toString() }))}
                placeholder="Ingrese el número telefónico del cliente"
              />
              <InputSelect
                label="Tipo"
                valueSelected={formData.tipo}
                options={tiposPersona}
                onSelect={(value) => setFormData(prev => ({ ...prev, tipo: value as UserType }))}
                placeholder="seleccione el tipo de persona"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <div className="flex flex-row gap-4 w-full justify-end">
              <div className="flex flex-row gap-4">
                <ButtonCancelForm
                  handleCancel={() => setShowFormUpdate(false)}
                  isLoading={cargandoCreateCliente}
                  textButton="Cancelar"
                  color="red"
                />
                <ButtonSubmitForm
                  handleSubmit={() => {
                    registrarCliente(formData)
                    setShowFormUpdate(false);
                  }}
                  isLoading={cargandoCreateCliente}
                  isError={errorCreateCliente}
                  textButton="Guardar Cambios"
                  textError={"Error al guardar los cambios"}
                  color="blue"
                />
              </div>
            </div>
          </div>
        </div>
      </ContentSectionProcess>
    </ContentPage>
  );
}