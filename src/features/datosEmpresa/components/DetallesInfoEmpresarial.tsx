import { User } from "lucide-react";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import { useFetchInfoEmpresa } from '../hook/useFetchInfoEmpresa'

interface DetallesInfoEmpresaProps {
  setShowForm: (p: boolean) => void;
}

export default function DetallesInfoEmpresa({setShowForm}: DetallesInfoEmpresaProps) {
  const {
    infoEmpresa,
    isLoading: isLoadingInfoEmpresa,
    isError: isErrorInfoEmpresa,
    message: messageInfoEmpresa,
    execute: fetchInfoEmpresa,
  } = useFetchInfoEmpresa();
  
  return (
    <div className="self-start bg-gray-900 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6 justify-between">
        <div className="flex nowrap gap-2">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Información empresarial
            </h2>
            <p className="text-xs text-gray-400">
              Revisa los datos de la empresa seleccionada.
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
        isLoading={isLoadingInfoEmpresa}
        isError={isErrorInfoEmpresa}
        textError={messageInfoEmpresa}
        textButtonError="Reintentar"
        fetchData={() => fetchInfoEmpresa()}
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Clave de acceso
            </p>
            <p className="text-sm font-medium text-white break-words">
              {infoEmpresa?.claveAcceso || "Sin clave de acceso registrada"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Codigo MTC
            </p>
            <p className="text-sm font-medium text-white break-words">
              {infoEmpresa?.codigoMtc || "Sin código MTC registrado"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Correo electrónico
            </p>
            <p className="text-sm font-medium text-white break-words">
              {infoEmpresa?.correo || "No registrado"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Denominación
            </p>
            <p className="text-sm font-medium text-white break-words">
              {infoEmpresa?.denominacion || "No registrado"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Fecha vigencia de registro
            </p>
            <p className="text-sm font-medium text-white break-words">
              {infoEmpresa?.fechavigenciaregistro || "No registrado"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Numero de registro MTC
            </p>
            <p className="text-sm font-medium text-white break-words">
              {infoEmpresa?.numeroRegistroMtc || "No registrado"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              RUC
            </p>
            <p className="text-sm font-medium text-white break-words">
              {infoEmpresa?.ruc || "No registrado"}
            </p>
          </div>
        </div>
      </ContentSectionProcess>
    </div>
  );
}