import { useState } from "react";
import { Truck } from "lucide-react";
import ButtonSubmitForm from "../components/ui/ButtonSubmitForm";
import InputText from "../components/ui/InputText";
import { useLogin } from "../features/auth/hooks/useLogin";

export default function Login() {
  const { 
    execute: login, 
    isLoading, 
    isError
  } = useLogin();
  const [usuario, setUsuario] = useState<string>("");
  const [contrasenia, setContrasenia] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="font-bold text-2xl text-white">
                Chets Nuts Foods
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-8">
          <h2 className="text-xl text-center font-bold text-white mb-6">
            Iniciar Sesión
          </h2>
          <form
            className="space-y-5"
          >
            <InputText 
              htmlForm="correo electrónico"
              label="Correo electrónico"
              onChange={(value) => setUsuario(value)}
              value={usuario}
            />
            <InputText 
              htmlForm="contraseña"
              label="Contraseña"
              onChange={(value) => setContrasenia(value)}
              value={contrasenia}
            />

            <div className="flex">
              <ButtonSubmitForm
                handleSubmit={async () => {
                  await login({
                    usuario: usuario.trim(),
                    password: contrasenia.trim(),
                  });
                }}
                isLoading={isLoading}
                isError={isError}
                textButton="Iniciar Sesión"
                textError="Error al iniciar sesión"
                color="blue"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
