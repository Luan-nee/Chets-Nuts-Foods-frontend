import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputPasswordProps {
  label: string , 
  value: string, 
  htmlForm: string,
  onChange: (value: string) => void
}

export default function InputPassword({ label, value, htmlForm, onChange }: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center font-sans py-2">
      <div className="relative w-full">
        <label
          htmlFor={htmlForm}
          className="text-gray-300 absolute px-2 border border-gray-600 rounded-lg -top-2.5 left-3 px-1 bg-dark-deep text-sm font-medium tracking-tight"
        >
          {label}
        </label>
        <input
          onChange={(e) => onChange(e.currentTarget.value)}
          id={htmlForm}
          type={showPassword ? "text" : "password"}
          defaultValue={value}
          className="w-full p-3 
          bg-dark-deep 
          border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
          aria-label={
            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}