import { User } from "lucide-react";
import { useState } from "react";
import InputText from "../../../components/ui/InputText";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import { registrarInfoEmpresarial } from "../hook/useRegistrarInfoEmpresarial";
import type { UpdateDatosEmpresa } from "../../../types/datosEmpresa.type";

interface FormRegistrarInfoEmpresarialProps {
  setShowForm: (p: boolean) => void;
}

export default function FormRegistrarInfoEmpresarial({setShowForm}: FormRegistrarInfoEmpresarialProps) {
  const { isLoading: isLoadingDatosEmpresa, isError: isErrorDatosEmpresa, execute: registrarDatosEmpresarial } = registrarInfoEmpresarial();

  const [formDataEmpresa, setFormDataEmpresa] = useState<UpdateDatosEmpresa>({
    ruc: "",
    denominacion: "",
    numeroRegistroMtc: "",
    correo: "",
    codigoMtc: "",
    fechaVigenciaRegistroMtc: "",
    urlApi: "https://sandbox.apisunat.pe/api/v3/dispatches",
    claveAcceso: "537.KqEU17Wl0lzO3jYjhVR2SNfqGnqtKFOvoJa7MRyzTrPHfvqeQFrA3xSAPnXaRRtaYdL0oyKVVagFOoIW2OOtKn735RGiH1sYIPR7Ixr5Dx9fIP54mp286t07"
  });

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
        <ButtonCancelForm 
          handleCancel={ () => {
            setShowForm(false)
          }}
          isLoading={isLoadingDatosEmpresa}
          textButton="Cancelar"
          color="red"
        />
        <ButtonSubmitForm 
          handleSubmit={() => {
            registrarDatosEmpresarial(formDataEmpresa)
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