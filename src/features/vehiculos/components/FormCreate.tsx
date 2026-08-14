import { useState } from "react";
import { Truck } from "lucide-react";
import type { CreateVehiculo } from "../../../types/vehiculos.type";
import InputSelectTest from "../../../components/ui/InputSelect.tsx";
import ContentForm from "../../../components/layouts/ContentForm";
import InputText from "../../../components/ui/InputText";
import InputNumber from "../../../components/ui/InputNumber";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import {
  marcas,
  getModelsByMarca
} from "../../../config/marcaModeloVehiculo.ts";
import { useCreateVehiculo } from "../hooks/useCreateVehiculo";

interface FormCreateProps {
  showFormCreate: (p: boolean) => void;
  onSuccess?: () => void;
}

export default function FormCreate({ showFormCreate, onSuccess }: FormCreateProps) {
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
    tipoVehiculo: "pesado_multiuso",
  });

  return (
    <ContentForm>
      {/* Header */}
      <div className="flex flex-row gap-2">
        <div className="rounded-xl bg-blue-500/15 p-3 border border-blue-500/20">
          <Truck className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-white">Datos del vehículo</h2>
          <p className="text-sm text-gray-400">Registra la información del nuevo vehículo.</p>
        </div>
      </div>

      {/* Placa y Marca */}
      <div className="grid grid-cols-2 gap-4">
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

      {/* Año de fabricación y Modelo */}
      <div className="grid grid-cols-3 gap-4">
        <InputSelectTest
          label="Marca"
          placeholder="Selecciona una marca"
          options={marcas}
          onSelect={(value) => {
            setFormData((prev) => ({
              ...prev,
              marca: value as string,
            }));
          }}
        />
        <InputSelectTest
          label="Modelo"
          options={getModelsByMarca(formData.marca)}
          placeholder="Selecciona un modelo"
          onSelect={(value) => {
            setFormData((prev) => ({
              ...prev,
              modelo: value as string,
            }));
          }}
        />
        <InputNumber
          label="Capacidad máxima de carga (toneladas)"
          simbol="TN"
          value={formData.capacidadCarga}
          placeholder="0"
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              capacidadCarga: value,
            }))
          }
        />
      </div>

      {/* Footer */}
      <div className="flex gap-4 justify-end">
        <ButtonCancelForm
          handleCancel={() => showFormCreate(false)}
          isLoading={isLoading}
          textButton="Cancelar"
        />
        <ButtonSubmitForm
          handleSubmit={async () => {
            const created = await registrarVehiculo(formData);
            if (created) {
              onSuccess?.();
              showFormCreate(false);
            }
          }}
          isLoading={isLoading}
          isError={isError}
          textButton="Guardar"
          textError="Error al registra nuevo vehiculo"
        />
      </div>
    </ContentForm>
  );
}
