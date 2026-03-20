import { Briefcase, Users } from "lucide-react";
import InputSelect from "../../../../components/ui/InputSelect";

const optionsTipoDocumento = [
  { value: 'dni', label: 'DOCUMENTO NACIONAL DE IDENTIDAD' },
  { value: 'ruc', label: 'REGISTRO ÚNICO DE CONTRIBUYENTES' }
]

interface MtcRemitenteDestinatarioProps {
  handleInputChange: (field: string, value: string | boolean | number) => void;
}

export default function MtcRemitenteDestinatario({ handleInputChange }: MtcRemitenteDestinatarioProps) {

  return (
    <div className="flex flex-col gap-4 px-8 py-6">
      {/* Datos del Transportista */}
      <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="w-5 h-5 text-[#1f6feb]" />
          <h2 className="text-lg font-semibold">DATOS DEL TRANSPORTISTA</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
              NRO REGISTRO MTC
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <input
                type="text"
                className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
                onChange={(e) => handleInputChange("numero_registro_MTC", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
              Empresa de Transporte
            </label>
            <p className="w-full font-bold text-xl py-2 text-white">
              Chets Nuts Foods S.A.C.
            </p>
          </div>
        </div>
      </section>

      {/* Destinatario */}
      <section className="flex flex-col gap-4 bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">REMITENTE</h2>
        </div>

        {/* Remitente (Pagador) */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-5">
          {/* Tipo de documento */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                Tipo de documento
              </label>
              <InputSelect 
                inputName={"remitente.tipo_documento"}
                placeholder={"Seleccionar el tipo de documento..."}
                options={optionsTipoDocumento}
                handleInputChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                Nro. del documento
              </label>
              <input
                type="text"
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#1f6feb] transition-colors"
                onChange={(e) => handleInputChange("remitente.numero_documento", e.target.value)}
              />
            </div>
          </div>

          {/* Razon social o nombre completo */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                Razon social o nombre completo
              </label>
              <input
                type="text"
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#1f6feb] transition-colors"
                onChange={(e) => handleInputChange("remitente.nombre_razonSocial", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">DESTINATARIO</h2>
        </div>

        {/* Destinatario (Receptor) */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-5">
          {/* Tipo de documento */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                Tipo de documento
              </label>
              <InputSelect 
                inputName={"destinatario.tipo_documento"}
                placeholder={"Seleccionar el tipo de documento..."}
                options={optionsTipoDocumento}
                handleInputChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                Nro. del documento
              </label>
              <input
                type="text"
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>
          </div>

          {/* Razon social o nombre completo */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                Razon social o nombre completo
              </label>
              <input
                type="text"
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">PAGADOR DEL FLETE</h2>
        </div>

        {/* Pagador del flete */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-5">
          {/* Tipo de documento */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                Tipo de documento
              </label>
              <InputSelect 
                inputName={"pagador_flete.tipo_documento"}
                placeholder={"Seleccionar el tipo de documento..."}
                options={optionsTipoDocumento}
                handleInputChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                Nro. del documento
              </label>
              <input
                type="text"
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>
          </div>

          {/* Razon social o nombre completo */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                Razon social o nombre completo
              </label>
              <input
                type="text"
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#1f6feb] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
