import { useState } from "react";
import InputText from "../../../../components/ui/InputText";
import TableSelectCliente from "../../../clientes/components/TableSelectCliente";
import TableSelectSalidaTransporte from "../../../transporte/components/TableSelectSalidaTransporte";
import type { FormData } from '../FormCreateGre';

interface FormPaqueteProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function FormEstablecimiento({ setFormData }: FormPaqueteProps) {
  const [, setIdSalidaTransporte] = useState<number | null>(null);
  const [, setIdCliente] = useState<number | null>(null);

  return (
    <>
      <div className="px-6 py-4 bg-gray-900 mx-6">
        <InputText 
          htmlForm='clave de seguimiento'
          label='Clave de seguimiento'
          onChange={(value) => setFormData((prev) => ({
            ...prev,
            paquete: {
              ...prev.paquete,
              clave: value
            }
          }))}
          value={''}
        />
        <TableSelectSalidaTransporte 
        selectIdSalidaTransporte={setIdSalidaTransporte} 
        onChange={(setIdSalidaTransporte) => {
          setFormData((prev) => ({
            ...prev,
            paquete: {
              ...prev.paquete,
              idSalidaTransporte: setIdSalidaTransporte || 0
            }
          }));
        }} />
        <TableSelectCliente 
        selectIdCliente={setIdCliente} 
        onChange={(setIdCliente) => {
          setFormData((prev) => ({
            ...prev,
            paquete: {
              ...prev.paquete,
              idUsuarioDestino: setIdCliente || 0
            }
          }));
        }} />
      </div>
    </>
  );
}