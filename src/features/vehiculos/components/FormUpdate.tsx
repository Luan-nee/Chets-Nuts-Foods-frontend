import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import type { UpdateVehiculo } from "../../../types/vehiculos.type";
import ContentPage from "../../../components/layouts/ContentPage";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import InputSelect from "../../../components/ui/InputSelect.tsx";
import InputText from "../../../components/ui/InputText.tsx";
import InputNumber from "../../../components/ui/InputNumber.tsx";
import HeaderFormPage from "../../../components/layouts/HeaderFormPage.tsx";
import {
  marcas,
  getModelsByMarca
} from "../../../config/marcaModeloVehiculo.ts"
import { useUpdateVehiculo } from "../hooks/useUpdateVehiculo";
import { useFetchVehiculo } from "../hooks/useFetchVehiculo";

/*
  TAREA PENDIENTE:
  La capacidad de carga del vehículo no se muestra
  en la interfaz y hasta el momento no se encontró
  una solución a este problema. Se requiere investigar y corregir
*/

interface FormUpdateProps {
  showFormUpdate: (p: boolean) => void;
  idVehiculo: number;
}

export default function FormUpdate({ showFormUpdate, idVehiculo }: FormUpdateProps) {
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
    <ContentPage>
      {/* Header */}
      <HeaderFormPage 
        title="Actualiza información del vehículo"
        description="Completa la información y guarda los cambios."
        setShowForm={() => showFormUpdate(false)}
      />
      <div className="grid grid-cols-2 gap-4 px-8">
        {/* Información del vehículo */}
        <section className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold py-2 text-center border-b border-gray-800">
            INFORMACIÓN ACTUAL DEL VEHÍCULO
          </h2>
          <ContentSectionProcess
            isLoading={isLoadingVehiculo}
            isError={isErrorVehiculo}
            textError="Error al cargar la información del vehículo"
            textButtonError="Reintentar"
            fetchData={() => fetchVehiculo}
          > 
            <div className="grid grid-cols-1 gap-4 p-4 text-center">
              <p className="text-gray-300">
                <span className="font-semibold">Placa: </span> 
                <span className="inline-flex text-xl flex-col items-center justify-center bg-[#FACC15] text-[#1E1E1E] font-bold px-3 py-0.5 rounded-[3px] border-2 border-black border-double shadow-sm tracking-widest leading-none select-none text-base font-extrabold font-mono tracking-wider pt-0.5">
                  {dataVehiculo?.placa}
                </span>
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Marca:</span> {dataVehiculo?.marca}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Modelo:</span> {dataVehiculo?.modelo}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Año:</span> {dataVehiculo?.anio}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Capacidad de carga (TN):</span> {dataVehiculo?.capacidadCarga}
              </p>
            </div>
          </ContentSectionProcess>
        </section>

        {/* Form */}
        <section className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <ContentSectionProcess
            isLoading={isLoadingVehiculo}
            isError={isErrorVehiculo}
            textError="Error al cargar la información del vehículo"
            textButtonError="Reintentar"
            fetchData={() => fetchVehiculo}
          >
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold">Rellena el formulario con los nuevos datos del vehículo</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
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
              </div>

              <div className="grid grid-cols-1 gap-4">
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
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-6">
              <div className="flex gap-2">
                <ButtonCancelForm
                  handleCancel={() => showFormUpdate(false)}
                  isLoading={isLoadingVehiculo}
                  textButton="Cancelar"
                  color="red"
                />
                <ButtonSubmitForm
                  handleSubmit={async () => {
                    // hacer conversión de toneladas a kilogramos antes de enviar los datos al backend
                    setFormData((prev) => ({
                      ...prev,
                      capacidadCarga: prev.capacidadCarga * 1000
                    }));
                    await updateVehiculo(formData);
                    showFormUpdate(false);
                  }}
                  isLoading={isLoadingVehiculoUpdate}
                  isError={isErrorVehiculoUpdate}
                  textButton="Guardar"
                  textError="Error al actualizar el vehiculo"
                />
              </div>
            </div>
          </ContentSectionProcess>
        </section>
      </div>
    </ContentPage>
  );
}
