import { 
  useState,
  useEffect
} from "react";
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
    comentario: "",
    latitud: "",
    longitud: "",
  });

  const obtenerUbicacion = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setFormData({ 
        ...formData, 
        latitud: position.coords.latitude.toString(), 
        longitud: position.coords.longitude.toString() 
      });
    });   
  };

  return (
    <div className="flex justify-center flex-col gap-6 w-full p-8">
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
            obtenerUbicacion();
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