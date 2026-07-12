import { useEffect, useState } from "react";
import InputText from "../../../../components/ui/InputText";
import TableSelectCliente from "../../../clientes/components/TableSelectCliente";
import ButtonCancelForm from "../../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../../components/ui/ButtonSubmitForm";
import { useRegistrarPaquete } from "../../../paquetes/hooks/useRegistrarPaquete";
import type { CreatePaquete } from '../../../../types/paquete.type';
import { useGreContext } from '../../../../context/GreContext';

export default function FormPaquete() {
  const {
    dataEmitirGre,
    setDataEmitirGre
  } = useGreContext();
  const [, setIdCliente] = useState<number | null>(null);
  const [formData, setFormData] = useState<CreatePaquete>({
    clave: "",
    destino: "sin definir",
    idSalidaTransporte: dataEmitirGre.idSalidaTransporte || 0,
    idUsuario: 1,
    idUsuarioDestino: 0,
    montoCobrado: 1
  });
  const {
    execute: registrarPaquete,
    isLoading: isLoadingPaquete,
    isError: isErrorPaquete,
  } = useRegistrarPaquete();

  const syncPaquete = (nextValues: Partial<CreatePaquete>) => {
    setFormData((prev) => ({
      ...prev,
      ...nextValues,
    }));
  };

  useEffect(() => {
    setDataEmitirGre((current) => ({
      ...current,
      paquete: formData,
      idSalidaTransporte: formData.idSalidaTransporte,
    }));
  }, [formData, setDataEmitirGre]);

  return (
    <div className="px-6 py-4 bg-gray-900 mx-6">
      <InputText 
        htmlForm='clave de seguimiento'
        label='Clave de seguimiento'
        onChange={(value) => syncPaquete({ clave: value })}
        value={formData.clave}
      />
      <TableSelectCliente 
      selectIdCliente={setIdCliente} 
      onChange={(setIdCliente) => {
        syncPaquete({
          idUsuarioDestino: setIdCliente || 0,
        });
      }} />
      <div className='flex gap-2'>
        <ButtonCancelForm 
          handleCancel={() => {}}
          isLoading={isLoadingPaquete}
          textButton="Cancelar"
          color='red'
        />
        <ButtonSubmitForm 
          handleSubmit={async () => {
            registrarPaquete(formData).then((response) => {
              setDataEmitirGre((current) => ({
                ...current,
                paquete: formData,
                idPaquete: response
              }));
            })
          }}
          isError={isErrorPaquete}
          isLoading={isLoadingPaquete}
          textButton="Registrar paquete"
          textError="Error al registrar el paquete"
          color='blue'
        />
      </div>
    </div>
  );
}