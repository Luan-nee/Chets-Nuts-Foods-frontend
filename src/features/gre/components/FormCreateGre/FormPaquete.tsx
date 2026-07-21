import { useEffect, useState } from "react";
import InputText from "../../../../components/ui/InputText";
import ButtonCancelForm from "../../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../../components/ui/ButtonSubmitForm";
import InputSearch from "../../../../components/ui/InputSearch";
import { useRegistrarPaquete } from "../../../paquetes/hooks/useRegistrarPaquete";
import { useFetchClientesSinCompras } from "../../../clientes/hooks/useFetchClientesSinCompras";
import type { ResponseGetAll } from "../../../../types/usuarios.type"
import type { CreatePaquete } from '../../../../types/paquete.type';
import { useGreContext } from '../../../../context/GreContext';

export default function FormPaquete() {
  const {
    dataEmitirGre,
    setDataEmitirGre
  } = useGreContext();
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
  const {
    clientes
  } = useFetchClientesSinCompras();

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
    <div className="flex gap-4 flex-col px-6 py-4 bg-gray-900 mx-6">
      <InputSearch<ResponseGetAll>
        placeholder="Buscar cliente..."
        atributes={['dniuser', 'nombres', 'apellidopaterno', 'apellidomaterno', 'rucuser']}
        objets={clientes}
        setObjetSelected={(cliente) => {
          setFormData((prev) => ({
            ...prev,
            idUsuarioDestino: cliente.iduser,
          }));
        }}
      />
      <InputText 
        htmlForm='clave de seguimiento'
        label='Clave de seguimiento'
        onChange={(value) => syncPaquete({ clave: value })}
        value={formData.clave}
      />
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