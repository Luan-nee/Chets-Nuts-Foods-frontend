import { useState } from "react";
import { User, Lock, Save, MapPin, Building2 } from "lucide-react";
import InputText from "../components/ui/InputText";
import InputSelectTest from "../components/ui/InputSelect";
import InputPassword from "../components/ui/InputPassword";

export default function Configuraciones() {
  const [infoSUNAT, setInfoSUNAT] = useState({
    ruc: "20603171200",
    correo: "empresa@gmail.com"
  });
  const [infoPersonal, setInfoPersonal] = useState({
    nombres: "Luis Alberto",
    apellidoPaterno: "Quispe",
    apellidoMaterno: "Mendoza",
    dni: "70456789"
  });
  const [infoUbicacion, setInfoUbicacion] = useState({
    departamento: "Madre De Dios",
    provincia: "Tambopata",
    distrito: "Las Piedras",
    direccionDetallada: "Cal. los Triunfadores Mza. a Lote. 12 C.P. el Triunfo (Exserpentario,una Cdra Carret. Interocea)"
  });
  const [password, setPassword] = useState("123456789");

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
            <InputText
              label="RUC"
              value={infoSUNAT.ruc}
              htmlForm="ruc"
              onChange={
                (value) => setInfoSUNAT({ ...infoSUNAT, ruc: value })
              }
            ></InputText>
            {/* Correo electrónico */}
            <InputText
              label="Correo electrónico"
              value={infoSUNAT.correo}
              htmlForm="correo"
              onChange={
                (value) => setInfoSUNAT({ ...infoSUNAT, correo: value })
              }
            ></InputText>
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
              <InputText
                label="Nombres"
                value={infoPersonal.nombres}
                htmlForm="nombres"
                onChange={
                  (value) => setInfoPersonal({ ...infoPersonal, nombres: value })
                }
              />
              
              {/* Apellido Paterno */}
              <InputText
                label="Apellido Paterno"
                value={infoPersonal.apellidoPaterno}
                htmlForm="apellido-paterno"
                onChange={
                  (value) => setInfoPersonal({ ...infoPersonal, apellidoPaterno: value })
                }
              />

              {/* Apellido Materno */}
              <InputText
                label="Apellido Materno"
                value={infoPersonal.apellidoMaterno}
                htmlForm="apellido-materno"
                onChange={
                  (value) => setInfoPersonal({ ...infoPersonal, apellidoMaterno: value })
                }
              />

              {/* DNI */}
              <InputText
                label="DNI"
                value={infoPersonal.dni}
                htmlForm="dni"
                onChange={
                  (value) => setInfoPersonal({ ...infoPersonal, dni: value })
                }
              />
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
              <InputSelectTest
                label="Departamento"
                options={[
                  { value: "Madre De Dios", label: "Madre De Dios" },
                  { value: "Lima", label: "Lima" },
                  { value: "Cusco", label: "Cusco" },
                  { value: "Arequipa", label: "Arequipa" },
                ]}
                placeholder="Selecciona un departamento"
                onSelect={
                  (value) => setInfoUbicacion({ ...infoUbicacion, departamento: value as string })
                }
              />

              {/* Provincia */}
              <InputSelectTest
                label="Provincia"
                options={[
                  { value: "Tambopata", label: "Tambopata" },
                  { value: "Manu", label: "Manu" },
                  { value: "Tahuamanu", label: "Tahuamanu" },
                  { value: "Las Piedras", label: "Las Piedras" },
                ]}
                placeholder="Selecciona una provincia"
                onSelect={
                  (value) => setInfoUbicacion({ ...infoUbicacion, provincia: value as string })
                }
              />

              {/* Distrito */}
              <InputSelectTest
                label="Distrito"
                options={[
                  { value: "Las Piedras", label: "Las Piedras" },
                  { value: "Inambari", label: "Inambari" },
                  { value: "Laberinto", label: "Labertino" },
                  { value: "Puerto Maldonado", label: "Puerto Maldonado" }
                ]}
                placeholder="Selecciona un distrito"
                onSelect={
                  (value) => setInfoUbicacion({ ...infoUbicacion, distrito: value as string })
                }
              />

              {/* Dirección Detallada */}
              <InputText
                label="Dirección detallada"
                value={infoUbicacion.direccionDetallada}
                htmlForm="direccionDetallada"
                onChange={
                  (value) => setInfoUbicacion({ ...infoUbicacion, direccionDetallada: value })
                }
              />
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
            <InputPassword
              label="Contraseña"
              value={password}
              htmlForm="password"
              onChange={
                (value) => setPassword(value)
              }
            />
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button className="px-6 py-2.5 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors text-white">
            Cancelar
          </button>
          <button 
            onClick={
              () => console.log("Información recopilada:", { infoSUNAT, infoPersonal, infoUbicacion, password })
            }
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white">
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
