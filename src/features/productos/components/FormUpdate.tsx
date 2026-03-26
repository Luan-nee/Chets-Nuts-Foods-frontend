import { useEffect, useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ContentPage from "../../../components/layouts/ContentPage";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import type { ModificarProducto } from "../types/producto.type";
import { useUpdateProducto } from "../hooks/useUpdateProducto";
import { useFetchDetallesProducto } from "../hooks/useFetchDetallesProducto";
import { useInhabilitarProducto } from "../hooks/useInhabilitarProducto";

interface FormUpdateEstProps {
  showFormEdit: (p: boolean) => void;
  idProducto: number;
}

export default function FormUpdate({ showFormEdit, idProducto }: FormUpdateEstProps) {
  const {
    isLoading,
    isError,
    refresh: updateProducto,
  } = useUpdateProducto();

  const { data: detallesProducto, isLoading: isLoadingDetalles, isError: isErrorDetalles, fetchData: fetchDetallesProducto } = useFetchDetallesProducto(idProducto);
  const { isLoading: isLoadingInhabilitar, isError: isErrorInhabilitar, refresh: refreshInhabilitar } = useInhabilitarProducto();

  const [formData, setFormData] = useState<ModificarProducto>({
    nombre: "",
    peso: 0,
    unidadMedida: 0,
  });

  useEffect(() => {
    if (!detallesProducto) return;

    setFormData({
      nombre: detallesProducto.nombre || "",
      peso: detallesProducto.peso || 0,
      unidadMedida: detallesProducto.unidadMedidaId || 0,
    });
  }, [detallesProducto]);

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
          onClick={() => showFormEdit(false)}
          className="p-2 bg-blue-700 hover:bg-blue-500 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Actualiza la información de un producto
          </h1>
          <p className="text-gray-400">
            Modifica la información y guarda los cambios.
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
          <ContentSectionProcess
            isLoading={isLoadingDetalles}
            isError={isErrorDetalles}
            textError="Error al cargar los detalles del producto."
            textButtonError="Reintentar"
            fetchData={() => fetchDetallesProducto(idProducto)}
            >
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
          </ContentSectionProcess>
        </div>

        {/* Footer */}
        <div className="flex justify-between mt-6 gap-4">
          <div>
            <ButtonSubmitForm
              handleSubmit={() => {
                refreshInhabilitar(idProducto);
                console.log("Producto inhabilitado ID:", idProducto);
              }}
              isLoading={isLoadingInhabilitar}
              isError={isErrorInhabilitar}
              textButton="Inhabilitar Producto"
              textError="Error al inhabilitar"
            />
          </div>
          <div className="flex flex-row gap-2">
            <ButtonCancelForm
              handleCancel={() => showFormEdit(false)}
              isLoading={isLoading}
              textButton="Cancelar"
            />
            <ButtonSubmitForm
              handleSubmit={() => {
                updateProducto(idProducto, formData);
                console.log("Datos a enviar:", formData);
                console.log("ID del producto a actualizar:", idProducto);
              }}
              isLoading={isLoading}
              isError={isError}
              textButton="Guardar Cambios"
              textError="Error al actualizar"
            />
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
