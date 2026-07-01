import { useState } from "react";
import { Info } from "lucide-react";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ContentPage from "../../../components/layouts/ContentPage";
import InputText from "../../../components/ui/InputText";
import HeaderFormPage from "../../../components/layouts/HeaderFormPage";
import { useCreateProducto } from "../hooks/useCreateProducto";
import type { CreateProducto } from "../../../types/producto.type";
import Swal from "sweetalert2";

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

        {/* Footer */}
        <div className="flex justify-end mt-6 gap-4">
          <ButtonCancelForm
            handleCancel={() => showFormCreate(false)}
            isLoading={isLoading}
            textButton="Cancelar"
          />
          <ButtonSubmitForm
            handleSubmit={async() => {
              const datoss  = await registrarProducto(formData);
              const status = datoss.status
              const mensaje = datoss.message? datoss.message :"Producto registrado exitosamente";
              Swal.fire({
                title: mensaje,
                icon: status,
                position: "center",
                showConfirmButton: status === "success"?false:true,
                theme:"dark",
                timer:1500
              }).then(()=>{
                if(datoss.status === "success"){
                  showFormCreate(false)
                }
              });
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
