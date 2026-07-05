import { useState } from 'react';
import type { ProductoEnPaquete } from '../../../../types/constantes.type';
import TableSelectProductos from '../../../productos/components/TableSelectProductos';
import type { FormCreateGreData } from '../FormCreateGre';

interface FormProductosProps {
  setFormData: React.Dispatch<React.SetStateAction<FormCreateGreData>>;
}

export default function FormProductos ({ setFormData }: FormProductosProps) {
  const [listProductsSelected, setListProductsSelected] = useState<ProductoEnPaquete[]>([]);
  return (
    <div className="px-6 py-4 bg-gray-900 mx-6">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
        onClick={() => {
          setFormData(prev => ({ ...prev, productos: listProductsSelected }))
          console.log('Productos seleccionados:', listProductsSelected);
        }}
      >
        VER DATOS DE PRODUCTOS
      </button>
      <TableSelectProductos
        setListProductsSelected={setListProductsSelected}
        listProductsSelected={listProductsSelected}
      />
    </div>
  );
}