import { useState } from "react";
import { Info } from "lucide-react";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ContentPage from "../../../components/layouts/ContentPage";
import InputText from "../../../components/ui/InputText";
import HeaderFormPage from "../../../components/layouts/HeaderFormPage";
import Switch from "../../../components/ui/Switch";
import InputSelect from "../../../components/ui/InputSelect";
import { calibreCastania, calidadCastania } from "../../../config/constantes";
import { useCreateProducto } from "../hooks/useCreateProducto";
import type { CreateProducto } from "../../../types/producto.type";

interface FormCreateProps {
  showFormCreate: (p: boolean) => void;
}

export default function FormCreate({ showFormCreate }: FormCreateProps) {
  const [switchState, setSwitchState] = useState<boolean>(true);
  const { 
    isLoading, 
    isError, 
    execute: registrarProducto 
  } = useCreateProducto();

  const [formData, setFormData] = useState<CreateProducto>({
    nombre: "",
    descripcion: "",
    calibre: "",
    calidad: "",
  });

  return (
    <ContentPage>
      {/* Header */}
      <HeaderFormPage
        setShowForm={showFormCreate}
        title="Registro de nuevo producto"
        description="Ingresa los datos del nuevo producto para agregarlo al sistema. Asegúrate de proporcionar información precisa y completa."
      />

      {/* Form */}
      <section className="bg-gray-900 border border-gray-800 rounded-lg p-8 mx-8 my-6">
        <div className="flex items-center gap-2 mb-6">
          <Info className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Información General</h2>
        </div>

        <InputText 
          label="Nombre del producto"
          value={formData.nombre}
          htmlForm="nombre"
          onChange={(value) => setFormData(prev => ({ ...prev, nombre: value }))}
        />

        <InputText 
          label="Descripción del producto"
          value={formData.descripcion}
          htmlForm="descripcion"
          onChange={(value) => setFormData(prev => ({ ...prev, descripcion: value }))}
        />
        <div className="flex items-center gap-2 my-4">
          <span className={`${switchState ? "text-gray-500" : "text-blue-400 font-bold" }`}>
            Seleccionar Calidad
          </span>
          <Switch 
            estado={switchState}
            handleInputChange={() => setSwitchState(!switchState)}
          />
          <span className={`${switchState ? "text-blue-400 font-bold" : "text-gray-500" }`}>
            Seleccionar Calibre
          </span>
        </div>
        {switchState ? (
          <InputSelect 
            label="Calibre"
            onSelect={(value) => setFormData((prev) => {
              const { calidad, ...rest } = prev;
              return {
                ...rest,
                calibre: value as string,
              };
            })}
            options={calibreCastania}
            placeholder="Selecciona un calibre"
          />
        ) : (
          <InputSelect 
            label="Calidad"
            onSelect={(value) => setFormData((prev) => {
              const { calibre, ...rest } = prev;
              return {
                ...rest,
                calidad: value as string,
              };
            })}
            options={calidadCastania}
            placeholder="Selecciona una calidad"
          />
        )}

        {/* Footer */}
        <div className="flex justify-end mt-6 gap-4">
          <ButtonCancelForm
            handleCancel={() => showFormCreate(false)}
            isLoading={isLoading}
            textButton="Cancelar"
          />
          <ButtonSubmitForm
            handleSubmit={async () => {
              await registrarProducto(formData);
              showFormCreate(false);
            }}
            isLoading={isLoading}
            isError={isError}
            textButton="Guardar"
            textError="Error al registrar el producto"
          />
        </div>
      </section>
    </ContentPage>
  );
}
