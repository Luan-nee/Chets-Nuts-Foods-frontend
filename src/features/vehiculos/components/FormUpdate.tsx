import { useEffect, useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import { marcasVehiculos, modelosVehiculos, tiposVehiculos } from "../../../config/caractVehiculo.ts";
import InputSelect from "../../../components/ui/InputSelect";
import ContentPage from "../../../components/layouts/ContentPage";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import type { EditarVehiculo, DetalleVehiculoModificado } from "../types/vehiculo.type";
import ButtonCancelForm from "../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../components/ui/ButtonSubmitForm";
import { useFetchVehiculo } from "../hooks/useFetchVehiculo";
import { useInhabilitarVehiculo } from "../hooks/useInhabilitarVehiculo";

interface FormUpdateProps {
  showFormUpdate: (p: boolean) => void;
  idVehiculo: number;
}

export default function FormUpdate({ showFormUpdate, idVehiculo }: FormUpdateProps) {
  const { data: dataVehiculo, isLoading: isLoadingVehiculo, isError: isErrorVehiculo, fetchData: fetchVehiculo } = useFetchVehiculo(idVehiculo);
  const { isLoading: isLoadingInhabilitar, isError: isErrorInhabilitar, fetchData: fetchInhabilitar } = useInhabilitarVehiculo();

  const [ DataFetch, setDataFetch ] = useState<DetalleVehiculoModificado>({
    placa: "",
    marca: 0,
    modelo: 0,
    anioFabricacion: 0,
    tipoVehiculo: 0,
    capacidadCarga: 0
  });

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
    setDataFetch({
      placa: dataVehiculo.placa || "",
      marca: dataVehiculo.marca || 0,
      modelo: dataVehiculo.modelo || 0,
      anioFabricacion: dataVehiculo.anioFabricacion || 0,
      tipoVehiculo: dataVehiculo.tipoVehiculo || 0,
      capacidadCarga: dataVehiculo.capacidadCarga || 0,
    });
    setFormData({
      placa: dataVehiculo.placa || "",
      marca: marcasVehiculos[dataVehiculo.marca]?.value || "",
      modelo: modelosVehiculos[dataVehiculo.modelo]?.value || "",
      tipoVehiculo: tiposVehiculos[dataVehiculo.tipoVehiculo]?.value || "",
      anioFabricacion: dataVehiculo.anioFabricacion || 0,
      capacidadCarga: dataVehiculo.capacidadCarga || 0
    });
  }, [dataVehiculo]);

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
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Placa
                </label>
                <input
                  type="text"
                  placeholder="Ej. ABC-123"
                  value={DataFetch.placa}
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
                  valueSelect={DataFetch.marca}
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
                  valueSelect={DataFetch.modelo}
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
                  value={DataFetch.anioFabricacion}
                  onChange={(e) =>
                    handleInputChange("anioFabricacion", e.target.value)
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
                  valueSelect={DataFetch.tipoVehiculo}
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
                  value={DataFetch.capacidadCarga}
                  onChange={(e) =>
                    handleInputChange("capacidadCarga", e.target.value)
                  }
                  className="w-full bg-gray-950 border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
                />
              </div>
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
