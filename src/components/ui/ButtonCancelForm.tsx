interface ButtonCancelFormProps {
  handleCancel: () => void;
  isLoading: boolean;
  textButton: string;
  color?: 'red' | 'gray' | 'blue' | 'green';
}

const ButtonColors = {
  red: 'bg-red-700 hover:bg-red-600 border-red-600',
  gray: 'bg-slate-500 text-slate-300 border-slate-500',
  blue: 'bg-blue-700 hover:bg-blue-500 border-blue-600',
  green: 'bg-green-600 hover:bg-green-700 border-green-600',
}

export default function ButtonCancelForm({ handleCancel, isLoading, textButton, color }: ButtonCancelFormProps) {
  return (
    <button
      type="button"
      disabled={isLoading} 
      onClick={handleCancel}
      className={`
        px-6 py-3 rounded-lg font-medium transition-colors border 
        ${isLoading 
          ? 'bg-slate-500 text-slate-300 border-slate-500 cursor-not-allowed opacity-70' // Estilos desactivado
          : color 
            ? ButtonColors[color] 
            : ButtonColors['red'] // Estilos por defecto
        }
        text-white cursor-pointer
      `}
    >
      <p className="text-nowrap">
        {textButton}
      </p>
    </button>
  );
}