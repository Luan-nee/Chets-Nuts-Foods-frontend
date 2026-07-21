import { useState } from 'react';
import { MapPin, Calendar, CheckCircle } from 'lucide-react';
import TableSelectSalidaTransporte from '../features/transporte/components/TableSelectSalidaTransporte';
import ContentSectionProcess from '../components/layouts/ContentSectionProcess';
import { useFetchSeguimientoSalidaTransporte } from '../features/seguimiento/hooks/useSeguimientoSalidaTransporte';

export default function Seguimiento() {
  const [guideNumber, setGuideNumber] = useState('GR-2023-08942');
  const [selectedSalidaTransporte, setSelectedSalidaTransporte] = useState<number | null>(null);
  const {
    infoSeguimiento, 
    isLoading: isLoadingInfoSeguimiento, 
    isError: isErrorInfoSeguimiento,
    execute: realizarSeguimientoSalidaTransporte
  } = useFetchSeguimientoSalidaTransporte();

  const trackingData = {
    guideNumber: 'GR-2023-08942',
    productos: 20,
    peso_total: 2450,
    unidad_peso: 'TN',
    punto_de_partida: 'Puerto Maldonado',
    punto_de_llegada: 'Cusco',
    listo_para_recoger: true,
    historial: [
      {
        evento: "SUNAT: Control tributario y legalidad. (Guías, Factura/Boleta)",
        fecha: "14 Oct, 2023",
        hora: "10:20 AM"
      },
      {
        evento: "SUTRAN: Peso y estado técnico. (MTC, Brevete, SOAT, CITV)",
        fecha: "15 Oct, 2023",
        hora: "15:45 PM"
      },
      {
        evento: "SENASA: Sanidad agraria y plagas. (Certificado Fito/Zoosanitario)",
        fecha: "16 Oct, 2023",
        hora: "09:15 AM"
      },
      {
        evento: "DIGESA/SANIPES: Inocuidad y cadena de frío. (Registro Sanitario, Guía Pesquera)",
        fecha: "25 oct 2024",
        hora: "03:00"
      },
      {
        evento: "PNP: Seguridad vial e identidad. (DNI, Documentos del vehículo)",
        fecha: "25 oct 2024",
        hora: "17:00"
      }
    ]
  };

  const currentEventIndex = infoSeguimiento.length - 1;

  return (
    <div className="relative flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            Consulta de seguimiento
          </h2>
          <p className="text-sm text-gray-400 text-center">
            Rastrea tu mercancía en tiempo real con el número de Guía de Remisión.
          </p>
        </div>
      </div>

      <div className="flex flex-col p-6">
        <TableSelectSalidaTransporte 
          onChange={(selectedId) => {
            console.log('Selected Salida Transporte ID:', selectedId)
          }}
          selectIdSalidaTransporte={setSelectedSalidaTransporte}
        />

        <button
          onClick={() => {
            console.log('Buscar guía:', guideNumber);
            realizarSeguimientoSalidaTransporte(selectedSalidaTransporte as number)
          }}
          className="px-8 py-4 my-4 bg-[#1f6feb] hover:bg-[#1a5cd9] rounded-lg transition-colors font-bold flex justify-center gap-2"
        >
          Consultar
        </button>
        <ContentSectionProcess 
          fetchData={() => realizarSeguimientoSalidaTransporte(selectedSalidaTransporte as number)}
          isError={isErrorInfoSeguimiento}
          isLoading={isLoadingInfoSeguimiento}
          textButtonError='Reintentar'
          textError='No se pudo obtener la información de seguimiento. Por favor, inténtalo de nuevo.'
        >
          {/* Timeline */}
          <div className="mb-6">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#30363d]"></div>
              
              {/* Active Progress Line */}
              <div 
                className="absolute left-6 top-0 w-0.5 bg-[#1f6feb] transition-all duration-500"
                style={{ height: `${100}%` }}
              ></div>

              {/* Events */}
              <div className="space-y-0">
                {infoSeguimiento.map((event, index) => {
                  const isCompleted = index <= currentEventIndex;
                  const isCurrent = index === currentEventIndex;
                  const isFuture = index > currentEventIndex;

                  return (
                    <div key={index} className="relative">
                      {/* Event Item */}
                      <div className={`flex gap-6 pb-8 ${isFuture ? 'opacity-40' : ''}`}>
                        {/* Icon */}
                        <div className="relative flex-shrink-0">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                            isCompleted
                              ? 'bg-[#1f6feb] border-[#1f6feb]'
                              : 'bg-[#0d1117] border-[#30363d]'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                              <div className="w-3 h-3 rounded-full bg-[#30363d]"></div>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className={`flex-1 ${
                          isCurrent 
                            ? 'bg-[#1f6feb]/10 border border-[#1f6feb]/30 rounded-lg p-5' 
                            : 'pt-2'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className={`font-bold mb-1 ${isCurrent ? 'text-[#1f6feb]' : 'text-white'}`}>
                                {event.titulo} {event.comentario}
                                {isCurrent && (
                                  <span className="ml-3 px-2 py-1 bg-[#1f6feb] text-white text-xs font-bold rounded uppercase">
                                    Actual
                                  </span>
                                )}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                </div>
                              </div>
                              {isCurrent && (
                                <div className="flex items-center gap-1 mt-2 text-sm">
                                  <MapPin className="w-4 h-4 text-[#1f6feb]" />
                                  <span className="text-white">Centro de Distribución Norte, Chiclayo</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ContentSectionProcess>
        {/* Map Section */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
          <div className="bg-[#21262d] p-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1f6feb]" />
              <h3 className="font-bold uppercase text-sm">Ubicación Actual</h3>
            </div>
          </div>
          <div className="h-64 bg-[#0d1117] relative">
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#1f6feb] mx-auto mb-3" />
                <p className="text-lg font-bold">Panamericana Norte KM 780, Lambayeque</p>
                <p className="text-sm text-gray-500 mt-1">Última actualización: hace 15 minutos</p>
              </div>
            </div>
            {/* Simple map grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}