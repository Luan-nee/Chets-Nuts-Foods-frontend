import { useState, useRef, useEffect } from "react";
import { ChevronsUpDown, Check } from "lucide-react";

type Option = {
  value: string | number;
  label: string;
};

type Titles = {
  label: string;
  position: number;
}

interface InputSelectTestProps {
  label: string;
  options: Option[];
  placeholder: string;
  onSelect: (value: string | number) => void;
  valueSelected?: string | number | null;
  titles?: Titles[];
}

export default function InputSelect({
  options,
  placeholder,
  onSelect,
  valueSelected,
  label,
  titles,
}: InputSelectTestProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [optionSelected, setOptionSelected] = useState<Option | null>(
    valueSelected != null
      ? options.find((option) => option.value === valueSelected) || null
      : null,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        {/* Botón Principal */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`w-full flex flex-row justify-between p-3 pl-4 text-left bg-dark-deep text-white border border-[#2D3340] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition ease-in-out duration-150 text-[15px]
            ${isOpen ? "border-slate-500" : ""}`}
        >
          <p>{optionSelected ? optionSelected.label : placeholder}</p>
          <ChevronsUpDown className="w-5 h-5 text-white" />
        </button>

        {/* Menú Dropdown */}
        {isOpen && (
          <ul
            className="absolute z-10 w-full mt-1.5 bg-dark-deep border border-[#2D3340] rounded-lg shadow-lg max-h-[310px] overflow-auto focus:outline-none scrollbar-thin scrollbar-thumb-gray-600"
            role="listbox"
          >
            {options.map((option, index) => (
              <>
                {titles?.map((title) => (
                  title.position === index && (
                    <li
                      key={title.label}
                      className="py-2 px-4 text-[15px] text-gray-400 font-medium"
                    >
                      {title.label}
                    </li>
                  )
                ))}
                <li
                  key={option.value}
                  onClick={() => {
                    setOptionSelected(option);
                    onSelect(option.value);
                    setIsOpen(false);
                  }}
                  className={`group relative py-3 pl-11 pr-4 text-[15px] text-white cursor-pointer select-none 
                    hover:bg-slate-700/50 transition-colors duration-150
                    ${optionSelected && optionSelected.value === option.value ? "font-medium bg-slate-800/30" : "font-normal"}`}
                  role="option"
                  aria-selected={
                    !!(optionSelected && optionSelected.value === option.value)
                  }
                >
                  {/* Checkmark Icon */}
                  {optionSelected && optionSelected.value === option.value && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Check className="w-5 h-5 text-indigo-400" />
                    </span>
                  )}
                  <span className="block truncate">{option.label}</span>
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
