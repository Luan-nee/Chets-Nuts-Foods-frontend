import { useState } from "react";
import { User, Lock, Eye, EyeOff, Save, MapPin, Building2 } from "lucide-react";

export default function Configuraciones() {
  const [formData, setFormData] = useState({
    firstName: "",
    paternalSurname: "",
    maternalSurname: "",
    dni: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Mi Cuenta</h2>
            <p className="text-sm text-gray-400">
              Edita tu información personal y de seguridad.
            </p>
          </div>
        </div>
      </div>

      {/* Form Sections */}
      <div className=" flex flex-col gap-4 overflow-auto px-8 py-6">

        {/* RUC y Correo electrónico del usuario */}
        <section className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-4 gap-3">
            <Building2 className="w-5 h-5 text-[#1f6feb]" />
            <h2 className="text-xl font-semibold">Información de la SUNAT</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* RUC */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                RUC
              </label>
              <input
                type="text"
                className="w-full bg-[#0d1117] border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>
            {/* Correo electrónico */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-full bg-[#0d1117] border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Información del usuario y ubicación de la empresa */}
        <div className="grid grid-cols-2 gap-4">
          {/* Información personal del usuario*/}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-[#1f6feb]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Información Personal
                </h2>
                <p className="text-xs text-gray-400">
                  Recuerda que esta información se usará para generar tus guias
                  de remisión, asegúrate de que sea correcta.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Nombres */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombres
                </label>
                <input
                  type="text"
                  placeholder="actualizar nombres"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full bg-[#0d1117] border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
                />
              </div>

              {/* Apellido Paterno */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  placeholder="nuevoApellido"
                  value={formData.paternalSurname}
                  onChange={(e) =>
                    handleInputChange("paternalSurname", e.target.value)
                  }
                  className="w-full bg-[#0d1117] border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
                />
              </div>

              {/* Apellido Materno */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  placeholder="nuevoApellido"
                  value={formData.maternalSurname}
                  onChange={(e) =>
                    handleInputChange("maternalSurname", e.target.value)
                  }
                  className="w-full bg-[#0d1117] border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
                />
              </div>

              {/* DNI */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  DNI
                </label>
                <input
                  type="number"
                  placeholder="12345678"
                  value={formData.dni}
                  onChange={(e) => handleInputChange("dni", e.target.value)}
                  className="w-full bg-[#0d1117] border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Ubicación de la empresa */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
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
              {/* Departamento */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Departamento
                </label>
                <div className="relative">
                  <select className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-[#1f6feb] transition-colors appearance-none cursor-pointer">
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Provincia
                </label>
                <div className="relative">
                  <select className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-[#1f6feb] transition-colors appearance-none cursor-pointer">
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Distrito
                </label>
                <div className="relative">
                  <select className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-[#1f6feb] transition-colors appearance-none cursor-pointer">
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
        </div>

        {/* Seguridad */}
        <section className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-4 gap-3">
            <Lock className="w-5 h-5 text-[#1f6feb]" />
            <h2 className="text-xl font-semibold">Seguridad</h2>
          </div>

          <div className="space-y-4">
            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Cambiar Contraseña
                </label>
                <a href="#" className="text-sm text-[#1f6feb] hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="nueva contraseña"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="w-full bg-[#0d1117] border border-gray-800 rounded-lg px-4 py-2.5 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">
                Ingresa una nueva contraseña solo si deseas cambiar la actual.
              </p>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button className="px-6 py-2.5 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors text-white">
            Cancelar
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white">
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
