import { useState } from 'react';
import TableSelectProductos from '../../../productos/components/TableSelectProductos';

export default function FormProductos () {
  const [, setIdProductoSelected] = useState<number | null>(null);
  const [, setInfoProductoSelected] = useState<any | null>(null);

  return (
    <div className="px-6 py-4 bg-gray-900 mx-6">
      <TableSelectProductos
        selectIdProducto={setIdProductoSelected}
        selectInfoProducto={setInfoProductoSelected}
      />
    </div>
  );
}