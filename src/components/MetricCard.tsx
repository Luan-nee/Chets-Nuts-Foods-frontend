interface MetricCardProps {
  label: string;
  value: number | string;
  simboloValue: string;
  children: React.ReactNode;
  color: "blue" | "green" | "red" | "yellow";
}

export default function MetricCard({ label, value, simboloValue, children, color }: MetricCardProps){
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{label}</p>
          <p className={`text-3xl font-bold text-${color}-600`}>{simboloValue}{value}</p>
        </div>
        <div className={`bg-${color}-100 p-3 rounded-lg`}>
          {children}
        </div>
      </div>
    </div>
  )
}
