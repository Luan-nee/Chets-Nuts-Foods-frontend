import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useRegistrarUbicacionEmpresa } from "../hook/useRegistrarUbicacionEmpresa";
import InputText from "../../../components/ui/InputText";
import InputSelectTest from "../../../components/ui/InputSelect";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm"
import {
  departamentos,
  getDistritosByProvincia,
  getProvinciasByDepartamento,
} from "../../../config/infoUbicacion";
import type { InfoUbicacionState } from "../../../types/datosEmpresa.type";

interface FormRegistrarInfoEstablecimientoProps {
  setShowForm: (p: boolean) => void;
}

export default function FormRegistrarInfoEstablecimiento({setShowForm}: FormRegistrarInfoEstablecimientoProps) {
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
    ubigeo: "211102",
    idResponsable: 1,
    tipoEstado: "oficina"
  });

  const [isLoadingUbicacionActual, setIsLoadingUbicacionActual] = useState(false);
  const [errorUbicacionActual, setErrorUbicacionActual] = useState("");

  useEffect(() => {
    if (formDataUbicacion.latitud !== "" || formDataUbicacion.longitud !== "") return;

    if (!navigator.geolocation) {
      setErrorUbicacionActual("Tu navegador no soporta geolocalización");
      return;
    }

    setIsLoadingUbicacionActual(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormDataUbicacion((prev) => ({
          ...prev,
          latitud: position.coords.latitude.toString(),
          longitud: position.coords.longitude.toString(),
        }));
        setIsLoadingUbicacionActual(false);
      },
      () => {
        setErrorUbicacionActual("No se pudo obtener tu ubicación actual. Ingrésala manualmente.");
        setIsLoadingUbicacionActual(false);
      }
    );
    // Solo se ejecuta una vez al montar, para completar la ubicación inicial si viene vacía.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const provinciasDisponibles = getProvinciasByDepartamento(formDataUbicacion.departamento);
  const distritosDisponibles = getDistritosByProvincia(formDataUbicacion.departamento, formDataUbicacion.provincia);

  return (
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
          options={departamentos}
          placeholder="Selecciona un departamento"
          onSelect={
            (value) => setFormDataUbicacion({ ...formDataUbicacion, departamento: value as string, provincia: "", distrito: "" })
          }
        />

        {/* Provincia */}
        <InputSelectTest
          label="Provincia"
          options={provinciasDisponibles}
          placeholder="Selecciona una provincia"
          onSelect={
            (value) => setFormDataUbicacion({ ...formDataUbicacion, provincia: value as string, distrito: "" })
          }
        />

        {/* Distrito */}
        <InputSelectTest
          label="Distrito"
          options={distritosDisponibles}
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
        {isLoadingUbicacionActual && (
          <p className="text-xs text-gray-400">Obteniendo tu ubicación actual...</p>
        )}
        {errorUbicacionActual && (
          <p className="text-xs text-red-400">{errorUbicacionActual}</p>
        )}
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
        <ButtonCancelForm
          handleCancel={ () => {
            setShowForm(false)
          }}
          isLoading={isLoadingUbiEmpresa}
          textButton="Cancelar"
          color="red"
        />
        <ButtonSubmitForm 
          handleSubmit={() => {
            registrarUbicacionEmpresa(formDataUbicacion);
            setShowForm(false);
          }}
          isLoading={isLoadingUbiEmpresa}
          isError={isErrorUbiEmpresa}
          textButton="Guardar"
          textError="Error al guardar los cambios"
          color="blue"
        />
      </div>
    </div>
  )
}