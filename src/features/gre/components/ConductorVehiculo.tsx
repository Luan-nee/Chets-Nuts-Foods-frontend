import { Calendar, Copy, ExternalLink, Info, RotateCcw, Search, Truck } from "lucide-react";

export default function ConductorVehiculo() {
  return (
    <div className="flex flex-col gap-4 px-8 py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Main Form - Left Side */}
        <div className="col-span-8 space-y-6">
          {/* Datos del Transporte */}
          <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Truck className="w-5 h-5 text-[#1f6feb]" />
              <h3 className="text-base font-bold uppercase">
                Datos del Transporte
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Placa */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                  Placa del Vehículo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-[#1f6feb] transition-colors"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                  Fecha de Inicio de Traslado
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-[#1f6feb] transition-colors"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300">
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* DNI */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                  DNI del Conductor
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-[#1f6feb] transition-colors"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Licencia */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                  Nº Licencia de Conducir
                </label>
                <input
                  type="text"
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#1f6feb] transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Indicadores de Retorno/Estado */}
          <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <RotateCcw className="w-5 h-5 text-[#1f6feb]" />
              <h3 className="text-base font-bold uppercase">
                Indicadores de Retorno / Estado
              </h3>
            </div>

            <div className="space-y-3">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-white text-sm mb-0.5">
                    Retorno de envases o embalajes
                  </p>
                  <p className="text-xs text-gray-400">
                    Indica si el vehículo regresa con envases vacíos.
                  </p>
                </div>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-blue-500`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6`}
                  />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-white text-sm mb-0.5">
                    Traslado en vehículo vacío
                  </p>
                  <p className="text-xs text-gray-400">
                    Para retornos de unidades sin carga comercial.
                  </p>
                </div>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-blue-500`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6`}
                  />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-white text-sm mb-0.5">
                    Traslado subcontratado
                  </p>
                  <p className="text-xs text-gray-400">
                    Cuando el servicio es realizado por un tercero.
                  </p>
                </div>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-blue-500`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6`}
                  />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4 space-y-6">
          {/* Resumen del Traslado */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-5">
              <Info className="w-5 h-5 text-blue-400" />
              <h3 className="text-base font-bold uppercase">
                Resumen del Traslado
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase">Origen</p>
                <p className="text-sm font-medium text-white">
                  Almacén Central - Lima
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase">Destino</p>
                <p className="text-sm font-medium text-white">
                  Sucursal Norte - Chiclayo
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase">
                  Ítems Seleccionados
                </p>
                <p className="text-sm font-medium text-white">
                  12 bultos (450 kg)
                </p>
              </div>
            </div>
          </div>

          {/* Ayuda */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-5">
            <h3 className="text-base font-bold mb-3 uppercase">Ayuda</h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Recuerda que los datos del conductor y vehículo son obligatorios
              según la normativa SUNAT para Guías de Remisión Electrónicas.
            </p>
            <a
              href="#"
              className="text-sm text-[#1f6feb] hover:underline flex items-center gap-1"
            >
              Ver guía de llenado
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
