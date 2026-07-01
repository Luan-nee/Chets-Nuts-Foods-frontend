interface InputTextProps { 
  label: string , 
  value: string, 
  htmlForm: string,
  onChange: (value: string) => void
}

export default function InputText ({
  label, value, htmlForm, onChange
} : InputTextProps) {
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
          onChange={
            (e) => onChange(e.currentTarget.value)
          }
          id={htmlForm}
          defaultValue={value}
          type="text"
          autoComplete="off"
          className="w-full p-3 bg-dark-deep border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
        />
      </div>
    </div>
  );
}