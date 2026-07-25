import { useState } from "react";
import HeaderFormPage from "../../../components/layouts/HeaderFormPage";
import InputText from "../../../components/ui/InputText";
import ContentPage from "../../../components/layouts/ContentPage";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import type { RegistrarSeguimiento } from "../../../types/seguimiento.type";
import { useRegistrarSeguimientoTransporte } from "../hooks/useRegistrarSeguimientoTransporte";

interface FormCreateEmpleadoProps {
  setShowFormCreateEmpleado: (p: boolean) => void;
}

export default function FormCreate({ setShowFormCreateEmpleado }: FormCreateEmpleadoProps ) {
  const {
    isLoading: cargandoRegistrarSeguimiento,
    isError: errorRegistrarSeguimiento,
    execute: registrarSeguimiento
  } = useRegistrarSeguimientoTransporte();

  const [ formData, setFormData ] = useState<RegistrarSeguimiento>({
    titulo: "",
    direccion: "",
    comentario: ""
  });

  return (
    <ContentPage>
      {/* Header */}
      <HeaderFormPage 
        setShowForm={setShowFormCreateEmpleado}
        title="Registro de nuevo empleado"
        description="Ingresa los datos del nuevo empleado para agregarlo al sistema. Asegúrate de proporcionar información precisa y completa."
      />

      {/* Form */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mx-8 my-6">
        <div className="space-y-6">
          {/* Row 1: Nombre y DNI */}
          <div className="grid grid-cols-2 gap-6">
            <InputText
              label="Titulo"
              htmlForm="titulo"
              value={formData.titulo ?? ""}
              onChange={(value) => setFormData(prev => ({ ...prev, titulo: value }))}
            />
            <InputText
              label="Comentario"
              value={formData.comentario ?? ""}
              htmlForm="comentario"
              onChange={(value) => setFormData(prev => ({ ...prev, comentario: value }))}
            />
          </div>

          {/* Row 2: Apellidos */}
          <div className="grid grid-cols-2 gap-6">
            <InputText
              label="Dirección"
              value={formData.direccion ?? ""}
              htmlForm="direccion"
              onChange={(value) => setFormData(prev => ({ ...prev, direccion: value }))}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-4 w-full justify-end">
          <div className="flex flex-row gap-4">
            <ButtonCancelForm
              handleCancel={() => setShowFormCreateEmpleado(false)}
              isLoading={cargandoRegistrarSeguimiento}
              textButton="Cancelar"
              color="red"
            />
            <ButtonSubmitForm
              handleSubmit={async () => {
                await registrarSeguimiento(formData, 1); // Aquí debes pasar el idSalidaTransporte correspondiente
              }}
              isLoading={cargandoRegistrarSeguimiento}
              isError={errorRegistrarSeguimiento}
              textButton="Guardar Cambios"
              textError={"Error al registrar seguimiento"}
              color="blue"
            />
          </div>
        </div>
      </div>
    </ContentPage>
  )
}