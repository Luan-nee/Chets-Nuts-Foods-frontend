import { useEffect, useState } from 'react';
import { useGreContext } from '../../../../context/GreContext';
import { useAuth } from '../../../../context/AuthContext';
import Loading from '../../../../components/ui/Loading';
import { useFetchSalidasInicio } from '../../hooks/useFetchSalidasInicio';
import SalidaTransporteApi from '../../../../api/SalidaTransporte.api';
import { ArrowLeft } from 'lucide-react';

import SalidaTransporteTable from './SalidaTransporteTable';
import SalidaTransporteForm from './SalidaTransporteForm';
import SalidaTransporteDetailModal from './SalidaTransporteDetailModal';

export default function FormSalidaTransporte() {
  const { dataEmitirGre, setDataEmitirGre } = useGreContext();
  const { auth } = useAuth();
  const isAdmin = auth.rol === "ADMIN";

  const {
    salidaTransportes,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    execute: refetchSalidas
  } = useFetchSalidasInicio();

  const [showForm, setShowForm] = useState<boolean>(false);
  const [idSelected, setIdSelected] = useState<number | null>(dataEmitirGre.idSalidaTransporte || null);

  // States for detailed view modal
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<any>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  // States for Edit Mode
  const [editSalidaData, setEditSalidaData] = useState<any>(null);
  const [isLoadingEditData, setIsLoadingEditData] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoadingFetch && salidaTransportes.length === 0) {
      setShowForm(true);
    }
  }, [isLoadingFetch, salidaTransportes]);

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

  const formatDateMMDDYYYY = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
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

  const fetchSalidaFullData = async (id: number) => {
    const cacheKey = `salida_detalle_${id}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error("Error parsing cached details", e);
      }
    }
    try {
      const api = new SalidaTransporteApi();
      const response = await api.getByID<any>(id);
      if (response.status === "success" && response.data) {
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching details", error);
    }
    return null;
  };

  const handleOpenDetailModal = async (id: number) => {
    setShowDetailModal(true);
    setIsLoadingDetail(true);
    const data = await fetchSalidaFullData(id);
    setDetailData(data);
    setIsLoadingDetail(false);
  };

  const handleEditSalida = async (salida: any) => {
    setIsLoadingEditData(true);
    const data = await fetchSalidaFullData(salida.idsalidatransporte);
    if (data && data.salidaTransporte) {
      const t = data.salidaTransporte;
      const dateObj = new Date(t.fechasalida);
      const dateStr = formatDateMMDDYYYY(dateObj);
      const hourStr = `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;

      setEditSalidaData({
        idsalidatransporte: t.idsalidatransporte,
        idVehiculo: t.idvehiculo,
        idChoferAcceso: t.idchoferacceso,
        idOrigenEstablecimiento: t.idorigenestablecimiento,
        idDestinoEstablecimiento: t.iddestinoestablecimiento,
        fechaSalida: dateStr,
        horasalida: hourStr,
        estadoTransporte: t.estadotransporte,
      });
      setShowForm(true);
    }
    setIsLoadingEditData(false);
  };

  const handleCancelForm = () => {
    setEditSalidaData(null);
    if (salidaTransportes.length > 0) {
      setShowForm(false);
    }
  };

  const handleSubmitSuccess = (idSalida: number) => {
    setEditSalidaData(null);
    setDataEmitirGre((current) => ({
      ...current,
      idSalidaTransporte: idSalida,
    }));
    refetchSalidas().then(() => {
      setIdSelected(idSalida);
      setShowForm(false);
    });
  };

  if (isLoadingFetch || isLoadingEditData) {
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
    return (
      <>
        <SalidaTransporteTable
          salidaTransportes={salidaTransportes}
          idSelected={idSelected}
          isAdmin={isAdmin}
          onSelect={handleSelectSalida}
          onDeselect={handleDeselectSalida}
          onCreateNew={() => setShowForm(true)}
          onEdit={handleEditSalida}
          onOpenDetails={handleOpenDetailModal}
          formatFechaSalida={formatFechaSalida}
        />

        <SalidaTransporteDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          isLoading={isLoadingDetail}
          detailData={detailData}
          formatFechaSalida={formatFechaSalida}
        />
      </>
    );
  }

  return (
    <div className="px-6 py-4 bg-gray-900 mx-6 rounded-xl border border-gray-800">
      {salidaTransportes.length > 0 && (
        <button
          onClick={handleCancelForm}
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la lista de salidas activas
        </button>
      )}

      <SalidaTransporteForm
        onCancel={handleCancelForm}
        onSubmitSuccess={handleSubmitSuccess}
        initialEditData={editSalidaData}
      />
    </div>
  );
}