import { useState } from "react";
import { MapPin, User } from "lucide-react";
import { registrarInfoEmpresarial } from "../hook/useRegistrarInfoEmpresarial";
import { useRegistrarUbicacionEmpresa } from "../hook/useRegistrarUbicacionEmpresa";
import InputText from "../../../components/ui/InputText";
import InputSelectTest from "../../../components/ui/InputSelect";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ContentPage from "../../../components/layouts/ContentPage";
import type { UpdateDatosEmpresa, InfoUbicacionState } from "../../../types/datosEmpresa.type";

interface FormProps {
  setShowFormCreate: (p: boolean) => void;
}

export default function Form({setShowFormCreate}: FormProps) {
  const { isLoading: isLoadingDatosEmpresa, isError: isErrorDatosEmpresa, execute: registrarDatosEmpresarial } = registrarInfoEmpresarial();
  const { isLoading: isLoadingUbiEmpresa , isError: isErrorUbiEmpresa, execute: registrarUbicacionEmpresa } = useRegistrarUbicacionEmpresa();
  const [formDataUbicacion, setFormDataUbicacion] = useState<InfoUbicacionState>({
    nombreEstablecimiento: "chets nuts foods",
    departamento: "",
    provincia: "",
    distrito: "",
    direccion: "",
    descripcion: "empresa principal",
    latitud: "",
    longitud: "",
    ubigeo: "",
    idResponsable: 1,
    tipoEstado: "oficina"
  });
  const [formDataEmpresa, setFormDataEmpresa] = useState<UpdateDatosEmpresa>({
    ruc: "",
    denominacion: "",
    numeroRegistroMtc: "",
    correo: "",
    codigoMtc: "",
    fechaVigenciaRegistroMtc: ""
  });

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
              {/* RUC */}
              <InputText
                label="RUC"
                value={formDataEmpresa.ruc}
                htmlForm="ruc"
                onChange={
                  (value) => setFormDataEmpresa({ ...formDataEmpresa, ruc: value })
                }
              />
              {/* Correo electrónico */}
              <InputText
                label="Correo electrónico"
                value={formDataEmpresa.correo}
                htmlForm="correo"
                onChange={
                  (value) => setFormDataEmpresa({ ...formDataEmpresa, correo: value })
                }
              />
              
              {/* denominacion */}
              <InputText
                label="Denominación"
                value={formDataEmpresa.denominacion}
                htmlForm="denominacion"
                onChange={
                  (value) => setFormDataEmpresa({ ...formDataEmpresa, denominacion: value })
                }
              />
              {/* número de registro en la MTC */}
              <InputText
                label="Número de Registro en la MTC"
                value={formDataEmpresa.numeroRegistroMtc}
                htmlForm="numero-registro-mtc"
                onChange={
                  (value) => setFormDataEmpresa({ ...formDataEmpresa, numeroRegistroMtc: value })
                }
              />
              {/* fecha de vigencia registro MTC */}
              <InputText
                label="Fecha de Vigencia del Registro en la MTC"
                value={formDataEmpresa.fechaVigenciaRegistroMtc}
                htmlForm="fecha-vigencia-registro-mtc"
                onChange={
                  (value) => setFormDataEmpresa({ ...formDataEmpresa, fechaVigenciaRegistroMtc: value })
                }
              />
            </div>
            <div className="flex gap-3 pt-4">
              <ButtonSubmitForm 
                handleSubmit={() => {
                  registrarDatosEmpresarial(formDataEmpresa)
                  setShowFormCreate(false)
                }}
                isLoading={isLoadingDatosEmpresa}
                isError={isErrorDatosEmpresa}
                textButton="Registrar información"
                textError="Error al guardar los cambios"
                color="blue"
              />
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
              {/* Departamento */}
              <InputSelectTest
                label="Departamento"
                options={[
                  { value: "MADRE DE DIOS", label: "MADRE DE DIOS" },
                  { value: "Lima", label: "Lima" },
                  { value: "Cusco", label: "Cusco" },
                  { value: "Arequipa", label: "Arequipa" },
                ]}
                placeholder="Selecciona un departamento"
                onSelect={
                  (value) => setFormDataUbicacion({ ...formDataUbicacion, departamento: value as string })
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
                  (value) => setFormDataUbicacion({ ...formDataUbicacion, provincia: value as string })
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
                  (value) => setFormDataUbicacion({ ...formDataUbicacion, distrito: value as string })
                }
              />

              {/* Dirección Detallada */}
              <InputText
                label="Dirección detallada"
                value={formDataUbicacion.direccion}
                htmlForm="direccionDetallada"
                onChange={
                  (value) => setFormDataUbicacion({ ...formDataUbicacion, direccion: value })
                }
              />
              {/* Latitud */}
              <InputText
                label="Latitud"
                value={formDataUbicacion.latitud}
                htmlForm="latitud de la empresa"
                onChange={
                  (value) => setFormDataUbicacion({ ...formDataUbicacion, latitud: value })
                }
              />
              {/* Longitud */}
              <InputText
                label="Longitud"
                value={formDataUbicacion.longitud}
                htmlForm="longitud de la empresa"
                onChange={
                  (value) => setFormDataUbicacion({ ...formDataUbicacion, longitud: value })
                }
              />
              {/* Ubigeo */}
              <InputText
                label="Ubigeo"
                value={formDataUbicacion.ubigeo}
                htmlForm="ubigeo de la empresa"
                onChange={
                  (value) => setFormDataUbicacion({ ...formDataUbicacion, ubigeo: value })
                }
              />
            </div>
            <div className="flex gap-3 pt-4">
              <ButtonSubmitForm 
                handleSubmit={() => {
                  registrarUbicacionEmpresa(formDataUbicacion);
                  setShowFormCreate(false);
                }}
                isLoading={isLoadingUbiEmpresa}
                isError={isErrorUbiEmpresa}
                textButton="Registrar información"
                textError="Error al guardar los cambios"
                color="blue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}