import { useEffect, useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ContentPage from "../../../components/layouts/ContentPage";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import InputText from "../../../components/ui/InputText";
import { useFetchProducto } from "../hooks/useFetchProducto";
import { useUpdateProducto } from "../hooks/useUpdateProducto";
import type { UpdateProducto } from "../../../types/producto.type";

interface FormUpdateEstProps {
  showFormEdit: (p: boolean) => void;
  idProducto: number;
  pagina: number;
}

export default function FormUpdate({ showFormEdit, idProducto, pagina }: FormUpdateEstProps) {
  const {
    producto,
    isLoading: getProductoByIdIsLoading,
    isError: getProductoByIdIsError,
    execute: obtenerProducto,
  } = useFetchProducto(idProducto, pagina);
  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    execute: updateProducto,
  } = useUpdateProducto();

  const [formData, setFormData] = useState<UpdateProducto>({
    idProductDefect: idProducto,
    nombre: "",
    descripcion: ""
  });

  useEffect(() => {
    if (!producto) return;
    setFormData({
      idProductDefect: idProducto,
      nombre: producto?.nombre || "",
      descripcion: producto?.descripcion || ""
    });
  }, [producto]);

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
            isLoading={getProductoByIdIsLoading}
            isError={getProductoByIdIsError}
            textError="Error al cargar los datos delproducto."
            textButtonError="Reintentar"
            fetchData={() => obtenerProducto(idProducto, pagina)}
            >
              <InputText
                label="Nombre del Producto"
                value={formData.nombre || ""}
                htmlForm="nombre del producto"
                onChange={(value) => 
                  setFormData({ ...formData, nombre: value })
                }
              />
              <InputText
                label="Descripción del Producto"
                value={formData.descripcion || ""}
                htmlForm="descripcion del producto"
                onChange={(value) => 
                  setFormData({ ...formData, descripcion: value })
                }
              />
          </ContentSectionProcess>
        </div>

        {/* Footer */}
        <div className="flex justify-between mt-6 gap-4">
          <div className="flex flex-row gap-2">
            <ButtonCancelForm
              handleCancel={() => showFormEdit(false)}
              isLoading={isLoadingUpdate}
              textButton="Cancelar"
            />
            <ButtonSubmitForm
              handleSubmit={() => {
                updateProducto(formData);
              }}
              isLoading={isLoadingUpdate}
              isError={isErrorUpdate}
              textButton="Guardar Cambios"
              textError="Error al actualizar"
            />
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
