import { MapPin, User } from 'lucide-react'

export default function Detalles () {
  return (
    <div className="relative flex-1 flex flex-col">
      {/* Form Sections */}
      <div className=" flex flex-col gap-4 overflow-auto px-8 py-6">
        <div className="grid grid-cols-2 items-start gap-4">
          {/* Información empresarial*/}
          <div className="sehylf-start bg-gray-900 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-[#1f6feb]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Información empresarial
                </h2>
                <p className="text-xs text-gray-400">
                  Asegúrate de que la información registrada sea correcta.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p>RUC</p>
                <p>1012345678</p>
              </div>
              <div>
                <p>Correo</p>
                <p>1012345678</p>
              </div>
              <div>
                <p>Denominación</p>
                <p>1012345678</p>
              </div>
              <div>
                <p>Número de registro en la MTC</p>
                <p>1012345678</p>
              </div>
              <div>
                <p>Fecha de vigencia del registro en la MTC</p>
                <p>1012345678</p>
              </div>
            </div>
          </div>

          {/* Ubicación de la empresa */}
          <div className="self-start bg-gray-900 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Ubicación de la empresa
                </h2>
                <p className="text-xs text-gray-400">
                  Dirección de la sede principal
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p>Departamento</p>
                <p>1012345678</p>
              </div>
              <div>
                <p>Provincia</p>
                <p>1012345678</p>
              </div>
              <div>
                <p>Distrito</p>
                <p>1012345678</p>
              </div>
              <div>
                <p>Dirección detallada</p>
                <p>1012345678</p>
              </div>
              <div>
                <p>Latitud</p>
                <p>1012345678</p>
              </div>
              <div>
                <p>Latitud</p>
                <p>1012345678</p>
              </div>
              <div>
                <p>Longitud</p>
                <p>1012345678</p>
              </div>
              <div>
                <p>Ubigeo</p>
                <p>1012345678</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}