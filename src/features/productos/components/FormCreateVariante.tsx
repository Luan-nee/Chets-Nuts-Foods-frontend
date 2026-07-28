import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ContentPage from "../../../components/layouts/ContentPage";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import HeaderFormPage from "../../../components/layouts/HeaderFormPage";
import InputSelect from "../../../components/ui/InputSelect";
import { useCreateProducto } from "../hooks/useCreateProducto";
import { useFetchProducto } from "../hooks/useFetchProducto";
import { calibreCastania, calidadCastania } from "../../../config/constantes";
import type { CreateProducto } from "../../../types/producto.type";
import Switch from "../../../components/ui/SwitchTest";

interface FormUpdateEstProps {
  showFormEdit: (p: boolean) => void;
  idProducto: number;
  pagina: number;
}

export default function FormCreateVariante({ showFormEdit, idProducto, pagina }: FormUpdateEstProps) {
  const [switchState, setSwitchState] = useState<boolean>(true);
  const {
    producto,
    isLoading: getProductoByIdIsLoading,
    isError: getProductoByIdIsError,
    execute: obtenerProducto,
  } = useFetchProducto(idProducto, pagina);
  const {
    execute: registrarVariante,
    isLoading: isLoadingCreate,
    isError: isErrorCreate,
  } = useCreateProducto();

  const [formData, setFormData] = useState<CreateProducto>({
    nombre: "",
    descripcion: "",
    calibre: "SIN DEFINIR",
    calidad: "SIN DEFINIR"
  });

  useEffect(() => {
    if (!producto) return;
    setFormData({
      nombre: producto?.nombre || "",
      descripcion: producto?.descripcion || "",
      calibre: producto?.calibreproductdefect || "SIN DEFINIR",
      calidad: producto?.calidadproductodefect || "SIN DEFINIR"
    });
  }, [producto]);

  return (
    <ContentPage>
      {/* Header */}
      <HeaderFormPage 
        title="Registrar variante de un producto"
        description="Define el Calibre y la Calidad de la variante."
        setShowForm={() => showFormEdit(false)}
      />

      {/* Form */}
      <section className="bg-gray-900 border border-gray-800 rounded-lg p-8 mx-8 my-6">
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
              <div>
                <span className="mb-2 font-medium">
                  Nombre del Producto: 
                </span>
                <span>
                  {" " + formData.nombre || "No definido"}
                </span>
              </div>
              <div>
                <span className="mb-2 font-medium">
                  Descripción del Producto: 
                </span>
                <span>
                  {" " + formData.descripcion || "No definido"}
                </span>
              </div>
              <div>
                { formData.calibre == "SIN DEFINIR" ? (
                    <div className="text-white">Calidad: {formData.calidad}</div>
                  ) : formData.calidad == "SIN DEFINIR" ? (
                    <div className="text-white">Calibre: {formData.calibre}</div>
                  ) : (
                    <>
                      <div className="text-white">Calidad: {formData.calidad}</div>
                      <div className="text-white">Calibre: {formData.calibre}</div>
                    </>
                  )
                }
              </div>
              <div className="flex items-center gap-2 my-4">
                <span className={`${switchState ? "text-gray-500" : "text-blue-400 font-bold" }`}>
                  Seleccionar Calidad
                </span>
                <Switch 
                  estado={switchState}
                  onClick={() => setSwitchState(!switchState)}
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
          </ContentSectionProcess>
        </div>

        {/* Footer */}
        <div className="flex justify-between mt-6 gap-4">
          <div className="flex flex-row gap-2">
            <ButtonCancelForm
              handleCancel={() => showFormEdit(false)}
              isLoading={isLoadingCreate}
              textButton="Cancelar"
            />
            <ButtonSubmitForm
              handleSubmit={async () => {
                await registrarVariante(formData);
                showFormEdit(false)
              }}
              isLoading={isLoadingCreate}
              isError={isErrorCreate}
              textButton="Guardar Variante"
              textError="Error al guardar la variante"
            />
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
