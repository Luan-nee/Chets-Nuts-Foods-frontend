import { useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import InputSelect from "../../../components/ui/InputSelect";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ContentPage from "../../../components/layouts/ContentPage";
import { UNIDAD_PESO } from "../../../config/unidadPedo";
import type { CrearProducto } from "../types/producto.type";
import { useCreateProducto } from "../hooks/useCreateProducto";

interface FormCreateProps {
  showFormCreate: (p: boolean) => void;
}

export default function FormCreate({ showFormCreate }: FormCreateProps) {

  const { isLoading, isError, refresh: createProducto } = useCreateProducto();

  const [formData, setFormData] = useState<CrearProducto>({
    nombre: "",
    peso: 0,
    unidadMedidaId: 0
  });

  const handleInputChange = (
    field: string,
    value: string | boolean | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre del Producto
              </label>
              <input
                type="text"
                placeholder="Ej. Castaña de cajú"
                value={formData.nombre}
                onChange={(e) =>
                  handleInputChange("nombre", e.target.value)
                }
                className="w-full bg-gray-950 border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Peso
              </label>
              <input
                type="number"
                placeholder="Ej. 10.5"
                value={formData.peso}
                onChange={(e) =>
                  handleInputChange("peso", e.target.value)
                }
                className="w-full bg-gray-950 border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Unidad de Medida
              </label>
              <InputSelect
                inputName={"unidadMedidaId"}
                placeholder="Selecciona una unidad de medida"
                options={UNIDAD_PESO.map((option) => ({
                  value: option.id,
                  label: option.medida,
                }))}
                handleInputChange={handleInputChange}
                valueSelect={1}
              />
            </div>
          </div>
      </div>

        {/* Footer */}
        <div className="flex justify-end mt-6 gap-4">
          <ButtonCancelForm
            handleCancel={() => showFormCreate(false)}
            isLoading={isLoading}
            textButton="Cancelar"
          />
          <ButtonSubmitForm
            handleSubmit={() => {
              createProducto(formData);
              console.log("Datos a enviar:", formData);
            }}
            isLoading={isLoading}
            isError={isError}
            textButton="Guardar"
            textError="Error al crear el producto"
          />
        </div>
      </section>
    </ContentPage>
  );
}
