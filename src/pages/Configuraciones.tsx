import { useState } from 'react'
import ContentPageMain from '../components/layouts/contentPageMain'
import DetallesInfoEstablecimiento from '../features/datosEmpresa/components/DetallesInfoEstablecimiento'
import DetallesInfoEmpresa from '../features/datosEmpresa/components/DetallesInfoEmpresarial'
import FormRegistrarInfoEmpresarial from '../features/datosEmpresa/components/FormRegistrarInfoEmpresarial'
import FormRegistrarInfoEstablecimiento from '../features/datosEmpresa/components/FormRegistrarInfoEstablecimiento'

export default function Configuraciones() {
  const [showFormInfoEmpresarial, setShowFormInfoEmpresarial] = useState<boolean>(false);
  const [showFormInfoEstablecimiento, setShowFormInfoEstablecimiento] = useState<boolean>(false);

  return (
    <ContentPageMain>
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Configuraciones</h2>
            <p className="text-sm text-gray-400">
              Registra la información de tu empresa para generar guías de remisión y otros documentos relacionados. Asegúrate de que los datos sean correctos para evitar problemas futuros.
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-2 items-start gap-4 p-6">
        {
          showFormInfoEstablecimiento ? (
            <FormRegistrarInfoEstablecimiento 
              setShowForm={setShowFormInfoEstablecimiento} 
            />
          ) : (
            <DetallesInfoEstablecimiento setShowForm={setShowFormInfoEstablecimiento} />
          )
        }
        {
          showFormInfoEmpresarial ? (
            <FormRegistrarInfoEmpresarial
              setShowForm={setShowFormInfoEmpresarial}
            />
          ) : (
            <DetallesInfoEmpresa setShowForm={setShowFormInfoEmpresarial} />
          )
        }
      </div>
    </ContentPageMain>
  );
}
