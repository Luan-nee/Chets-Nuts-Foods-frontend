import { Flag } from "lucide-react";
import InputSelectTest from "../../../../components/ui/InputSelect";
import InputText from "../../../../components/ui/InputText";
import type { EmitirGre } from '../../types/gre.type';

const departamentos = [
  { value: "Madre De Dios", label: "Madre De Dios" },
  { value: "Lima", label: "Lima" },
  { value: "Cusco", label: "Cusco" },
  { value: "Arequipa", label: "Arequipa" }
]
const provincias = [
  { value: "Tambopata", label: "Tambopata" },
  { value: "Manu", label: "Manu" },
  { value: "Tahuamanu", label: "Tahuamanu" }
]
const distritos = [
  { value: "Laberinto", label: "Laberinto" },
  { value: "Tambopata", label: "Tambopata" },
  { value: "Inambari", label: "Inambari" }
]

interface RutaDeTrasladoProps {
  setFormData: React.Dispatch<React.SetStateAction<EmitirGre>>;
  formData: EmitirGre;
}

export default function RutaDeTranslado({ setFormData, formData }: RutaDeTrasladoProps) {
  return (
    <div className="flex flex-col gap-4 px-8 py-6">
      {/* Route Cards Grid */}
      <div className="grid grid-cols-1 bg-gray-900 p-4 gap-6 mb-8">
        {/* Punto de Llegada */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <Flag className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Punto de Llegada</h2>
            <p className="text-xs text-gray-400">
              Destino final del traslado
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Departamento */}
          <InputSelectTest
            inputName="Departamento"
            placeholder="Seleccionar departamento"
            options={departamentos}
            handleInputChange={(value) => {
              setFormData((prev) => ({ 
                ...prev, 
                punto_llegada: {
                  ...prev.punto_llegada,
                  departamento: value
                } 
              }));
            }}
          />

          {/* Provincia */}
          <InputSelectTest
            inputName="Provincia"
            placeholder="Seleccionar provincia"
            options={provincias}
            handleInputChange={(value) => {
              setFormData((prev) => ({ 
                ...prev, 
                punto_llegada: {
                  ...prev.punto_llegada,
                  provincia: value
                } 
              }));
            }}
          />

          {/* Distrito */}
          <InputSelectTest
            inputName="Distrito"
            placeholder="Seleccionar distrito"
            options={distritos}
            handleInputChange={(value) => {
              setFormData((prev) => ({ 
                ...prev, 
                punto_llegada: {
                  ...prev.punto_llegada,
                  distrito: value
                } 
              }));
            }}
          />

          {/* Dirección Detallada */}
          <InputText
            label="Dirección Detallada"
            value={formData.punto_llegada.direccion_detallada}
            htmlForm="direccionLlegada"
            onChange={(value) => setFormData((prev) => ({ 
                ...prev, 
                punto_llegada: { 
                  ...prev.punto_llegada, 
                  direccion_detallada: value 
                } 
              }
            ))}
          />
        </div>
      </div>
    </div>
  );
}
