import { useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ContentPage from "../../../components/layouts/ContentPage";
import InputText from "../../../components/ui/InputText";
import { useCreateProducto } from "../hooks/useCreateProducto";
import type { CreateProducto } from "../../../types/producto.type";

interface FormCreateProps {
  showFormCreate: (p: boolean) => void;
}

export default function FormCreate({ showFormCreate }: FormCreateProps) {

  const { isLoading, isError, execute: registrarProducto } = useCreateProducto();

  const [formData, setFormData] = useState<CreateProducto>({
    nombre: "",
    descripcion: ""
  });

  return (
    <ContentPage>
      {/* Header */}
      <div className="flex gap-4 border bg-gray-900 border-gray-700 rounded-lg px-6 py-4 mb-8">
        <button
          onClick={() => showFormCreate(false)}
          className="p-2 bg-blue-700 hover:bg-blue-500 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Registra un nuevo producto
          </h1>
          <p className="text-gray-400">
            Completa la información y guarda el nuevo producto.
          </p>
        </div>
      </div>

      {/* Form */}
      <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
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

        {/* Footer */}
        <div className="flex justify-end mt-6 gap-4">
          <ButtonCancelForm
            handleCancel={() => showFormCreate(false)}
            isLoading={isLoading}
            textButton="Cancelar"
          />
          <ButtonSubmitForm
            handleSubmit={() => {
              registrarProducto(formData);
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
