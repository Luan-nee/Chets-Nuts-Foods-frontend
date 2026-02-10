import Table from '../../../components/ui/Table';
import { Edit, Trash2 } from 'lucide-react';

  type Producto = {
    id: number;
    sku: string;
    producto: string;
    categoria: string;
    stock: number;
    stockStatus: 'normal' | 'bajo' | 'agotado';
    precio: number;
  }
  const productos: Producto[] = [
    {
      id: 1,
      sku: 'PAL-001',
      producto: 'Pallet Madera Estándar',
      categoria: 'Embalaje',
      stock: 450,
      stockStatus: 'normal',
      precio: 12.50
    },
    {
      id: 2,
      sku: 'STR-042',
      producto: 'Film Stretch 50cm x 300m',
      categoria: 'Insumos',
      stock: 12,
      stockStatus: 'bajo',
      precio: 8.90
    },
    {
      id: 3,
      sku: 'BOX-202',
      producto: 'Caja Cartón Corrugado 40×40',
      categoria: 'Embalaje',
      stock: 1200,
      stockStatus: 'normal',
      precio: 0.75
    },
    {
      id: 4,
      sku: 'SEA-899',
      producto: 'Precinto de Seguridad Metálico',
      categoria: 'Seguridad',
      stock: 0,
      stockStatus: 'agotado',
      precio: 2.10
    },
    {
      id: 5,
      sku: 'CUSH-110',
      producto: 'Relleno de Aire para Embalaje',
      categoria: 'Insumos',
      stock: 85,
      stockStatus: 'bajo',
      precio: 15.30
    },
    {
      id: 6,
      sku: 'TAPE-330',
      producto: 'Cinta Adhesiva Transparente 48mm x 100m',
      categoria: 'Embalaje',
      stock: 300,
      stockStatus: 'normal',
      precio: 3.20
    },
    {
      id: 7,
      sku: 'WRAP-210',
      producto: 'Film Burbuja 1m x 50m',
      categoria: 'Insumos',
      stock: 25,
      stockStatus: 'bajo',
      precio: 22.40
    },
    {
      id: 8,
      sku: 'STR-051',
      producto: 'Film Stretch 30cm x 300m',
      categoria: 'Insumos',
      stock: 600,
      stockStatus: 'normal',
      precio: 6.70
    }
  ];
  const TableHeader: string[] = [
    "SKU",
    "Producto",
    "Categoría",
    "Stock",
    "Precio Unit.",
    "Acciones"
  ]

interface TableProductosProps {
  setSelectProductoId: (p: number) => void;
  setShowFromUpdateProducto: (p: boolean) => void;
}

export default function TableProductos({ setSelectProductoId, setShowFromUpdateProducto }: TableProductosProps) {

  return (
    <Table tableHeader={TableHeader}>
        {productos.map((producto, index) => (
          <RowTable key={index} producto={producto} index={index} setSelectProductoId={setSelectProductoId} setShowFromUpdateProducto={setShowFromUpdateProducto} />
        ))}
    </Table>
  );
}

interface RowTableProps {
  producto: Producto;
  index: number;
  setSelectProductoId: (p: number) => void;
  setShowFromUpdateProducto: (p: boolean) => void;
}

function RowTable({ producto, index, setSelectProductoId, setShowFromUpdateProducto }: RowTableProps) {
  return (
    <tr key={index} className="hover:bg-gray-800/50 transition-colors">
      <td className="px-6 py-4">
        <span className="text-blue-400 font-mono font-medium">{producto.sku}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-white font-medium">{producto.producto}</span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex px-3 py-1 rounded-md text-xs font-semibold text-white">
          {producto.categoria}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            producto.stockStatus === 'normal' ? 'bg-green-400' :
            producto.stockStatus === 'bajo' ? 'bg-orange-400' :
            'bg-red-400'
          }`} />
          <span className="font-medium">
            {`${producto.stock} uds.`}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-white font-medium">{producto.precio.toFixed(2)}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors" title="Editar" onClick={() => { setSelectProductoId(producto.id); setShowFromUpdateProducto(true); }}>
            <Edit className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors" title="Eliminar" onClick={() => setSelectProductoId(producto.id)}>
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </td>
    </tr>
  );
}