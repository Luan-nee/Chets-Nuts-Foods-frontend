import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import ContentForm from "../../../components/layouts/ContentForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
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
      descripcion: producto?.descripcion || "",
      calibreproductdefect: producto?.calibreproductdefect || "SIN DEFINIR",
      calidadproductodefect: producto?.calidadproductodefect || "SIN DEFINIR"
    });
  }, [producto]);

  return (
    <ContentForm>
      {/* Header */}
      <div className="flex flex-row gap-2">
        <div className="rounded-xl bg-blue-500/15 p-3 border border-blue-500/20">
          <Package className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-white">Actualiza la información de un producto</h2>
          <p className="text-sm text-gray-400">Modifica la información y guarda los cambios.</p>
        </div>
      </div>

      <ContentSectionProcess
        isLoading={getProductoByIdIsLoading}
        isError={getProductoByIdIsError}
        textError="Error al cargar los datos del producto."
        textButtonError="Reintentar"
        fetchData={() => obtenerProducto(idProducto, pagina)}
      >
        {/* Nombre y descripción del producto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            label="Nombre del Producto"
            value={formData.nombre || ""}
            htmlForm="nombre del producto"
            onChange={(value) =>
              setFormData({ ...formData, nombre: value })
            }
          />
          <InputText
            label="Descripcion del Producto"
            value={formData.descripcion || ""}
            htmlForm="descripcion del producto"
            onChange={(value) =>
              setFormData({ ...formData, descripcion: value })
            }
          />
        </div>
      </ContentSectionProcess>

      {/* Botones */}
      <div className="flex gap-4 justify-end">
        <ButtonCancelForm
          handleCancel={() => showFormEdit(false)}
          isLoading={isLoadingUpdate}
          textButton="Cancelar"
        />
        <ButtonSubmitForm
          handleSubmit={async () => {
            await updateProducto(formData);
            showFormEdit(false)
          }}
          isLoading={isLoadingUpdate}
          isError={isErrorUpdate}
          textButton="Guardar Cambios"
          textError="Error al actualizar"
        />
      </div>
    </ContentForm>
  );
}
