import { MapPin } from "lucide-react";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import { useFetchEstablecimiento } from "../../establecimientos/hooks/useFetchEstablecimiento";

interface DetallesInfoEstablecimientoProps {
  setShowForm: (p: boolean) => void;
}

export default function DetallesInfoEstablecimiento({ setShowForm }: DetallesInfoEstablecimientoProps) {
  const {
    establecimiento,
    isLoading: isLoadingEstablecimiento,
    isError: isErrorEstablecimiento,
    message: messageEstablecimiento,
    execute: fetchEstablecimiento,
  } = useFetchEstablecimiento(1);

  return (
    <div className="self-start bg-gray-900 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6 justify-between">
        <div className="flex nowrap gap-2">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Información del establecimiento
            </h2>
            <p className="text-xs text-gray-400">
              Revisa los datos del establecimiento seleccionado.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex text-nowrap items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
          Editar
        </button>
      </div>
      <ContentSectionProcess
        isLoading={isLoadingEstablecimiento}
        isError={isErrorEstablecimiento}
        textError={messageEstablecimiento}
        textButtonError="Reintentar"
        fetchData={() => fetchEstablecimiento(1)}
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Establecimiento
            </p>
            <p className="text-sm font-medium text-white break-words">
              {establecimiento?.nombreEstablecimiento || "Sin nombre registrado"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Responsable
            </p>
            <p className="text-sm font-medium text-white break-words">
              {establecimiento
                ? `${establecimiento.apellidopaterno || ""} ${establecimiento.apellidomaterno || ""} ${establecimiento.nombreusuario || ""}`.trim() || "No registrado"
                : "No registrado"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Documento
            </p>
            <p className="text-sm font-medium text-white break-words">
              {establecimiento?.dniuser || "No registrado"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Teléfono
            </p>
            <p className="text-sm font-medium text-white break-words">
              {establecimiento?.numero || "No registrado"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Tipo
            </p>
            <p className="text-sm font-medium text-white break-words">
              {establecimiento
                ? establecimiento.tipoestablecimiento
                : "No registrado"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Estado
            </p>
            <p className="text-sm font-medium text-white break-words">
              {establecimiento ? (establecimiento.activo ? "Activo" : "Inactivo") : "No registrado"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Código SUNAT
            </p>
            <p className="text-sm font-medium text-white break-words">
              {establecimiento?.codigoSunat || "No registrado"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Ubigeo
            </p>
            <p className="text-sm font-medium text-white break-words">
              {establecimiento?.ubigeo || "No registrado"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Ubicación
            </p>
            <p className="text-sm font-medium text-white break-words">
              {
                establecimiento?.departamento + " / " +
                establecimiento?.provincia + " / " +
                establecimiento?.distrito
              }
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Dirección detallada
            </p>
            <p className="text-sm font-medium text-white break-words">
              {establecimiento?.descripcion || "No registrada"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Latitud
              </p>
              <p className="text-sm font-medium text-white break-words">
                {establecimiento?.latitud || "No registrada"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Longitud
              </p>
              <p className="text-sm font-medium text-white break-words">
                {establecimiento?.longitud || "No registrada"}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Fecha de creación
            </p>
            <p className="text-sm font-medium text-white break-words">
              {establecimiento?.fechaCreacion || "No registrado"}
            </p>
          </div>
        </div>
      </ContentSectionProcess>
    </div>
  );
}
