import { useState } from 'react';
import DateTimePicker from '../../../../components/ui/SelectDateTime';
import TableSelectEstablecimiento from '../../../establecimientos/components/TableSelectEstablecimiento';
import TableSelectChofer from '../../../chofer/components/TableSelectChofer';
import TableSelectVehiculo from '../../../vehiculos/components/TableSelectVehiculo';
import type { FormCreateGreData } from '../FormCreateGre';

interface FormSalidaTransporteProps {
  setFormData: React.Dispatch<React.SetStateAction<FormCreateGreData>>;
}

export default function FormSalidaTransporte({ setFormData }: FormSalidaTransporteProps) {
  const [, setIdEstablecimiento] = useState<number | null>(null);
  const [, setIdChofer] = useState<number | null>(null);
  const [, setIdVehiculo] = useState<number | null>(null);

  return (
    <div className="px-6 py-4 bg-gray-900 mx-6">
      <div>
        <div className="text-lg font-medium text-white mb-4">
          Calendario
        </div>
        <DateTimePicker
          onChange={(value) => {
            setFormData((prev) => ({
              ...prev,
              salidaTransporte: {
                ...prev.salidaTransporte,
                fechaSalida: value ? formatDateMMDDYYYY(value.date) : '',
                horasalida: value ? `${value.hour}:${value.minute}` : ''
              }
            }));
          }}
        />
      </div>
      <TableSelectEstablecimiento 
        selectIdEstablecimiento={setIdEstablecimiento} 
        onChange={(setIdEstablecimiento) => {
        setFormData((prev) => ({
          ...prev,
          salidaTransporte: {
            ...prev.salidaTransporte,
            idDestinoEstablecimiento: setIdEstablecimiento || 0
          }
        }));
      }} />
      <TableSelectChofer 
      selectIdChofer={setIdChofer} 
      onChange={(setIdChofer) => {
        setFormData((prev) => ({
          ...prev,
          salidaTransporte: {
            ...prev.salidaTransporte,
            idChoferAcceso: setIdChofer || 0
          }
        }));
      }} />
      <TableSelectVehiculo 
      selectIdVehiculo={setIdVehiculo} 
      onChange={(setIdVehiculo) => {
        setFormData((prev) => ({
          ...prev,
          salidaTransporte: {
            ...prev.salidaTransporte,
            idVehiculo: setIdVehiculo || 0
          }
        }));
      }} />
    </div>
  );
}

const formatDateMMDDYYYY = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};