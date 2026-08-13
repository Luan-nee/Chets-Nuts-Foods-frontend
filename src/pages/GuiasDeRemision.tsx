import { useState } from 'react';
import { Plus } from 'lucide-react';
import ContentPageMain from '../components/layouts/contentPageMain';
import FormCreateGre from '../features/gre/components/FormCreateGre';
import TableGre from '../features/gre/components/TableGre';

export default function ListaGre() {
  const [showFormCreateGre, setShowFormCreateGre] = useState<boolean>(false);

  return (
    <ContentPageMain>
			{/* Header */}
			<div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
            <h2 className="text-3xl font-bold text-white mb-2">Gestión de Guías de remisión</h2>
            <p className="text-sm text-gray-400">Administra las guías de remisión de la empresa.</p>
          </div>

					<button
						onClick={() => setShowFormCreateGre(true)}
						className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
					>
						<Plus className="w-5 h-5" />
						Nueva guía de remisión
					</button>
				</div>
			</div>

      <TableGre />

      {showFormCreateGre && (
        <FormCreateGre setShowFormCreateGre={setShowFormCreateGre} />
      )}
    </ContentPageMain>
  );
}