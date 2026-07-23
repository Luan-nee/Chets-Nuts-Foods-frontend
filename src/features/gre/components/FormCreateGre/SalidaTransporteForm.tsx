import { useState, useEffect } from 'react';
import DateTimePicker from '../../../../components/ui/SelectDateTime';
import TableSelectEstablecimiento from '../../../establecimientos/components/TableSelectEstablecimiento';
import TableSelectChofer from '../../../chofer/components/TableSelectChofer';
import TableSelectVehiculo from '../../../vehiculos/components/TableSelectVehiculo';
import ButtonSubmitForm from '../../../../components/ui/ButtonSubmitForm';
import ButtonCancelForm from '../../../../components/ui/ButtonCancelForm';
import { useRegistrarSalidaTransporte } from '../../../gre/hooks/useRegistrarSalidaTransporte';
import { useActualizarSalidaTransporte } from '../../../gre/hooks/useActualizarSalidaTransporte';
import { useGreContext } from '../../../../context/GreContext';
import type { UpdateSalidaTransporte } from '../../../../types/salidaTransporte.type';

interface SalidaTransporteFormProps {
  onCancel: () => void;
  onSubmitSuccess: (idSalida: number) => void;
  initialEditData?: {
    idsalidatransporte: number;
    idVehiculo: number;
    idChoferAcceso: number;
    idOrigenEstablecimiento: number;
    idDestinoEstablecimiento: number;
    fechaSalida: string;
    horasalida: string;
    estadoTransporte?: string;
  };
}

export default function SalidaTransporteForm({
  onCancel,
  onSubmitSuccess,
  initialEditData,
}: SalidaTransporteFormProps) {
  const { setDataEmitirGre } = useGreContext();
  const isEditing = !!initialEditData;
  const [, setIdEstablecimiento] = useState<number | null>(initialEditData?.idDestinoEstablecimiento || null);
  const [, setIdChofer] = useState<number | null>(initialEditData?.idChoferAcceso || null);
  const [, setIdVehiculo] = useState<number | null>(initialEditData?.idVehiculo || null);

  const [formData, setFormData] = useState({
    fechaSalida: initialEditData?.fechaSalida || '',
    horasalida: initialEditData?.horasalida || '',
    idChoferAcceso: initialEditData?.idChoferAcceso || 0,
    idOrigenEstablecimiento: initialEditData?.idOrigenEstablecimiento || 1,
    idDestinoEstablecimiento: initialEditData?.idDestinoEstablecimiento || 0,
    idVehiculo: initialEditData?.idVehiculo || 0,
  });

  const {
    isLoading: isLoadingRegistrar,
    isError: isErrorRegistrar,
    execute: createSalidaTransporte,
  } = useRegistrarSalidaTransporte();

  const {
    isLoading: isLoadingActualizar,
    isError: isErrorActualizar,
    execute: updateSalidaTransporte,
  } = useActualizarSalidaTransporte();

  const syncSalidaTransporte = (nextValues: Partial<typeof formData>) => {
    setFormData((prev) => ({
      ...prev,
      ...nextValues,
    }));
  };

  useEffect(() => {
    setDataEmitirGre((current) => ({
      ...current,
      salidaTransporte: formData,
    }));
  }, [formData, setDataEmitirGre]);

  const handleSave = async () => {
    if (isEditing) {
      const payload: UpdateSalidaTransporte = {
        idsalidatransporte: initialEditData!.idsalidatransporte,
        idVehiculo: formData.idVehiculo,
        idChoferAcceso: formData.idChoferAcceso,
        idOrigenEstablecimiento: formData.idOrigenEstablecimiento,
        idDestinoEstablecimiento: formData.idDestinoEstablecimiento,
        fechaSalida: formData.fechaSalida ? `${formData.fechaSalida}T${formData.horasalida || '00:00'}:00.000Z` : undefined,
        estadoTransporte: (initialEditData?.estadoTransporte || 'INICIO') as any,
      };
      const success = await updateSalidaTransporte(payload);
      if (success) {
        localStorage.removeItem(`salida_detalle_${initialEditData!.idsalidatransporte}`);
        onSubmitSuccess(initialEditData!.idsalidatransporte);
      }
    } else {
      const successId = await createSalidaTransporte(formData);
      if (successId !== 0) {
        onSubmitSuccess(successId);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-100">
          {isEditing ? `Editar Salida de Transporte #${initialEditData.idsalidatransporte}` : 'Registrar Nueva Salida de Transporte'}
        </h3>
        <p className="text-sm text-slate-400">
          Completa la información del vehículo, chofer y destino.
        </p>
      </div>

      <div>
        <div className="text-sm font-medium text-slate-300 mb-2">
          Fecha y Hora de Salida {isEditing && formData.fechaSalida && `(Actual: ${formData.fechaSalida} ${formData.horasalida})`}
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
        initialSelectedId={formData.idDestinoEstablecimiento}
        onChange={(id) => {
          syncSalidaTransporte({
            idDestinoEstablecimiento: id || 0,
          });
        }}
      />

      <TableSelectChofer
        selectIdChofer={setIdChofer}
        initialSelectedId={formData.idChoferAcceso}
        onChange={(id) => {
          syncSalidaTransporte({
            idChoferAcceso: id || 0,
          });
        }}
      />

      <TableSelectVehiculo
        selectIdVehiculo={setIdVehiculo}
        initialSelectedId={formData.idVehiculo}
        onChange={(id) => {
          syncSalidaTransporte({
            idVehiculo: id || 0,
          });
        }}
      />

      <div className="flex gap-3 pt-4 border-t border-gray-800">
        <ButtonCancelForm
          handleCancel={onCancel}
          isLoading={false}
          textButton="Cancelar"
          color="red"
        />
        <ButtonSubmitForm
          handleSubmit={handleSave}
          isError={isEditing ? isErrorActualizar : isErrorRegistrar}
          isLoading={isEditing ? isLoadingActualizar : isLoadingRegistrar}
          textButton={isEditing ? 'Guardar Cambios' : 'Registrar salida de transporte'}
          textError={isEditing ? 'Se produjo un error al guardar los cambios' : 'Se produjo un error al registrar la salida de transporte'}
          color="blue"
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
