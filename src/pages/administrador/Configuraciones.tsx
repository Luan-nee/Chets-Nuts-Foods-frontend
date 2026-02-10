import { useState } from "react";
import { User, Lock, Eye, EyeOff, Save } from "lucide-react";

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
            <p className="text-sm text-gray-400">Edita tu información personal y de seguridad.</p>
          </div>
        </div>
      </div>

      {/* Form Sections */}
      <div className=" flex flex-col gap-4 overflow-auto px-8 py-6">
        {/* Información Personal */}
        <section className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-[#1f6feb]" />
            <h2 className="text-xl font-semibold">Información Personal</h2>
          </div>

          <div className="space-y-4">
            {/* Row 1: Nombres y Apellido Paterno */}
            <div className="grid grid-cols-2 gap-4">
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
            </div>

            {/* Row 2: Apellido Materno y DNI */}
            <div className="grid grid-cols-2 gap-4">
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
        </section>

        {/* Seguridad */}
        <section className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
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
