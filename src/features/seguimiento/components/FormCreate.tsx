import { useState } from "react";
import InputText from "../../../components/ui/InputText";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
// import Switch from "../../../components/ui/Switch";
import type { RegistrarSeguimiento } from "../../../types/seguimiento.type";
import TableSelectSalidaTransporte from "../../transporte/components/TableSelectSalidaTransporte";
import { useRegistrarSeguimientoTransporte } from "../hooks/useRegistrarSeguimientoTransporte";

export default function FormCreate() {
  const {
    isLoading: cargandoRegistrarSeguimiento,
    isError: errorRegistrarSeguimiento,
    execute: registrarSeguimiento
  } = useRegistrarSeguimientoTransporte();
  const [ selectIdSalidaTransporte, setSelectIdSalidaTransporte ] = useState<number | null>(null);
  const [ showTableSelectSalidaTransporte, ] = useState<boolean>(false);
  const [ formData, setFormData ] = useState<RegistrarSeguimiento>({
    titulo: "",
    direccion: "",
    comentario: ""
  });

  return (
    <div className="flex justify-center flex-col gap-6 w-full p-8">
      {/* Card guía */}
      {/* <div className="bg-blue-900/20 border border-blue-900 rounded-xl p-4">
        <div className="flex gap-4 mb-4">
          <div className="p-4 rounded-lg bg-blue-900 flex items-center justify-center">
            <FileText className="w-6 h-6 text-white"/>
          </div>
          <div>
            <h2 className="font-bold text-blue-500 text-lg">
              GUÍA #0000-0000
            </h2>
            <p className="text-xs uppercase text-gray-400 tracking-wider">
              Referencia de envío
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 items-start">
          <MapPin
            size={18}
            className="text-blue-400 mt-1"
          />
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Destino
            </p>
            <p className="font-medium">
              texto de dirección de destino del envío, que puede ser largo.
            </p>
          </div>
        </div>
      </div> */}

      {/* <div className="flex items-center justify-end gap-4">
        <Switch 
          estado={showTableSelectSalidaTransporte}
          handleInputChange={() => setShowTableSelectSalidaTransporte(!showTableSelectSalidaTransporte)}
        />
        <span className="text-sm text-gray-400">
          Mostrar tabla de selección de salida de transporte
        </span>
      </div> */}

      {/* Formulario */}
      <InputText 
        htmlForm="titulo"
        label="Título"
        onChange={(value) => {
          setFormData({ ...formData, titulo: value });
        }}
        value={formData.titulo ?? ""}
      />

      {/* Dirección */}
      <InputText 
        htmlForm="direccion"
        label="Dirección"
        onChange={(value) => {
          setFormData({ ...formData, direccion: value });
        }}
        value={formData.direccion ?? ""}
      />

      {/* Comentario */}
      <InputText 
        htmlForm="comentario"
        label="Comentario"
        onChange={(value) => {
          setFormData({ ...formData, comentario: value });
        }}
        value={formData.comentario ?? ""}
      />
      
      <TableSelectSalidaTransporte 
        onChange={(idSalidaTransporte) => setSelectIdSalidaTransporte(idSalidaTransporte)}
        selectIdSalidaTransporte={(selectIdSalidaTransporte) => setSelectIdSalidaTransporte(selectIdSalidaTransporte)}
      />
      
      {/* Botón */}
      { !showTableSelectSalidaTransporte && (
        <ButtonSubmitForm 
          handleSubmit={async () => {
            await registrarSeguimiento(formData, selectIdSalidaTransporte as number);
            console.log("Formulario enviado:", formData);
          }}
          isError={errorRegistrarSeguimiento}
          isLoading={cargandoRegistrarSeguimiento}
          textButton="Registrar estado"
          textError="No se pudo registrar el seguimiento. Intenta nuevamente."
          color="blue"
        />
      )}
      { showTableSelectSalidaTransporte && (
        <ButtonSubmitForm 
          handleSubmit={async () => {
            console.log("Formulario enviado:", formData);
          }}
          isError={false}
          isLoading={false}
          textButton="Registrar último estado"
          textError=" No se pudo registrar el último seguimiento. Intenta nuevamente."
          color="green"
        />
      )}
      
    </div>
  )
}