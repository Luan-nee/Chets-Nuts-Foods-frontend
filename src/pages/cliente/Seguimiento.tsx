import { useState } from 'react';
import { Search, MapPin, Package, Calendar, Clock, CheckCircle, Truck, ArrowRight } from 'lucide-react';

export default function Seguimiento() {
  const [guideNumber, setGuideNumber] = useState('GR-2023-08942');
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

  const handleSearch = () => {
    console.log('Buscar guía:', guideNumber);
  };

  const getCurrentStatus = () => {
    if (trackingData.listo_para_recoger) {
      return {
        label: 'Listo para Recoger',
        date: '18 Oct, 2023',
        icon: <Package className="w-5 h-5" />
      };
    }
    const lastEvent = trackingData.historial[trackingData.historial.length - 1];
    return {
      label: 'En Tránsito',
      date: lastEvent.fecha,
      icon: <Truck className="w-5 h-5" />
    };
  };

  const currentStatus = getCurrentStatus();
  const currentEventIndex = trackingData.historial.length - 1;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Consulta de Seguimiento</h1>
          <p className="text-gray-400">
            Rastrea tu mercancía en tiempo real con el número de Guía de Remisión.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={guideNumber}
                  onChange={(e) => setGuideNumber(e.target.value)}
                  placeholder="GR-2023-08942"
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-8 py-4 bg-[#1f6feb] hover:bg-[#1a5cd9] rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                Consultar
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p>El código se encuentra en la parte superior derecha de su Guía de Remisión Electrónica.</p>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1f6feb]/20 rounded-full flex items-center justify-center">
                {currentStatus.icon}
              </div>
              <div>
                <p className="text-xs text-[#1f6feb] uppercase font-medium tracking-wide mb-1">Estado Actual</p>
                <h3 className="text-xl font-bold">{currentStatus.label}</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Entrega Estimada</p>
              <p className="text-lg font-bold">{currentStatus.date}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#30363d]"></div>
            
            {/* Active Progress Line */}
            <div 
              className="absolute left-6 top-0 w-0.5 bg-[#1f6feb] transition-all duration-500"
              style={{ height: `${(currentEventIndex / (trackingData.historial.length - 1)) * 100}%` }}
            ></div>

            {/* Events */}
            <div className="space-y-0">
              {trackingData.historial.map((event, index) => {
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
                              {event.evento}
                              {isCurrent && (
                                <span className="ml-3 px-2 py-1 bg-[#1f6feb] text-white text-xs font-bold rounded uppercase">
                                  Actual
                                </span>
                              )}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{event.fecha}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{event.hora}</span>
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

              {/* Future Event Preview */}
              <div className="relative opacity-40">
                <div className="flex gap-6">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 bg-[#0d1117] border-[#30363d]">
                      <div className="w-3 h-3 rounded-full bg-[#30363d]"></div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold mb-1 text-gray-500">Entregado</h4>
                    <p className="text-sm text-gray-500">Pendiente de llegada al destino final</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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