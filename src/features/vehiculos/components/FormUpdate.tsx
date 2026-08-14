import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import type { UpdateVehiculo } from "../../../types/vehiculos.type";
import ContentForm from "../../../components/layouts/ContentForm";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import InputSelect from "../../../components/ui/InputSelect.tsx";
import InputText from "../../../components/ui/InputText.tsx";
import InputNumber from "../../../components/ui/InputNumber.tsx";
import {
  marcas,
  getModelsByMarca
} from "../../../config/marcaModeloVehiculo.ts"
import { useUpdateVehiculo } from "../hooks/useUpdateVehiculo";
import { useFetchVehiculo } from "../hooks/useFetchVehiculo";

interface FormUpdateProps {
  showFormUpdate: (p: boolean) => void;
  idVehiculo: number;
  onSuccess?: () => void;
}

export default function FormUpdate({ showFormUpdate, idVehiculo, onSuccess }: FormUpdateProps) {
  const { 
    vehiculo: dataVehiculo, 
    isLoading: isLoadingVehiculo, 
    isError: isErrorVehiculo, 
    execute: fetchVehiculo 
  } = useFetchVehiculo(idVehiculo);

  const {
    isLoading: isLoadingVehiculoUpdate,
    isError: isErrorVehiculoUpdate,
    execute: updateVehiculo
  } = useUpdateVehiculo();

  const [ formData, setFormData ] = useState<UpdateVehiculo>({
    idVehiculo: 0,
    anio: "",
    capacidadCarga: 0,
    marca: "",
    modelo: "",
  });

  useEffect(() => {
    if (dataVehiculo){
      setFormData({
        idVehiculo: dataVehiculo.idvehempresa || 0,
        anio: dataVehiculo.anio || "",
        capacidadCarga: parseFloat(dataVehiculo.capacidadCarga)/1000 || 0,
        marca: dataVehiculo.marca || "",
        modelo: dataVehiculo.modelo || "",
      });
    }
  }, [dataVehiculo, idVehiculo]);

  return (
    <ContentForm>
      {/* Header */}
      <div className="flex flex-row gap-2">
        <div className="rounded-xl bg-blue-500/15 p-3 border border-blue-500/20">
          <Truck className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-white">Datos del vehículo</h2>
          <p className="text-sm text-gray-400">Actualiza la información vehículo.</p>
        </div>
      </div>

      <ContentSectionProcess
        isLoading={isLoadingVehiculo}
        isError={isErrorVehiculo}
        textError="Error al cargar la información del vehículo"
        textButtonError="Reintentar"
        fetchData={() => fetchVehiculo}
      >
        {/* Marca, Modelo y Capacidad de carga */}
        <div className="grid grid-cols-3 gap-4">
          <InputSelect
            label="Marca"
            options={marcas}
            placeholder="Selecciona una marca"
            onSelect={(value) => 
              setFormData((prev) => ({ 
                ...prev, 
                marca: value as string,
              }))
            }
            valueSelected={
              formData.marca
            }
          />
          <InputSelect
            label="Modelo"
            options={getModelsByMarca(formData.marca)}
            placeholder="Selecciona un modelo"
            onSelect={(value) => setFormData((prev) => ({ 
              ...prev,
              modelo: value as string,
            }))}
            valueSelected={
              formData.modelo
            }
          />
          <InputNumber
            label="Capacidad máxima de carga (toneladas)"
            placeholder="0.00"
            simbol="TN"
            value={formData.capacidadCarga || 0}
            onChange={(value) => {
              setFormData((prev) => ({
                ...prev,
                capacidadCarga: value
              }))
            }}
          />
        </div>

        {/* Año de fabricación */}
        <div className="grid grid-cols-1 gap-4">
          <InputText 
            label="Año de fabricación"
            value={formData.anio || ""}
            htmlForm={"anioFabricacion"}
            onChange={(value) => {
              setFormData((prev) => ({
                ...prev,
                anio: value
              }))
            }}
          />
        </div>
      </ContentSectionProcess>

      {/* Footer */}
      <div className="flex gap-4 justify-end">
        <ButtonCancelForm
          handleCancel={() => showFormUpdate(false)}
          isLoading={isLoadingVehiculo}
          textButton="Cancelar"
          color="red"
        />
        <ButtonSubmitForm
          handleSubmit={async () => {
            const updated = await updateVehiculo(formData);
            if (updated) {
              onSuccess?.();
              showFormUpdate(false);
            }
          }}
          isLoading={isLoadingVehiculoUpdate}
          isError={isErrorVehiculoUpdate}
          textButton="Guardar"
          textError="Error al actualizar el vehiculo"
        />
      </div>
    </ContentForm>
  );
}
