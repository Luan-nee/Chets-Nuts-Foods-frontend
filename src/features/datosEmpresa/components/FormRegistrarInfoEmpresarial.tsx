import { User } from "lucide-react";
import { useState, useEffect } from "react";
import InputText from "../../../components/ui/InputText";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import { useRegistrarInfoEmpresarial } from "../hook/useRegistrarInfoEmpresarial";
import { useFetchInfoEmpresa } from "../hook/useFetchInfoEmpresa";
import type { UpdateDatosEmpresa } from "../../../types/datosEmpresa.type";
import DateTimePicker from "../../../components/ui/SelectDateTime";

interface FormRegistrarInfoEmpresarialProps {
  setShowForm: (p: boolean) => void;
}

export default function FormRegistrarInfoEmpresarial({ setShowForm }: FormRegistrarInfoEmpresarialProps) {
  const { isLoading: isLoadingDatosEmpresa, isError: isErrorDatosEmpresa, execute: registrarDatosEmpresarial } = useRegistrarInfoEmpresarial();
  const { infoEmpresa, isError } = useFetchInfoEmpresa();

  const [formDataEmpresa, setFormDataEmpresa] = useState<UpdateDatosEmpresa>({
    ruc: "",
    denominacion: "",
    numeroRegistroMtc: "",
    correo: "",
    codigoMtc: "",
    fechaVigenciaRegistroMtc: "",
    claveAcceso: "",
  });

  useEffect(() => {
    if (infoEmpresa) {
      setFormDataEmpresa({
        ruc: infoEmpresa.ruc || "",
        denominacion: infoEmpresa.denominacion || "",
        numeroRegistroMtc: infoEmpresa.numeroRegistroMtc || "",
        correo: infoEmpresa.correo || "",
        codigoMtc: infoEmpresa.codigoMtc || "",
        fechaVigenciaRegistroMtc: "",
        claveAcceso: infoEmpresa.claveAcceso || "",
      });
    }
  }, [infoEmpresa]);

  return (
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
        {/* Código MTC */}
        <InputText
          label="Código MTC"
          value={formDataEmpresa.codigoMtc}
          htmlForm="codigo-mtc"
          onChange={
            (value) => setFormDataEmpresa({ ...formDataEmpresa, codigoMtc: value })
          }
        />
        {/* fecha de vigencia registro MTC */}
        <DateTimePicker
          label="Fecha de Vigencia del Registro en la MTC"
          value={formDataEmpresa.fechaVigenciaRegistroMtc}
          onChange={(val) => {
            const formattedDate = val
              ? `${val.date.getFullYear()}-${String(val.date.getMonth() + 1).padStart(2, '0')}-${String(val.date.getDate()).padStart(2, '0')}`
              : "";
            setFormDataEmpresa({ ...formDataEmpresa, fechaVigenciaRegistroMtc: formattedDate });
          }}
        />
        {/* Código de acceso */}
        <InputText
          label="Token de acceso"
          value={formDataEmpresa.claveAcceso || ""}
          htmlForm="token-acceso"
          onChange={
            (value) => setFormDataEmpresa({ ...formDataEmpresa, claveAcceso: value })
          }
        />
      </div>
      <div className="flex gap-3 pt-4">
        <ButtonCancelForm
          handleCancel={() => {
            setShowForm(false)
          }}
          isLoading={isLoadingDatosEmpresa}
          textButton="Cancelar"
          color="red"
        />
        <ButtonSubmitForm
          handleSubmit={async () => {
            await registrarDatosEmpresarial(formDataEmpresa, isError)
            setShowForm(false)
          }}
          isLoading={isLoadingDatosEmpresa}
          isError={isErrorDatosEmpresa}
          textButton="Registrar información"
          textError="Error al guardar los cambios"
          color="blue"
        />
      </div>
    </div>
  );
}