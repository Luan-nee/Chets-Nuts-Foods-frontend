import { useState, useRef, useEffect, } from 'react';
import { ChevronsUpDown } from 'lucide-react';

type Option = {
  value: string | number;
  label: string;
};

interface InputSelectTestProps {
  label: string;
  options: Option[];
  placeholder: string;
  onSelect: (value: string | number) => void;
  valueSelected?: string | number | null;
}

export default function InputSelectTest({ options, placeholder, onSelect, valueSelected, label }: InputSelectTestProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [optionSelected, setOptionSelected] = useState<Option | null>(
    valueSelected ? options.find(option => option.value === valueSelected) || null : null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOptionSelected(
      valueSelected ? options.find(option => option.value === valueSelected) || null : null
    );
  }, [options, valueSelected]);

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
            ${isOpen ? 'border-slate-500' : ''}`}
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
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  setOptionSelected(option);
                  onSelect(option.value);
                }}
                className={`group relative py-3 pl-11 pr-4 text-[15px] text-white cursor-pointer select-none 
                  hover:bg-slate-700/50 transition-colors duration-150
                  ${optionSelected && optionSelected.value === option.value ? 'font-medium bg-slate-800/30' : 'font-normal'}`}
                role="option"
                aria-selected={!!(optionSelected && optionSelected.value === option.value)}
              >
                {/* Checkmark Icon */}
                {optionSelected && optionSelected.value === option.value && (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg 
                      className="w-5 h-5 text-indigo-400" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                )}
                <span className="block truncate">{option.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}