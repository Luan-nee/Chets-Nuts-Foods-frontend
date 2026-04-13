import { useEffect, useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import { marcasVehiculos, modelosVehiculos, tiposVehiculos } from "../../../config/constantes.ts";
import type { EditarVehiculo } from "../types/vehiculo.type";
import type { marca, modelo, tipoVehiculo } from "../types/vehiculo.type.ts";
import ContentPage from "../../../components/layouts/ContentPage";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import InputSelectTest from "../../../components/ui/InputSelectTest.tsx";
import InputText from "../../../components/ui/InputText.tsx";
import InputNumber from "../../../components/ui/InputNumber.tsx";
import { useFetchVehiculo } from "../hooks/useFetchVehiculo";
import { useInhabilitarVehiculo } from "../hooks/useInhabilitarVehiculo";

interface FormUpdateProps {
  showFormUpdate: (p: boolean) => void;
  idVehiculo: number;
}

export default function FormUpdate({ showFormUpdate, idVehiculo }: FormUpdateProps) {
  const { data: dataVehiculo, isLoading: isLoadingVehiculo, isError: isErrorVehiculo, fetchData: fetchVehiculo } = useFetchVehiculo(idVehiculo);
  const { isLoading: isLoadingInhabilitar, isError: isErrorInhabilitar, fetchData: fetchInhabilitar } = useInhabilitarVehiculo();

  const [ formData, setFormData ] = useState<EditarVehiculo>({
    placa: "",
    marca: "",
    modelo: "",
    anioFabricacion: 0,
    tipoVehiculo: "",
    capacidadCarga: 0
  });

  useEffect(() => {
    if (!dataVehiculo) return;
    setFormData({
      placa: dataVehiculo.placa || "",
      marca: dataVehiculo.marca || "",
      modelo: dataVehiculo.modelo || "",
      tipoVehiculo: dataVehiculo.tipoVehiculo || "",
      anioFabricacion: dataVehiculo.anioFabricacion || 0,
      capacidadCarga: dataVehiculo.capacidadCarga || 0
    });
  }, [dataVehiculo]);


  return (
    <ContentPage>
      {/* Header */}
      <div className="flex gap-4 border bg-gray-900 border-gray-700 rounded-lg px-6 py-4 mb-8">
        <button
          onClick={() => showFormUpdate(false)}
          className="p-2 bg-blue-700 hover:bg-blue-500 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Actualiza información del vehículo
          </h1>
          <p className="text-gray-400">
            Completa la información y guarda los cambios.
          </p>
        </div>
      </div>

      {/* Form */}
      <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
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

              <InputText 
                label="Placa"
                value={dataVehiculo ? dataVehiculo.placa : ""}
                htmlForm={"placa"}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    placa: value
                  }))
                }}
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
                value={dataVehiculo ? dataVehiculo.anioFabricacion.toString() : ""}
                htmlForm={"anioFabricacion"}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    anioFabricacion: parseInt(value) || 0
                  }))
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputSelectTest
                label="Tipo de vehículo"
                options={tiposVehiculos}
                placeholder="Selecciona un tipo de vehículo"
                onSelect={(value) => setFormData((prev) => ({ 
                  ...prev, 
                  tipoVehiculo: value as tipoVehiculo 
                }))}
                valueSelected={
                  dataVehiculo?.tipoVehiculo
                }
              />

              <InputNumber
                label="Capacidad máxima de carga (toneladas)"
                placeholder="0.00"
                simbol="TN"
                defaultValue={dataVehiculo?.capacidadCarga as number || 0}
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
            <div>
              <ButtonSubmitForm
                color={"green"}
                handleSubmit={() => {
                  fetchInhabilitar(idVehiculo);
                  console.log("Inhabilitar vehículo con ID:", idVehiculo);
                }}
                isLoading={isLoadingInhabilitar}
                isError={isErrorInhabilitar || isErrorVehiculo}
                textButton="Inhabilitar vehículo"
                textError="Error al inhabilitar vehículo"
              />
            </div>
            <div className="flex gap-2">
              <ButtonCancelForm
                handleCancel={() => showFormUpdate(false)}
                isLoading={isLoadingVehiculo || isLoadingInhabilitar}
                textButton="Cancelar"
              />
              <ButtonSubmitForm
                handleSubmit={() => {
                  console.log("Datos a enviar:", formData);
                }}
                isLoading={isLoadingVehiculo || isLoadingInhabilitar}
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
