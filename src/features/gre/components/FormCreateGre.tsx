import { Truck, User, Package, Book, Check, ArrowLeft, ArrowRight} from 'lucide-react';
import { useState } from 'react';
import MtcRemitenteDestinatario from './MtcRemitenteDestinatario';
import BienesDatosDeCarga from './BienesDatosDeCarga';

type TypeProcedimientoUi = {
  focus: boolean,
  label: string, 
  status: boolean, 
  icon: React.ReactNode
}

export default function FormCreateGre() {
  const [ procedimiento, setProcedimiento ] = useState<TypeProcedimientoUi[]>(
    [
      { label: 'Datos Generales', status: false, icon: <Book className="w-4 h-4 text-white" />, focus: true},
      { label: 'Bienes y Carga', status: false, icon: <Package className="w-4 h-4 text-white" />, focus: false},
      { label: 'Productos', status: false, icon: <Package className="w-4 h-4 text-white" />, focus: false},
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
        
        <div className="flex gap-3 mt-8">
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
        procedimiento.find(p => p.focus)?.label === "Datos Generales" && <MtcRemitenteDestinatario />
      }
      {
        procedimiento.find(p => p.focus)?.label === "Bienes y Carga" && <BienesDatosDeCarga />
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