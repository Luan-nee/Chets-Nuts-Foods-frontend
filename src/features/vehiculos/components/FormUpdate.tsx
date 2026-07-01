import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { marcasVehiculos, modelosVehiculos } from "../../../config/constantes.ts";
import type { UpdateVehiculo } from "../../../types/vehiculos.type";
import type { marca, modelo } from "../../../types/vehiculos.type";
import ContentPage from "../../../components/layouts/ContentPage";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import InputSelectTest from "../../../components/ui/InputSelect.tsx";
import InputText from "../../../components/ui/InputText.tsx";
import InputNumber from "../../../components/ui/InputNumber.tsx";
import HeaderFormPage from "../../../components/layouts/HeaderFormPage.tsx";
import { useFetchVehiculo } from "../hooks/useFetchVehiculo";

interface FormUpdateProps {
  showFormUpdate: (p: boolean) => void;
  idVehiculo: number;
}

export default function FormUpdate({ showFormUpdate, idVehiculo }: FormUpdateProps) {
  const { vehiculo: dataVehiculo, isLoading: isLoadingVehiculo, isError: isErrorVehiculo, execute: fetchVehiculo } = useFetchVehiculo(idVehiculo);
  const [ formData, setFormData ] = useState<UpdateVehiculo>({
    idVehiculo: idVehiculo,
    anio: "",
    capacidadCarga: 0,
    marca: "",
    modelo: "",
  });

  useEffect(() => {
    if (!dataVehiculo) return;
    setFormData({
      idVehiculo: idVehiculo,
      anio: dataVehiculo.anio || "",
      capacidadCarga: Number(dataVehiculo.capacidadCarga) / 10 || 0,
      marca: dataVehiculo.marca || "",
      modelo: dataVehiculo.modelo || "",
    });
  }, [dataVehiculo]);


  return (
    <ContentPage>
      {/* Header */}
      <HeaderFormPage 
        description="Completa la información y guarda los cambios."
        title="Actualiza información del vehículo"
        setShowForm={() => showFormUpdate(false)}
      />

      {/* Form */}
      <section className="bg-gray-900 border border-gray-800 rounded-lg p-8 mx-8 my-6">
        <ContentSectionProcess
          isLoading={isLoadingVehiculo}
          isError={isErrorVehiculo}
          textError="Error al cargar la información del vehículo"
          textButtonError="Reintentar"
          fetchData={() => fetchVehiculo}
        >
          <div className="flex items-center gap-2 mb-6">
            <Info className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Información General</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputSelectTest
                label="Marca"
                options={marcasVehiculos}
                placeholder="Selecciona una marca"
                onSelect={(value) => 
                  setFormData((prev) => ({ 
                    ...prev, 
                    marca: value as marca 
                  }))
                }
                valueSelected={
                  dataVehiculo?.marca
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputSelectTest
                label="Modelo"
                options={modelosVehiculos}
                placeholder="Selecciona un modelo"
                onSelect={(value) => setFormData((prev) => ({ 
                  ...prev,
                  modelo: value as modelo 
                }))}
                valueSelected={
                  dataVehiculo?.modelo
                }
              />

              <InputText 
                label="Año de fabricación"
                value={dataVehiculo ? dataVehiculo.anio?.toString() : ""}
                htmlForm={"anioFabricacion"}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    anio: value
                  }))
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <InputNumber
                label="Capacidad máxima de carga (toneladas)"
                placeholder="0.00"
                simbol="TN"
                defaultValue={dataVehiculo ? Number(dataVehiculo.capacidadCarga) : 0}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    capacidadCarga: value
                  }))
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between mt-6 gap-4">
            <div className="flex gap-2">
              <ButtonCancelForm
                handleCancel={() => showFormUpdate(false)}
                isLoading={isLoadingVehiculo}
                textButton="Cancelar"
              />
              <ButtonSubmitForm
                handleSubmit={async () => {
                  // FALTA IMPLEMENTAR LA LLAMA 
                  // EL ENDPOINT PARA ACTUALIZAR LA INFORMACIÓN 
                  // DEL VEHÍCULO
                  console.log("Datos a enviar:", formData);
                }}
                isLoading={isLoadingVehiculo}
                isError={isErrorVehiculo}
                textButton="Guardar"
                textError="Error al actualizar el vehiculo"
              />
            </div>
          </div>
        </ContentSectionProcess>
      </section>
    </ContentPage>
  );
}
