import { useState } from "react";
import { Package } from "lucide-react";
import ContentForm from "../../../components/layouts/ContentForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import InputText from "../../../components/ui/InputText";
import { useCreateProducto } from "../hooks/useCreateProducto";
import type { CreateProducto } from "../../../types/producto.type";

interface FormCreateProps {
  showFormCreate: (p: boolean) => void;
}

export default function FormCreate({ showFormCreate }: FormCreateProps) {
  const { 
    isLoading, 
    isError, 
    execute: registrarProducto 
  } = useCreateProducto();

  const [formData, setFormData] = useState<CreateProducto>({
    nombre: "",
    descripcion: ""
  });

  return (
    <ContentForm>
      {/* Header */}
      <div className="flex flex-row gap-2">
        <div className="rounded-xl bg-blue-500/15 p-3 border border-blue-500/20">
          <Package className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-white">Registro de nuevo producto</h2>
          <p className="text-sm text-gray-400">Ingresa los datos del nuevo producto para agregarlo al sistema.</p>
        </div>
      </div>

      {/* Nombre y descripción del producto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputText 
          label="Nombre del producto"
          value={formData.nombre}
          htmlForm="nombre"
          onChange={(value) => setFormData((prev) => ({ ...prev, nombre: value }))}
        />

        <InputText 
          label="Descripcion del producto"
          value={formData.descripcion}
          htmlForm="descripcion"
          onChange={(value) => setFormData((prev) => ({ ...prev, descripcion: value }))}
        />
      </div>

      {/* Botones */}
      <div className="flex gap-4 justify-end">
        <ButtonCancelForm
          handleCancel={() => showFormCreate(false)}
          isLoading={isLoading}
          textButton="Cancelar"
          color="red"
        />
        <ButtonSubmitForm
          handleSubmit={async () => {
            await registrarProducto(formData);
            showFormCreate(false);
          }}
          isLoading={isLoading}
          isError={isError}
          textButton="Guardar producto"
          textError="Error al registrar el producto"
          color="blue"
        />
      </div>
    </ContentForm>
  );
}
