import { useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import {
  marcasVehiculos,
  modelosVehiculos,
  tiposVehiculos,
} from "../../../config/constantes.ts";
import type { marca, modelo, tipoVehiculo } from "../types/vehiculo.type.ts";
import type { RegistrarVehiculo } from "../types/vehiculo.type";
import InputSelectTest from "../../../components/ui/InputSelect.tsx";
import InputText from "../../../components/ui/InputText";
import InputNumber from "../../../components/ui/InputNumber";
import ContentPage from "../../../components/layouts/ContentPage";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import { useCreateVehiculo } from "../hooks/useCreateVehiculo";

interface FormCreateProps {
  showFormCreate: (p: boolean) => void;
}

export default function FormCreate({ showFormCreate }: FormCreateProps) {
  const { isLoading, isError, fetchData: createVehiculo } = useCreateVehiculo();

  const [formData, setFormData] = useState<RegistrarVehiculo>({
    placa: "",
    marca: "",
    modelo: "",
    anioFabricacion: 0,
    tipoVehiculo: "",
    capacidadCarga: 1,
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
            Registra un nuevo vehiculo
          </h1>
          <p className="text-gray-400">
            Completa la información y guarda el nuevo vehiculo.
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
          <div className="grid grid-cols-2 gap-4">
            <InputSelectTest
              label="Marca"
              placeholder="Selecciona una marca"
              options={marcasVehiculos}
              onSelect={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  marca: value as marca,
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
                  modelo: value as modelo,
                }));
              }}
            />
            <InputText
              label="Año de fabricación"
              value={formData.anioFabricacion.toString()}
              htmlForm={"anioFabricacion"}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  anioFabricacion: parseInt(value) || 0,
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
                  tipoVehiculo: value as tipoVehiculo,
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
            handleSubmit={() => {
              createVehiculo(formData);
              console.log("Datos a enviar:", formData);
            }}
            isLoading={isLoading}
            isError={isError}
            textButton="Guardar"
            textError="Error al crear el vehiculo"
          />
        </div>
      </section>
    </ContentPage>
  );
}
