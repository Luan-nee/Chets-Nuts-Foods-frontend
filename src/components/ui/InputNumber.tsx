interface InputNumberProp {
  label: string;
  simbol: string;
  defaultValue: number;
  onChange: (value: number) => void;
  placeholder: string;
}

export default function InputNumber({
  placeholder,
  label,
  simbol,
  defaultValue,
  onChange
}: InputNumberProp) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <div className="flex items-center bg-dark-deep border border-[#2d3748] rounded-lg focus-within:border-slate-500">
        {/* Amount input */}
        <input
          type="number"
          min={0}
          step={0.01}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="flex-1 pl-2 bg-transparent border-none outline-none text-sm text-slate-400 placeholder-slate-600 py-2.5 min-w-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {/* Currency selector */}
        <div className="relative flex-shrink-0">
          <button
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#2a3347] hover:bg-[#2f3a52] rounded-r-[7px] text-sm font-medium text-slate-200 transition-colors duration-150 whitespace-nowrap"
          >
            <span>{simbol}</span>
          </button>
        </div>
      </div>
    </div>
  );
}