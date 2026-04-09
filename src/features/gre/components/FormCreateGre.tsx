import { Truck, Package, Book, Check, ArrowLeft, ArrowRight, ChevronLeft, LocationEditIcon, List} from 'lucide-react';
import { useState } from 'react';
import type { EmitirGre } from '../types/gre.type';
import ButtonSubmitForm from '../../../components/ui/ButtonSubmitForm';
import MtcRemitenteDestinatario from './FormCreateGre/MtcRemitenteDestinatario';
import BienesDatosDeCarga from './FormCreateGre/BienesDatosDeCarga';
import RutaDeTraslado from './FormCreateGre/RutaDeTraslado';
import ConductorVehiculo from './FormCreateGre/ConductorVehiculo';
import { useEmitirGuiaRemision } from '../hooks/useEmitirGuiaRemision';

type TypeProcedimientoUi = {
  focus: boolean,
  label: string, 
  status: boolean, 
  icon: React.ReactNode
}

interface FormCreateGreProps {
  setShowFormCreateGre: (p: boolean) => void;
}

export default function FormCreateGre({ setShowFormCreateGre }: FormCreateGreProps) {
  const { isLoading, isError, fetchData: emitirGre } = useEmitirGuiaRemision();
  const [ formData, setFormData ] = useState<EmitirGre>({
    numero_registro_MTC: "",
    remitente: {
      tipo_documento: "",
      numero_documento: "",
      nombre_razonSocial: ""
    },
    destinatario: {
      tipo_documento: "",
      numero_documento: "",
      nombre_razonSocial: ""
    },
    pagador_flete: {
      tipo_documento: "",
      numero_documento: "",
      nombre_razonSocial: ""
    },
    bienes_transportados: [],
    punto_partida: {
      departamento: "",
      provincia: "",
      distrito: "",
      direccion_detallada: ""
    },
    punto_llegada: {
      departamento: "",
      provincia: "",
      distrito: "",
      direccion_detallada: ""
    },
    datos_de_transporte: {
      idVehículo: 1,
      idConductor: 2,
      fecha_inicio_traslado: "",
      indicadores_retorno: {
        retorno_envases_vacios: false,
        retorno_vehiculo_vacio: true,
        transporte_subcontratado: false
      }
    }
  }); 
  const handleAddProductToList = (
    field: string, 
    value: {
      idProducto: number;
      cantidad: number;
    }
  ) => {
    setFormData((prev) => ({
        ...prev,
        [field]: [...prev.bienes_transportados, value]
      })
    );
  };
  const handleRemoveProductFromList = (
    field: string,
    index: number,
  ) => {
    setFormData((prev) => {
      const newList = [...prev.bienes_transportados];
      newList.splice(newList.findIndex((bien) => bien.idProducto === index), 1);
      return {
        ...prev,
        [field]: newList
      }
    });
  }

  const [ procedimiento, setProcedimiento ] = useState<TypeProcedimientoUi[]>(
    [
      { label: 'Datos Generales', status: false, icon: <Book className="w-4 h-4 text-white" />, focus: true},
      { label: 'Bienes y Carga', status: false, icon: <Package className="w-4 h-4 text-white" />, focus: false},
      { label: 'Ruta de Traslado', status: false, icon: <LocationEditIcon className="w-4 h-4 text-white" />, focus: false},
      { label: 'Transporte', status: false, icon: <Truck className="w-4 h-4 text-white" />, focus: false},
    ] 
  );
  
  const pushSiguiente = () => {
    const indexFocus = procedimiento.findIndex(p => p.focus);
    setProcedimiento(prev => {
      const newProcedimiento = [...prev];
      if(indexFocus !== procedimiento.length - 1) {
        newProcedimiento[indexFocus].focus = false;
        newProcedimiento[indexFocus].status = true;
        newProcedimiento[indexFocus + 1].focus = true;
      }
      return newProcedimiento;
    });
  }
  const pushAnterior = () => {
    const indexFocus = procedimiento.findIndex(p => p.focus);
    setProcedimiento(prev => {
      const newProcedimiento = [...prev];
      if(indexFocus > 0) {
        newProcedimiento[indexFocus].focus = false;
        newProcedimiento[indexFocus].status = false;
        newProcedimiento[indexFocus - 1].focus = true;
        newProcedimiento[indexFocus - 1].status = false;
      }
      return newProcedimiento;
    });
  }

  return (
    <div className="relative flex-1 flex flex-col ">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-900 px-8 py-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">EMISIÓN DE GUÍA DE REMISIÓN</h1>
          <p className="text-gray-400">Siga los pasos para completar la información de transporte.</p>
        </div>
        {/* Botones */}
        <div className="flex gap-3 mt-8">
          <button 
            onClick={() => setShowFormCreateGre(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            Cancelar
          </button>
          <ButtonSubmitForm
            handleSubmit={() => {
              emitirGre(formData);
              console.log("Datos enviados:", formData);
            }}
            isLoading={isLoading}
            isError={isError}
            textButton="Emitir GRE"
            textError="Error al emitir GRE"
            color="green"
          />
          <button 
            onClick={pushAnterior}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            Anterior
          </button>
          <button 
            onClick={pushSiguiente}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white"
          >
            Siguiente
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              console.log("----> PRODUCTOS REGISTRADOS:", formData);
              console.log("formData.bienes_transportados: ", formData.bienes_transportados);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white"
          >
            Mostrar datos registrados
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Procedimiento */}
      <div className="flex items-center gap-4 px-6 py-4">
        {
          procedimiento.map((p, index) => (
            <Procedimiento key={index} label={p.label} status={p.status} icon={p.icon} focus={p.focus} />
          ))
        }
      </div>

      {/* contenido procedural */}
      {
        procedimiento.find(p => p.focus)?.label === "Datos Generales" && <MtcRemitenteDestinatario setFormData={setFormData} formData={formData}/>
      }
      {
        procedimiento.find(p => p.focus)?.label === "Bienes y Carga" && <BienesDatosDeCarga setFormData={setFormData} handleAddProductToList={handleAddProductToList} handleRemoveProductFromList={handleRemoveProductFromList} formData={formData}/>
      }
      {
        procedimiento.find(p => p.focus)?.label === "Ruta de Traslado" && <RutaDeTraslado />
      }
      {
        procedimiento.find(p => p.focus)?.label === "Transporte" && <ConductorVehiculo />
      }
    </div>
  );
}

function Procedimiento({label, status, icon, focus}: TypeProcedimientoUi) {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 ${status ? 'bg-green-500' : focus ? 'bg-blue-500' : 'bg-gray-700'} rounded-full flex items-center justify-center`}>
          { status ? <Check className="w-4 h-4 text-white" /> : icon }
        </div>
        <span className={`text-sm font-medium ${status ? 'text-green-400' : focus ? 'text-blue-500' : 'text-gray-400'}`}>{label}</span>
      </div>

      { label !== "Transporte" && (
        <div className={`flex-1 h-px ${status ? 'bg-green-400' : 'bg-gray-700'}`}></div>
      )}
    </>
  );
}