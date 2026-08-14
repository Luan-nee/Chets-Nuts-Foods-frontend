import Loading from "../ui/Loading";

interface ButtonSubmitFormProps {
  handleSubmit: () => void;
  isLoading: boolean;
  isError: boolean;
  textButton: string;
  textError: string;
  color?: 'green' | 'blue' | 'red' | 'white';
}

const ButtonColors = {
  white: 'from-white to-gray-200 hover:from-gray-200 hover:to-gray-300',
  green: 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
  blue: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
  red: 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800',
}

export default function ButtonSubmitForm({ 
  handleSubmit, 
  isLoading, 
  isError, 
  textButton, 
  textError, 
  color 
}: ButtonSubmitFormProps) {
  return (
    <button
      type="button"
      onClick={handleSubmit}
      className={`px-6 py-3 bg-gradient-to-r ${
        color ? ButtonColors[color] : ButtonColors['blue']
      } rounded-lg text-white font-medium transition-all shadow-lg`}
    >
      { isLoading ? (
        <div className="flex justify-center items-center">
          <Loading w={6} h={6} color="white" />
        </div>
      ) : isError ? (
        <p className="text-nowrap">
          {textError}
        </p>
      ) : (
        <p className="text-nowrap">
          {textButton}
        </p>
      )}
    </button>
  );
}