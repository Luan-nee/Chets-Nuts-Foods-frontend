import { useState } from "react";

interface InputTextProps {
  label: string;
  value: string;
  htmlForm: string;
  onChange: (value: string) => void;
  isObligatory?: boolean;
  errorMessage?: string;
}

export default function InputText({
  label,
  value,
  htmlForm,
  onChange,
  isObligatory = false,
  errorMessage = "Este campo es obligatorio",
}: InputTextProps) {
  const [touched, setTouched] = useState(false);

  const hasError = isObligatory && touched && value.trim() === "";

  return (
    <div className="flex flex-col font-sans py-2 w-full">
      <div className="relative w-full">
        <label
          htmlFor={htmlForm}
          className="text-gray-300 absolute border border-gray-600 rounded-lg -top-2.5 left-3 px-2 bg-dark-deep text-sm font-medium tracking-tight"
        >
          {label}
          {isObligatory && <span className="text-red-500 ml-1">*</span>}
        </label>

        <input
          id={htmlForm}
          type="text"
          autoComplete="off"
          value={value}
          required={isObligatory}
          onChange={(e) => onChange(e.currentTarget.value)}
          onBlur={() => setTouched(true)}
          className={`w-full p-3 bg-dark-deep rounded-lg text-white focus:outline-none transition-all duration-200
            ${
              hasError
                ? "border border-red-500 focus:ring-1 focus:ring-red-500"
                : "border border-gray-500 focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            }`}
        />
      </div>

      {hasError && (
        <span className="text-red-500 text-xs mt-1 ml-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
}