interface PropSwitch {
  estado: boolean;
  handleInputChange: (value: boolean) => void;
}

export default function Switch(
  { estado, handleInputChange }: PropSwitch
) {

  return (
    <button
      type="button"
      onClick={(estado) => handleInputChange(!estado)}
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