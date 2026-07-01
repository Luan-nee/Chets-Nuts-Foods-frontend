import { useState } from "react";
import { Info } from "lucide-react";
import {
  marcasVehiculos,
  modelosVehiculos,
  tiposVehiculos,
} from "../../../config/constantes.ts";
import type { CreateVehiculo } from "../../../types/vehiculos.type";
import InputSelectTest from "../../../components/ui/InputSelect.tsx";
import InputText from "../../../components/ui/InputText";
import InputNumber from "../../../components/ui/InputNumber";
import ContentPage from "../../../components/layouts/ContentPage";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import HeaderFormPage from "../../../components/layouts/HeaderFormPage";
import { useCreateVehiculo } from "../hooks/useCreateVehiculo";

interface FormCreateProps {
  showFormCreate: (p: boolean) => void;
}

export default function FormCreate({ showFormCreate }: FormCreateProps) {
  const {
    isLoading,
    isError,
    execute: registrarVehiculo,
  } = useCreateVehiculo();

  const [formData, setFormData] = useState<CreateVehiculo>({
    anio: "",
    capacidadCarga: 0,
    marca: "",
    modelo: "",
    placa: "",
    tipoVehiculo: "",
  });

  return (
    <ContentPage>
      {/* Header */}
      <HeaderFormPage
        title="Registrar nuevo vehiculo"
        description="Completa la información y guarda el nuevo vehiculo."
        setShowForm={showFormCreate}
      />

      {/* Form */}
      <section className="bg-gray-900 border border-gray-800 rounded-lg p-8 mx-8 my-6">
        <div className="flex items-center gap-2 mb-6">
          <Info className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Información General</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputSelectTest
              label="Marca"
              placeholder="Selecciona una marca"
              options={marcasVehiculos}
              onSelect={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  marca: value as string,
                }));
              }}
            />
            <InputText
              label="Placa"
              value={formData.placa}
              htmlForm={"placa"}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  placa: value,
                }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputSelectTest
              label="Modelo"
              options={modelosVehiculos}
              placeholder="Selecciona un modelo"
              onSelect={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  modelo: value as string,
                }));
              }}
            />
            <InputText
              label="Año de fabricación"
              value={formData.anio}
              htmlForm={"anio"}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  anio: value,
                }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputSelectTest
              label="Tipo de vehículo"
              options={tiposVehiculos}
              placeholder="Selecciona un tipo de vehículo"
              onSelect={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  tipoVehiculo: value as string,
                }));
              }}
            />

            <InputNumber
              label="Capacidad máxima de carga (toneladas)"
              simbol="TN"
              defaultValue={formData.capacidadCarga}
              placeholder="0"
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  capacidadCarga: value,
                }))
              }
            />
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
            handleSubmit={async () => {
              await registrarVehiculo(formData);
              showFormCreate(false);
            }}
            isLoading={isLoading}
            isError={isError}
            textButton="Guardar"
            textError="Error al registra nuevo vehiculo"
          />
        </div>
      </section>
    </ContentPage>
  );
}
