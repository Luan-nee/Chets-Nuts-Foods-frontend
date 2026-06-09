
interface TableProps {
  tableHeader: string[];
  children: React.ReactNode;
  cantidadDatos?: number;
}

export default function Table({ children, tableHeader, cantidadDatos }: TableProps) {
  return (
    <table className="w-full bg-gray-900 rounded-lg">
      <thead>
        <tr className="border-b border-gray-800">
          {tableHeader.map((header, index) => (
            <th key={index} className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-800">
        {cantidadDatos === 0 ? (
          <tr>
            <td colSpan={tableHeader.length} className="text-center py-10">
              <p className="text-gray-400">No hay datos para mostrar.</p>
            </td>
          </tr>
        ) : (
          children
        )}
      </tbody>
    </table>
  );
}