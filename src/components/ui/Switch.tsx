import { useState } from "react";

interface PropSwitch {
  inputName: string;
  activo: boolean;
  handleInputChange: (field: string, value: string | number | boolean) => void;
}

export default function Switch(
  { inputName, activo, handleInputChange }: PropSwitch
) {
  const [estado, setEstado] = useState(activo);

  return (
    <button
      type="button"
      onChange={() => handleInputChange(inputName, estado)}
      onClick={() => setEstado(!estado)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        estado ? 'bg-[#1f6feb]' : 'bg-[#30363d]'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          estado ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}