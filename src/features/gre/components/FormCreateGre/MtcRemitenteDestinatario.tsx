import { useState } from "react";
import { Users, LucideList, LucideListX } from "lucide-react";
import InputSelect from "../../../../components/ui/InputSelect";
import { optionsTipoDocumento } from "../../../../config/tipoDocumento";
import TableClientes from "../../../clientes/components/TableClientes";

interface MtcRemitenteDestinatarioProps {
  handleInputChange: (field: string, value: string | boolean | number) => void;
}

export default function MtcRemitenteDestinatario({ handleInputChange }: MtcRemitenteDestinatarioProps) {
  const [showTablaClientes, setShowTablaClientes] = useState<boolean>(false);
  const [pagadorFlete, setPagadorFlete] = useState<'destinatario' | 'tercero'>('tercero');
  const [setSelectIdCliente, setSetSelectIdCliente] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 px-8 py-6">
        {/* Sección Destinatario (Receptor) */}
        <section className="bg-gray-900 border border-gray-700 rounded-lg p-5">
          <div className="flex flex-row justify-between mb-4">
            <div className="flex flex-row items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">
                DESTINATARIO. ID {setSelectIdCliente !== null ? `- ${setSelectIdCliente}` : ''}
              </h2>
            </div>

            <button 
            onClick={() => setShowTablaClientes(!showTablaClientes)}
            className={`ml-auto flex items-center gap-2 px-3 py-1 ${showTablaClientes ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} rounded-lg transition-colors text-white text-xs`}>
              { showTablaClientes ? (
                <>
                  <LucideListX className="w-4 h-4 text-white-500" />
                  <p>Cerrar</p>
                </>
              ) : (
                <>
                  <LucideList className="w-4 h-4 text-white-500" />
                  <p>Ver clientes</p>
                </>
              )}
            </button>
          </div>

          { showTablaClientes ? (
            <TableClientes 
              setSelectedClienteId={setSetSelectIdCliente}
            />
          ) : (
            <>
              {/* Tipo de documento y Nro. del documento */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                    Tipo de documento
                  </label>
                  <InputSelect 
                    inputName={"destinatario.tipo_documento"}
                    placeholder={"Tipo de documento..."}
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
            </>
          ) }

        </section>

        {/* Pagador del flete */}
        <section className="bg-gray-900 border border-gray-700 rounded-lg p-5">
          <div className="flex flex-row justify-between mb-4">
            <div className="flex flex-row items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">PAGADOR DEL FLETE</h2>
            </div>
            <div className="flex flex-row gap-1">
              <button 
              onClick={() => setPagadorFlete('destinatario')}
              className={`ml-auto flex items-center gap-2 px-3 py-1 ${pagadorFlete === 'destinatario' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} rounded-lg transition-colors text-white text-xs`}>
                Destinatario
              </button>

              <button 
              onClick={() => setPagadorFlete('tercero')}
              className={`ml-auto flex items-center gap-2 px-3 py-1 ${pagadorFlete === 'tercero' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} rounded-lg transition-colors text-white text-xs`}>
                Tercero
              </button>
            </div>
          </div>
          
          { pagadorFlete === 'destinatario' ? (
            <p className="text-sm text-gray-400 italic text-center py-10">
              Este campo se rellenará automáticamente con la información del destinatario, ya que el destinatario es el pagador del flete.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                    Tipo de documento
                  </label>
                  <InputSelect 
                    inputName={"pagador_flete.tipo_documento"}
                    placeholder={"Tipo de documento..."}
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
            </>
          )}
        </section>
    </div>
  );
}