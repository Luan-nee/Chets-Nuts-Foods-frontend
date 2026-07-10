import { useState } from "react";
import InputText from "../../../../components/ui/InputText";
import TableSelectCliente from "../../../clientes/components/TableSelectCliente";
import TableSelectSalidaTransporte from "../../../transporte/components/TableSelectSalidaTransporte";
import ButtonCancelForm from "../../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../../components/ui/ButtonSubmitForm";
import { useRegistrarPaquete } from "../../../paquetes/hooks/useRegistrarPaquete";
import type { CreatePaquete } from '../../../../types/paquete.type';

export default function FormPaquete() {
  const [, setIdSalidaTransporte] = useState<number | null>(null);
  const [, setIdCliente] = useState<number | null>(null);
  const [formData, setFormData] = useState<CreatePaquete>({
    clave: "",
    destino: "sin definir",
    idSalidaTransporte: 0,
    idUsuario: 1,
    idUsuarioDestino: 0,
    montoCobrado: 1
  });
  const {
    execute: registrarPaquete,
    isLoading: isLoadingPaquete,
    isError: isErrorPaquete,
  } = useRegistrarPaquete();

  return (
    <div className="px-6 py-4 bg-gray-900 mx-6">
      <div className='flex gap-2'>
        <ButtonSubmitForm 
          handleSubmit={() => {
            registrarPaquete(formData)
          }}
          isError={isErrorPaquete}
          isLoading={isLoadingPaquete}
          textButton="Registrar paquete"
          textError="Error al registrar el paquete"
          color='blue'
        />
        <ButtonCancelForm 
          handleCancel={() => {}}
          isLoading={isLoadingPaquete}
          textButton="Cancelar"
          color='red'
        />
      </div>
      <InputText 
        htmlForm='clave de seguimiento'
        label='Clave de seguimiento'
        onChange={(value) => setFormData((prev) => ({
          ...prev,
          clave: value
        }))}
        value={formData.clave}
      />
      <TableSelectSalidaTransporte 
      selectIdSalidaTransporte={setIdSalidaTransporte} 
      onChange={(setIdSalidaTransporte) => {
        setFormData((prev) => ({
          ...prev,
          idSalidaTransporte: setIdSalidaTransporte || 0
        }));
      }} />
      <TableSelectCliente 
      selectIdCliente={setIdCliente} 
      onChange={(setIdCliente) => {
        setFormData((prev) => ({
          ...prev,
          idUsuarioDestino: setIdCliente || 0
        }));
      }} />
    </div>
  );
}