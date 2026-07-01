import { Phone } from "lucide-react";

interface InputNumberProp {
  defaultValue: number;
  label: string;
  onChange: (value: number) => void;
  placeholder: string;
  disabled?: boolean;
}

export default function InputPhoneNumber({
  label,
  onChange,
  placeholder,
  disabled = false,
}: InputNumberProp) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <div className="flex items-center bg-dark-deep border border-[#2d3748] rounded-lg focus-within:border-slate-500">
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#2a3347] rounded-l-[7px] text-sm font-medium text-slate-200 transition-colors duration-150 whitespace-nowrap">
          <span className="text-sm font-medium text-slate-200">+51</span>
        </div>
        {/* Amount input */}
        <input
          type="number"
          autoComplete="off"
          min={0}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="flex-1 pl-2 bg-transparent border-none outline-none text-sm text-slate-400 placeholder-slate-600 py-2.5 min-w-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {/* Currency selector */}
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#2a3347] rounded-r-[7px]">
          <Phone className="w-4 h-5" />
        </div>
      </div>
    </div>
  )
}