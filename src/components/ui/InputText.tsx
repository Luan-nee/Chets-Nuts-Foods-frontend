interface InputTextProps { label: string , value: string, htmlForm: string }

export default function InputText ({
  label, value, htmlForm
} : InputTextProps) {
  return (
    <div className="flex flex-col items-center justify-center font-sans">
      <div className="relative w-full">
        <label
          htmlFor={htmlForm}
          className="text-gray-300 absolute px-2 border border-gray-600 rounded-lg -top-2.5 left-3 px-1 bg-dark-deep text-sm font-medium tracking-tight"
        >
          {label}
        </label>
        <input
          id={htmlForm}
          type="text"
          defaultValue={value}
          className="w-full p-3 
          bg-dark-deep 
          border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
        />
      </div>
      
    </div>
  );
}