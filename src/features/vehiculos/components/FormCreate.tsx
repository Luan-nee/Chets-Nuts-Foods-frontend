import { useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import { marcasVehiculos, modelosVehiculos, tiposVehiculos } from "../../../config/caractVehiculo.ts";
import InputSelect from "../../../components/ui/InputSelect";
import ContentPage from "../../../components/layouts/ContentPage";
import type { RegistrarVehiculo } from "../types/vehiculo.type";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import { useCreateVehiculo } from "../hooks/useCreateVehiculo";

interface FormCreateProps {
  showFormCreate: (p: boolean) => void;
}

export default function FormCreate({ showFormCreate }: FormCreateProps) {
const { isLoading, isError, fetchData: createVehiculo } = useCreateVehiculo();

  const [ formData, setFormData] = useState<RegistrarVehiculo>({
    placa: "",
    marca: "",
    modelo: "",
    anioFabricacion: 0,
    tipoVehiculo: "",
    capacidadCarga: 0
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
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Placa
              </label>
              <input
                type="text"
                placeholder="Ej. ABC-123"
                value={formData.placa}
                onChange={(e) =>
                  handleInputChange("placa", e.target.value)
                }
                className="w-full bg-gray-950 border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Marca
              </label>
              <InputSelect
                inputName={"marca"}
                placeholder="Selecciona una marca"
                options={marcasVehiculos}
                handleInputChange={handleInputChange}
              />
            </div>
          </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Modelo
            </label>
            <InputSelect
              inputName={"modelo"}
              placeholder="Selecciona un modelo"
              options={modelosVehiculos}
              handleInputChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Año de fabricación
            </label>
            <input
              type="number"
              placeholder="Ej. 2020"
              value={formData.anioFabricacion}
              onChange={(e) =>
                handleInputChange("anioFabricacion", parseInt(e.target.value) || 0)
              }
              className="w-full bg-gray-950 border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de vehículo
            </label>
            <InputSelect
              inputName={"tipoVehiculo"}
              placeholder="Selecciona un tipo de vehículo"
              options={tiposVehiculos}
              handleInputChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Capacidad maxima de carga (toneladas)
            </label>
            <input
              type="number"
              placeholder="Ej. 2020"
              value={formData.capacidadCarga}
              onChange={(e) =>
                handleInputChange("capacidadCarga", parseInt(e.target.value) || 0)
              }
              className="w-full bg-gray-950 border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
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
