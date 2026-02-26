import { Truck, Package, Book, Check, ArrowLeft, ArrowRight, ChevronLeft, LocationEditIcon} from 'lucide-react';
import { useState } from 'react';
import type { GreFormData } from '../../../types/gre.type';
import MtcRemitenteDestinatario from './MtcRemitenteDestinatario';
import BienesDatosDeCarga from './BienesDatosDeCarga';
import RutaDeTraslado from './RutaDeTraslado';
import ConductorVehiculo from './ConductorVehiculo';

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
  const [ formData, setFormData ] = useState<GreFormData>({
  transportistaid: 2,
  remitente: {
    tipo_documento: "RUC",
    numero_documento: "20123456789",
    nombre_razonSocial: "Corporación Logística del Sur S.A.C."
  },
  destinatario: {
    tipo_documento: "RUC",
    numero_documento: "20987654321",
    nombre_razonSocial: "Distribuidora de Alimentos Santa Rosa"
  },
  pagador_flete: {
    tipo_documento: "RUC",
    numero_documento: "20123456789",
    nombre_razonSocial: "Corporación Logística del Sur S.A.C."
  },
  bienes_transportados: [
    {
      codigo_del_bien: "PROD-001",
      descripcion_detallada_del_bien: "Sacos de harina de trigo especial 50kg",
      unidad_de_medida_del_bien: "Sacos",
      cantidad: 120
    },
    {
      codigo_del_bien: "S/C",
      descripcion_detallada_del_bien: "Pallets de madera de retorno",
      unidad_de_medida_del_bien: "Unidades",
      cantidad: 10
    }
  ],
  carga: {
    unidad_medida: "KILOGRAMO",
    peso_bruto_total: 6500.50
  },
  punto_partida: {
    departamento: "Lima",
    provincia: "Lima",
    distrito: "Ate",
    direccion_detallada: "Av. Industrial 450 - Almacén Central"
  },
  punto_llegada: {
    departamento: "Arequipa",
    provincia: "Arequipa",
    distrito: "Cerro Colorado",
    direccion_detallada: "Calle Prolongación Bolognesi S/N - Sector B"
  },
  datos_de_transporte: {
    placa_vehiculo: "V3X-982",
    dni_conductor: "45882233",
    licencia_conductor: "A3C-45882233",
    fecha_inicio_traslado: "2026-02-25",
    indicadores_retorno: {
      retorno_envases_vacios: false,
      retorno_vehiculo_vacio: true,
      transporte_subcontratado: false
    }
  }
});

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
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors text-white"
          >
            <Check className="w-5 h-5" />
            Emitir GRE
          </button>
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
        procedimiento.find(p => p.focus)?.label === "Datos Generales" && <MtcRemitenteDestinatario setFormData={(formData) => setFormData(prev => ({...prev, ...formData}))} />
      }
      {
        procedimiento.find(p => p.focus)?.label === "Bienes y Carga" && <BienesDatosDeCarga />
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