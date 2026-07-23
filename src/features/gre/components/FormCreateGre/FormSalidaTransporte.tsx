import { useEffect, useState } from 'react';
import DateTimePicker from '../../../../components/ui/SelectDateTime';
import TableSelectEstablecimiento from '../../../establecimientos/components/TableSelectEstablecimiento';
import TableSelectChofer from '../../../chofer/components/TableSelectChofer';
import TableSelectVehiculo from '../../../vehiculos/components/TableSelectVehiculo';
import ButtonSubmitForm from '../../../../components/ui/ButtonSubmitForm';
import ButtonCancelForm from '../../../../components/ui/ButtonCancelForm';
import { useRegistrarSalidaTransporte } from '../../../gre/hooks/useRegistrarSalidaTransporte';
import { useGreContext } from '../../../../context/GreContext';
import { Plus, Hash, CalendarDays, Check, ArrowLeft } from 'lucide-react';
import Table from '../../../../components/ui/Table';
import Loading from '../../../../components/ui/Loading';
import { useFetchSalidasInicio } from '../../hooks/useFetchSalidasInicio';

type SalidaTransporteFormData = {
  idChoferAcceso: number,
  idOrigenEstablecimiento: number,
  idDestinoEstablecimiento: number,
  idVehiculo: number,
  fechaSalida: string,
  horasalida: string
}

export default function FormSalidaTransporte() {
  const { dataEmitirGre, setDataEmitirGre } = useGreContext();
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
  });

  const {
    isLoading: isLoadingSalidaTransporte,
    isError: isErrorSalidaTransporte,
    execute: createSalidaTransporte
  } = useRegistrarSalidaTransporte();

  const {
    salidaTransportes,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    execute: refetchSalidas
  } = useFetchSalidasInicio();

  const [showForm, setShowForm] = useState<boolean>(false);
  const [idSelected, setIdSelected] = useState<number | null>(dataEmitirGre.idSalidaTransporte || null);

  useEffect(() => {
    if (!isLoadingFetch && salidaTransportes.length === 0) {
      setShowForm(true);
    }
  }, [isLoadingFetch, salidaTransportes]);

  const syncSalidaTransporte = (nextValues: Partial<SalidaTransporteFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...nextValues,
    }));
  };

  useEffect(() => {
    if (showForm) {
      setDataEmitirGre((current) => ({
        ...current,
        salidaTransporte: formData,
      }));
    }
  }, [formData, setDataEmitirGre, showForm]);

  const formatFechaSalida = (fechaSalida: string) => {
    const fecha = new Date(fechaSalida);

    if (Number.isNaN(fecha.getTime())) {
      return fechaSalida;
    }

    return new Intl.DateTimeFormat("es-PE", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(fecha);
  };

  const handleSelectSalida = (id: number) => {
    setIdSelected(id);
    setDataEmitirGre((current) => ({
      ...current,
      idSalidaTransporte: id,
    }));
  };

  const handleDeselectSalida = () => {
    setIdSelected(null);
    setDataEmitirGre((current) => ({
      ...current,
      idSalidaTransporte: 0,
    }));
  };

  if (isLoadingFetch) {
    return (
      <div className="flex items-center justify-center p-12 bg-gray-900 mx-6 rounded-xl border border-gray-800">
        <Loading w={8} h={8} color="blue" />
      </div>
    );
  }

  if (isErrorFetch) {
    return (
      <div className="p-8 bg-gray-900 mx-6 rounded-xl border border-gray-800 text-center">
        <p className="text-red-400 mb-4">Error al cargar las salidas de transporte</p>
        <button
          onClick={() => refetchSalidas()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!showForm) {
    const tableHeader = ["ID Salida", "Estado", "Fecha de salida", ""];
    return (
      <div className="px-6 py-6 bg-gray-900 mx-6 rounded-xl border border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">Salidas de Transporte Activas</h3>
            <p className="text-sm text-slate-400">Selecciona una salida en progreso para tu guía o registra una nueva.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Crear nueva salida
          </button>
        </div>

        <Table tableHeader={tableHeader} cantidadDatos={salidaTransportes.length}>
          {salidaTransportes.map((salida, index) => (
            <tr
              key={index}
              className={`border-b border-gray-800 hover:bg-gray-800/40 transition-colors ${
                idSelected === salida.idsalidatransporte ? 'bg-blue-900/10' : ''
              }`}
            >
              {/* ID */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${
                    idSelected === salida.idsalidatransporte ? 'bg-blue-500/20' : 'bg-gray-800'
                  }`}>
                    <Hash className={`w-4 h-4 ${
                      idSelected === salida.idsalidatransporte ? 'text-blue-400' : 'text-slate-400'
                    }`} />
                  </div>
                  <div>
                    <span className="block font-semibold text-sm text-slate-200">
                      Salida #{salida.idsalidatransporte}
                    </span>
                  </div>
                </div>
              </td>

              {/* Estado */}
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                  {salida.estadotransporte}
                </span>
              </td>

              {/* Fecha */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CalendarDays className="w-4 h-4 text-slate-500" />
                  <span>{formatFechaSalida(salida.fechasalida)}</span>
                </div>
              </td>

              {/* Acciones */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end">
                  {idSelected === salida.idsalidatransporte ? (
                    <button
                      onClick={handleDeselectSalida}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-xs font-semibold border border-green-500/30 transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Seleccionada
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelectSalida(salida.idsalidatransporte)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-slate-300 rounded-lg text-xs font-medium transition-all"
                    >
                      Seleccionar
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 bg-gray-900 mx-6 rounded-xl border border-gray-800">
      {salidaTransportes.length > 0 && (
        <button
          onClick={() => setShowForm(false)}
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la lista de salidas activas
        </button>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-100">Registrar Nueva Salida de Transporte</h3>
        <p className="text-sm text-slate-400">Completa la información del vehículo, chofer y destino.</p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="text-sm font-medium text-slate-300 mb-2">
            Fecha y Hora de Salida
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
          }}
        />

        <TableSelectChofer 
          selectIdChofer={setIdChofer} 
          onChange={(setIdChofer) => {
            syncSalidaTransporte({
              idChoferAcceso: setIdChofer || 0,
            });
          }}
        />

        <TableSelectVehiculo 
          selectIdVehiculo={setIdVehiculo} 
          onChange={(setIdVehiculo) => {
            syncSalidaTransporte({
              idVehiculo: setIdVehiculo || 0,
            });
          }}
        />

        <div className="flex gap-3 pt-4 border-t border-gray-800">
          <ButtonCancelForm 
            handleCancel={() => {
              if (salidaTransportes.length > 0) {
                setShowForm(false);
              }
            }}
            isLoading={false}
            textButton='Cancelar'
            color='red'
          />
          <ButtonSubmitForm 
            handleSubmit={ async () => {
              createSalidaTransporte(formData).then((response) => {
                if (response !== 0) {
                  setDataEmitirGre((current) => ({
                    ...current,
                    salidaTransporte: formData,
                    idSalidaTransporte: response,
                  }));
                  refetchSalidas().then(() => {
                    setIdSelected(response);
                    setShowForm(false);
                  });
                }
              });
            }}
            isError={isErrorSalidaTransporte}
            isLoading={isLoadingSalidaTransporte}
            textButton='Registrar salida de transporte'
            textError='Se produjo un error al registrar la salida de transporte'
            color='blue'
          />
        </div>
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