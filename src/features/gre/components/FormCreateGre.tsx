import { Fragment, useState } from 'react';
import { Truck, Package, Check, ArrowLeft, ArrowRight, ChevronLeft, LocationEditIcon, List} from 'lucide-react';
import ContentPage from '../../../components/layouts/ContentPage';
// import TableSelectProductos from '../../productos/components/TableSelectProductos';
import FormSalidaTransporte from './FormCreateGre/FormSalidaTransporte';
import FormPaquete from './FormCreateGre/FormPaquete';
import type { ProductoEnPaquete } from '../../../types/constantes.type';
import type { SalidaTransporteFormData, PaqueteFormData } from '../../../types/constantes.type';
import FormProductos from './FormCreateGre/FormProductos';
import FormEmitirGre from './FormCreateGre/FormEmitirGre';
import { useGreContext } from '../../../context/GreContext';

export interface FormCreateGreData {
  salidaTransporte: SalidaTransporteFormData,
  paquete: PaqueteFormData,
  productos: ProductoEnPaquete[]
}

type TypeProcedimientoUi = {
  focus: boolean,
  label: string, 
  status: boolean, 
  icon: React.ReactNode
}

interface FormCreateGreProps {
  setShowFormCreateGre: (p: boolean) => void;
}

import { InfoWarning } from '../../../components/messages/InfoWarning';

export default function FormCreateGre({ setShowFormCreateGre }: FormCreateGreProps) {
  const { dataEmitirGre } = useGreContext();  
  const [ procedimiento, setProcedimiento ] = useState<TypeProcedimientoUi[]>(
    [
      { label: 'Salida transporte', status: false, icon: <Package className="w-4 h-4 text-white" />, focus: true},
      { label: 'Paquete', status: false, icon: <LocationEditIcon className="w-4 h-4 text-white" />, focus: false},
      { label: 'Productos', status: false, icon: <Truck className="w-4 h-4 text-white" />, focus: false},
      { label: 'Transporte', status: false, icon: <Truck className="w-4 h-4 text-white" />, focus: false},
    ] 
  );
  
  const pushSiguiente = () => {
    const indexFocus = procedimiento.findIndex(p => p.focus);
    
    // Validar que se haya seleccionado una Salida de Transporte antes de pasar al paso de Paquetes
    if (procedimiento[indexFocus].label === 'Salida transporte') {
      if (!dataEmitirGre.idSalidaTransporte || dataEmitirGre.idSalidaTransporte === 0) {
        InfoWarning(
          "Salida de transporte requerida",
          "Debe seleccionar o registrar una salida de transporte antes de continuar al paso de Paquetes."
        );
        return;
      }
    }

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
    <ContentPage>
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-900 px-8 py-6">
        <div>
          <h1 className="text-xl font-bold mb-2">EMISIÓN DE GUÍA DE REMISIÓN</h1>
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
              console.log('Datos registrados: ', dataEmitirGre)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white"
          >
            Mostrar datos registrados
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* UI Progresivo */}
      <div className="flex items-center gap-4 px-6 py-4">
        {
          procedimiento.map((p, index) => (
            <Fragment key={index}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 ${p.status ? 'bg-green-500' : p.focus ? 'bg-blue-500' : 'bg-gray-700'} rounded-full flex items-center justify-center`}>
                  { p.status ? <Check className="w-4 h-4 text-white" /> : p.icon }
                </div>
                <span className={`text-sm font-medium ${p.status ? 'text-green-400' : p.focus ? 'text-blue-500' : 'text-gray-400'}`}>{p.label}</span>
              </div>

              { p.label !== "Transporte" && (
                <div className={`flex-1 h-px ${p.status ? 'bg-green-400' : 'bg-gray-700'}`}></div>
              )}
            </Fragment>
          ))
        }
      </div>
      
      { procedimiento.find(p => p.focus)?.label === "Salida transporte" &&
        <FormSalidaTransporte />
      }
      { procedimiento.find(p => p.focus)?.label === "Paquete" &&
        <FormPaquete />
      }
      { procedimiento.find(p => p.focus)?.label === "Productos" &&
        <FormProductos />
      }
      { procedimiento.find(p => p.focus)?.label === "Transporte" &&
        <FormEmitirGre />
      }
    </ContentPage>
  );
}