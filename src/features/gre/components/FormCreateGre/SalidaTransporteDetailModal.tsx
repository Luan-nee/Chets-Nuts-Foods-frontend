import Loading from '../../../../components/ui/Loading';

interface SalidaTransporteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  detailData: any;
  formatFechaSalida: (fechaStr: string) => string;
}

export default function SalidaTransporteDetailModal({
  isOpen,
  onClose,
  isLoading,
  detailData,
  formatFechaSalida,
}: SalidaTransporteDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950">
          <h3 className="text-lg font-bold text-white">
            Detalles de Salida #{detailData?.salidaTransporte?.idsalidatransporte}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loading w={8} h={8} color="blue" />
            </div>
          ) : detailData ? (
            <div className="space-y-6">
              {/* General Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-950 border border-gray-800">
                <div>
                  <span className="text-gray-500 block">ID Salida:</span>
                  <span className="text-white font-medium">#{detailData.salidaTransporte.idsalidatransporte}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Estado:</span>
                  <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                    {detailData.salidaTransporte.estadotransporte}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Fecha Salida:</span>
                  <span className="text-white font-medium">{formatFechaSalida(detailData.salidaTransporte.fechasalida)}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Fecha Creación:</span>
                  <span className="text-white font-medium">{formatFechaSalida(detailData.salidaTransporte.fechacreado)}</span>
                </div>
              </div>

              {/* Chofer & Vehiculo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 space-y-2">
                  <h4 className="font-bold text-white border-b border-gray-800 pb-2 mb-2">Chofer</h4>
                  {detailData.choferUser ? (
                    <>
                      <p><span className="text-gray-500">Nombre:</span> {detailData.choferUser.nombres} {detailData.choferUser.apellidopaterno} {detailData.choferUser.apellidomaterno}</p>
                      <p><span className="text-gray-500">RUC:</span> {detailData.choferUser.rucuser || "-"}</p>
                      <p><span className="text-gray-500">Licencia:</span> {detailData.choferUser.numeroLicenciaConducir || "-"}</p>
                      <p><span className="text-gray-500">Edad:</span> {detailData.choferUser.edad} años</p>
                    </>
                  ) : (
                    <p className="text-gray-500">No asignado</p>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 space-y-2">
                  <h4 className="font-bold text-white border-b border-gray-800 pb-2 mb-2">Vehículo</h4>
                  {detailData.vehiculo ? (
                    <>
                      <p><span className="text-gray-500">Placa:</span> {detailData.vehiculo.placa}</p>
                      <p><span className="text-gray-500">Marca:</span> {detailData.vehiculo.marca}</p>
                      <p><span className="text-gray-500">Modelo:</span> {detailData.vehiculo.modelo}</p>
                      <p><span className="text-gray-500">Capacidad Carga:</span> {detailData.vehiculo.capacidadCarga} kg</p>
                    </>
                  ) : (
                    <p className="text-gray-500">No asignado</p>
                  )}
                </div>
              </div>

              {/* Origen & Destino */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 space-y-2">
                  <h4 className="font-bold text-white border-b border-gray-800 pb-2 mb-2">Establecimiento Origen</h4>
                  {detailData.origenEstablecimiento ? (
                    <>
                      <p><span className="text-gray-500">Nombre:</span> {detailData.origenEstablecimiento.nombreEst}</p>
                      <p><span className="text-gray-500">Departamento:</span> {detailData.origenEstablecimiento.departamento}</p>
                      <p><span className="text-gray-500">Provincia:</span> {detailData.origenEstablecimiento.provincia}</p>
                      <p><span className="text-gray-500">Ubigeo:</span> {detailData.origenEstablecimiento.ubigeo}</p>
                    </>
                  ) : (
                    <p className="text-gray-500">No asignado</p>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 space-y-2">
                  <h4 className="font-bold text-white border-b border-gray-800 pb-2 mb-2">Establecimiento Destino</h4>
                  {detailData.destinoEstablecimiento ? (
                    <>
                      <p><span className="text-gray-500">Nombre:</span> {detailData.destinoEstablecimiento.nombreEst}</p>
                      <p><span className="text-gray-500">Departamento:</span> {detailData.destinoEstablecimiento.departamento}</p>
                      <p><span className="text-gray-500">Provincia:</span> {detailData.destinoEstablecimiento.provincia}</p>
                      <p><span className="text-gray-500">Ubigeo:</span> {detailData.destinoEstablecimiento.ubigeo}</p>
                    </>
                  ) : (
                    <p className="text-gray-500">No asignado</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-red-400">
              No se pudieron cargar los detalles de la salida de transporte.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-gray-950">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
