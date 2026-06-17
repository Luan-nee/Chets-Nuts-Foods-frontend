import { useState } from "react";
import { Building2, Lock, MapPin, User } from "lucide-react";
import { useUpdateDatosEmpresa } from "../hook/useUpdateDatosEmpresa";
import type { UpdateDatosEmpresa } from "../../../types/datosEmpresa.type";
import InputText from "../../../components/ui/InputText";
import InputSelectTest from "../../../components/ui/InputSelect";
import InputPassword from "../../../components/ui/InputPassword";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";

type InfoPersonalState = {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  dni: string;
};

type InfoUbicacionState = {
  departamento: string;
  provincia: string;
  distrito: string;
  direccionDetallada: string;
};

export default function Form() {
  const { isLoading, isError, execute: actualizarDatosEmpresa } = useUpdateDatosEmpresa();
  const [formData, setFormData] = useState<UpdateDatosEmpresa>({
    ruc: "",
    denominacion: "",
    numeroRegistroMtc: "",
    correo: "",
    codigoMtc: "",
    urlApi: "",
    claveAcceso: "",
    fechaVigenciaRegistroMtc: ""
  });
  const [infoPersonal, setInfoPersonal] = useState<InfoPersonalState>({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    dni: "",
  });
  const [infoUbicacion, setInfoUbicacion] = useState<InfoUbicacionState>({
    departamento: "",
    provincia: "",
    distrito: "",
    direccionDetallada: "",
  });
  const [password, setPassword] = useState<string>("");

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
                  Información empresarial
                </h2>
                <p className="text-xs text-gray-400">
                  Recuerda que esta información se usará para generar tus guias
                  de remisión, asegúrate de que sea correcta.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* RUC */}
              <InputText
                label="RUC"
                value={formData.ruc}
                htmlForm="ruc"
                onChange={
                  (value) => setFormData({ ...formData, ruc: value })
                }
              />
              {/* Correo electrónico */}
              <InputText
                label="Correo electrónico"
                value={formData.correo}
                htmlForm="correo"
                onChange={
                  (value) => setFormData({ ...formData, correo: value })
                }
              />
              
              {/* denominacion */}
              <InputText
                label="Denominación"
                value={formData.denominacion}
                htmlForm="denominacion"
                onChange={
                  (value) => setFormData({ ...formData, denominacion: value })
                }
              />
              {/* número de registro en la MTC */}
              <InputText
                label="Número de Registro en la MTC"
                value={formData.numeroRegistroMtc}
                htmlForm="numero-registro-mtc"
                onChange={
                  (value) => setFormData({ ...formData, numeroRegistroMtc: value })
                }
              />
              {/* fecha de vigencia registro MTC */}
              <InputText
                label="Fecha de Vigencia del Registro en la MTC"
                value={formData.fechaVigenciaRegistroMtc}
                htmlForm="fecha-vigencia-registro-mtc"
                onChange={
                  (value) => setFormData({ ...formData, fechaVigenciaRegistroMtc: value })
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
          <ButtonCancelForm
            handleCancel={() => console.log("Operación cancelada")}
            isLoading={false}
            textButton="Cancelar"
            color="red"
          />
          <ButtonSubmitForm 
            handleSubmit={() => actualizarDatosEmpresa(formData)}
            isLoading={isLoading}
            isError={isError}
            textButton="Guardar Cambios"
            textError="Error al guardar los cambios"
            color="blue"
          />
        </div>
      </div>
    </div>
  );
}