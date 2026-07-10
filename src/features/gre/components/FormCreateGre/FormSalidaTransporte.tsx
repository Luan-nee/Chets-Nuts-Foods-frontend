import { useState } from 'react';
import DateTimePicker from '../../../../components/ui/SelectDateTime';
import TableSelectEstablecimiento from '../../../establecimientos/components/TableSelectEstablecimiento';
import TableSelectChofer from '../../../chofer/components/TableSelectChofer';
import TableSelectVehiculo from '../../../vehiculos/components/TableSelectVehiculo';
import ButtonSubmitForm from '../../../../components/ui/ButtonSubmitForm';
import ButtonCancelForm from '../../../../components/ui/ButtonCancelForm';
import { useRegistrarSalidaTransporte } from '../../../gre/hooks/useRegistrarSalidaTransporte';
import { useGreContext } from '../../../../context/GreContext';

type SalidaTransporteFormData = {
  idChoferAcceso: number,
  idOrigenEstablecimiento: number,
  idDestinoEstablecimiento: number,
  idVehiculo: number,
  fechaSalida: string,
  horasalida: string
}

export default function FormSalidaTransporte() {
  const { setDataEmitirGre } = useGreContext();
  const [, setIdEstablecimiento] = useState<number | null>(null);
  const [, setIdChofer] = useState<number | null>(null);
  const [, setIdVehiculo] = useState<number | null>(null);
  const [formData, setFormData] = useState<SalidaTransporteFormData>({
    fechaSalida: '',
    horasalida: '',
    idChoferAcceso: 0,
    idOrigenEstablecimiento: 1,
    idDestinoEstablecimiento: 0,
    idVehiculo: 0
  }) 
  const {
    isLoading: isLoadingSalidaTransporte,
    isError: isErrorSalidaTransporte,
    execute: createSalidaTransporte
  } = useRegistrarSalidaTransporte();

  const syncSalidaTransporte = (nextValues: Partial<SalidaTransporteFormData>) => {
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        ...nextValues,
      };

      setDataEmitirGre((current) => ({
        ...current,
        salidaTransporte: updatedFormData,
        idSalidaTransporte: updatedFormData.idDestinoEstablecimiento,
      }));

      return updatedFormData;
    });
  };

  return (
    <div className="px-6 py-4 bg-gray-900 mx-6">
      <div>
        <div className="text-lg font-medium text-white mb-4">
          Calendario
        </div>
        <DateTimePicker
          onChange={(value) => {
            syncSalidaTransporte({
              fechaSalida: value ? formatDateMMDDYYYY(value.date) : '',
              horasalida: value ? `${value.hour}:${value.minute}` : '',
            });
          }}
        />
      </div>
      <TableSelectEstablecimiento 
        selectIdEstablecimiento={setIdEstablecimiento} 
        onChange={(setIdEstablecimiento) => {
        syncSalidaTransporte({
          idDestinoEstablecimiento: setIdEstablecimiento || 0,
        });
      }} />
      <TableSelectChofer 
      selectIdChofer={setIdChofer} 
      onChange={(setIdChofer) => {
        syncSalidaTransporte({
          idChoferAcceso: setIdChofer || 0,
        });
      }} />
      <TableSelectVehiculo 
      selectIdVehiculo={setIdVehiculo} 
      onChange={(setIdVehiculo) => {
        syncSalidaTransporte({
          idVehiculo: setIdVehiculo || 0,
        });
      }} />
      <div className="flex gap-2">
        <ButtonCancelForm 
          handleCancel={() => {}}
          isLoading={false}
          textButton='Cancelar'
          color='red'
        />
        <ButtonSubmitForm 
          handleSubmit={() => {
            setDataEmitirGre((current) => ({
              ...current,
              salidaTransporte: formData,
            }));
            createSalidaTransporte(formData);
          }}
          isError={isErrorSalidaTransporte}
          isLoading={isLoadingSalidaTransporte}
          textButton='Registrar salida de transporte'
          textError='Se produjo un error al registrar la salida de transporte'
          color='blue'
        />
      </div>
    </div>
  );
}

const formatDateMMDDYYYY = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};