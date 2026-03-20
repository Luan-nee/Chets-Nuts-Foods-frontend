import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import TableGre from '../../features/gre/components/TableGre';
import DetallesGre from '../../features/gre/components/DetallesGre';
import FormCreateGre from '../../features/gre/components/FormCreateGre';

export default function ListaGre() {
  const [ showDetallesGre, setShowDetallesGre] = useState<boolean>(false);
  const [ showFormCreateGre, setShowFormCreateGre ] = useState<boolean>(false);
  const [ selectGreId, setSelectGreId ] = useState<number | null>(null);

  return (
    <div className="relative flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Gestión de Guías de remisión</h2>
            <p className="text-sm text-gray-400">Administra las guías de remisión de la empresa.</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por SKU o nombre de producto..."
              className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <button className="flex items-center gap-2 bg-gray-950 border border-gray-800 hover:border-gray-700 text-gray-300 px-4 py-2.5 rounded-lg text-sm transition-colors">
            <span>Estado</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Filter Button */}
          <button className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Table */}
      <TableGre setShowDetallesGre={setShowDetallesGre} setSelectGreId={setSelectGreId} setShowFormCreateGre={setShowFormCreateGre} />
      
      { showDetallesGre && 
        <div className="absolute inset-0 z-50 bg-gray-950">
          <DetallesGre showDetallesGre={setShowDetallesGre} selectedGreId={selectGreId} />
        </div>
      }
      
      { showFormCreateGre && 
        <div className="absolute inset-0 z-50 bg-gray-950">
          <FormCreateGre setShowFormCreateGre={setShowFormCreateGre} />
        </div>
      }
    </div>
  );
}