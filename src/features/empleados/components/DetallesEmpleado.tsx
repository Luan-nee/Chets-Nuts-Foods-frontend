// importación de componentes IU
import { User, Edit2, Mail, ChevronRight} from 'lucide-react';
// importación de custom hooks
import { useFetchEmpleadoById } from '../hooks/useFetchEmpleadoById';
import { useInhabilitarEmpleado } from '../hooks/useInhabilitarEmpleado';
import ButtonSubmitForm from '../../../components/ui/ButtonSubmitForm';
import ContentSectionProcess from '../../../components/layouts/ContentSectionProcess';

interface DetallesEmpleadoProps {
  showFormUpdateEmpleado: (p: boolean) => void;
  showDetallesEmpleado: (p: boolean) => void;
  idEmpleado: number;
}

export default function DetallesEmpleado({showFormUpdateEmpleado, showDetallesEmpleado, idEmpleado }: DetallesEmpleadoProps) {
  // usa el hook personalizado para obtener los detalles de la guía de remisión
  const { data: empleado, isLoading, isError, fetchData } = useFetchEmpleadoById(idEmpleado);
  const { isLoading: isInhabilitando, isError: isInhabilitandoError, refresh } = useInhabilitarEmpleado();

  return (
    <ContentSectionProcess
      isLoading={isLoading}
      isError={isError}
      textError="Error al cargar los datos del empleado."
      textButtonError="Reintentar"
      fetchData={() => fetchData}
    > 
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6 flex flex-row justify-between">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-28 h-28 bg-[#21262d] rounded-2xl border border-[#30363d] flex items-center justify-center">
              <User className="w-14 h-14 text-gray-500" />
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0d1117]"></div>
          </div>

          {/* Info and Actions */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{empleado?.nombres}</h1>
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-md text-xs font-bold text-green-400 uppercase">
                    Activo
                  </span>
                </div>
                <p className="text-gray-400">
                  {empleado?.rol?.nombre} • ID {empleado?.rol?.id}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1f6feb] hover:bg-[#1a5cd9] rounded-lg transition-colors text-sm font-medium"
                onClick={() => showFormUpdateEmpleado(true)}
              >
                <Edit2 className="w-4 h-4" />
                Editar Información
              </button>
              <ButtonSubmitForm
                isLoading={isInhabilitando}
                isError={isInhabilitandoError}
                textButton="Inhabilitar Empleado"
                textError="Reintentar"
                handleSubmit={() => refresh(idEmpleado, { motivo: "Motivo estático." })}
                color="red"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* botón para cerrar */}
          <button
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors border border-gray-700"
            title="Cerrar Detalles"
            onClick={() => showDetallesEmpleado(false)}
          >
            <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
            Regresar
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Information Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Información Personal */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-[#1f6feb]" />
              <h2 className="text-base font-bold uppercase">Información Personal</h2>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Nombre Completo</p>
                <p className="text-sm font-medium text-white">{empleado?.nombres}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Documento Nacional de Identidad (DNI)</p>
                <p className="text-sm font-medium text-white">{empleado?.dni}</p>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5 text-[#1f6feb]" />
              <h2 className="text-base font-bold uppercase">Información de Contacto</h2>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Correo Electrónico</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{empleado?.correo}</p>
                  <svg className="w-4 h-4 text-[#1f6feb]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trazabilidad del Sistema */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-5">
              <p className="text-lg text-gray-500 mb-2 uppercase tracking-wide">Fecha de Registro</p>
              <p className="text-lg font-bold text-white">{empleado?.fecha_registro}</p>
              <p className="text-xl text-gray-500 mt-1">{empleado?.hora_registro}</p>
            </div>
            <div className="p-5">
              <p className="text-lg text-gray-500 mb-2 uppercase tracking-wide">Última Actualización</p>
              <p className="text-lg font-bold text-white">{empleado?.fecha_actualizacion}</p>
              <p className="text-xl text-gray-500 mt-1">{empleado?.hora_actualizacion}</p>
            </div>
          </div>
        </div>
      </div>
    </ContentSectionProcess>
  );
}