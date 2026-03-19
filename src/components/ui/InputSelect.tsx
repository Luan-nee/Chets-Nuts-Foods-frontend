interface InputSelectProps {
  inputName: string;
  placeholder: string;
  options: { label: string, value: string | number}[];
  handleInputChange: (field: string, value: string | number) => void;
  valueSelect?: number | string;
}

export default function InputSelect({ inputName, placeholder, options, handleInputChange, valueSelect }: InputSelectProps) {
  return (
    <div className="relative">
      <select
        name={inputName}
        aria-placeholder={placeholder}
        defaultValue={ valueSelect !== undefined ? valueSelect : '' }
        onChange={(e) => handleInputChange(inputName, e.target.value)}
        className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-[#1f6feb] transition-colors appearance-none cursor-pointer"
      >
        <option value="" disabled>{placeholder}</option>
        {
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        }
      </select>
      <svg 
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}