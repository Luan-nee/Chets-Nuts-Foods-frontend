
interface TableProps {
  tableHeader: string[];
  children: React.ReactNode;
}

export default function Table({ children, tableHeader }: TableProps) {
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
        {children}
      </tbody>
    </table>
  );
}