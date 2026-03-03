import { Flag, MapPin} from "lucide-react";

export default function RutaDeTranslado() {
  return (
    <div className="flex flex-col gap-4 px-8 py-6">
      {/* Route Cards Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Punto de Partida */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Punto de Partida</h2>
              <p className="text-xs text-gray-400">
                Origen del traslado de bienes
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Departamento */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Departamento
              </label>
              <div className="relative">
                <select
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-[#1f6feb] transition-colors appearance-none cursor-pointer"
                >
                  <option value="Madre De Dios">Madre De Dios</option>
                  <option value="Lima">Lima</option>
                  <option value="Cusco">Cusco</option>
                  <option value="Arequipa">Arequipa</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Provincia */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Provincia
              </label>
              <div className="relative">
                <select
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-[#1f6feb] transition-colors appearance-none cursor-pointer"
                >
                  <option value="Tambopata">Tambopata</option>
                  <option value="Manu">Manu</option>
                  <option value="Tahuamanu">Tahuamanu</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Distrito */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Distrito
              </label>
              <div className="relative">
                <select
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-[#1f6feb] transition-colors appearance-none cursor-pointer"
                >
                  <option value="Laberinto">Laberinto</option>
                  <option value="Tambopata">Tambopata</option>
                  <option value="Inambari">Inambari</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Dirección Detallada */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Dirección Detallada
              </label>
              <textarea
                placeholder="Frente al colegio las piedras"
                rows={3}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Punto de Llegada */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Flag className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Punto de Llegada</h2>
              <p className="text-xs text-gray-400">
                Destino final del traslado
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Departamento */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Departamento
              </label>
              <div className="relative">
                <select
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-[#1f6feb] transition-colors appearance-none cursor-pointer"
                >
                  <option value="Cusco">Cusco</option>
                  <option value="Lima">Lima</option>
                  <option value="Arequipa">Arequipa</option>
                  <option value="Madre De Dios">Madre De Dios</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Provincia */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Provincia
              </label>
              <div className="relative">
                <select
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-[#1f6feb] transition-colors appearance-none cursor-pointer"
                >
                  <option value="Acomayo">Acomayo</option>
                  <option value="Cusco">Cusco</option>
                  <option value="Canchis">Canchis</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Distrito */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Distrito
              </label>
              <div className="relative">
                <select
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-[#1f6feb] transition-colors appearance-none cursor-pointer"
                >
                  <option value="Acopia">Acopia</option>
                  <option value="Acomayo">Acomayo</option>
                  <option value="Acos">Acos</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Dirección Detallada */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Dirección Detallada
              </label>
              <textarea
                placeholder="Cerca a la Plaza Vea"
                rows={3}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
