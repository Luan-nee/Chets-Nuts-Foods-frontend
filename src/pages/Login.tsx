import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck } from 'lucide-react';
import ButtonSubmitForm from '../components/ui/ButtonSubmitForm';
import { useLogin } from '../features/auth/hooks/useLogin';
import { InfoSuccess } from '../components/messages/InfoSuccess';
import { InfoError } from '../components/messages/InfoError';
import type { Credenciales } from '../types/auth.type';

export default function Login() {
  const navigate = useNavigate();
  const { execute: login, isLoading, isError, message } = useLogin();
  const [usuario, setUsuario] = useState<string>('');
  const [contrasenia, setContrasenia] = useState<string>('');
  
  const handleLogin = async () => {
    if (!usuario.trim() || !contrasenia.trim()) {
      alert('Es necesario ingresar usuario y contraseña');
      return;
    }

    const credenciales: Credenciales = {
      usuario: usuario.trim(),
      password: contrasenia.trim()
    };

    const response = await login(credenciales);

    console.log('Login response data:', response, 'message:', message);
    if (response && response.status === 'success') {
      InfoSuccess('Autenticación', response.message || 'Login exitoso');
      navigate('/');
    } else if (response && response.status === 'error') {
      InfoError('Error de autenticación', response.message || 'Usuario o contraseña incorrectas');
    } else {
      InfoError('Error', message || 'Las credenciales son incorrectas');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="font-bold text-2xl text-white">Chets Nuts Foods</h1>
              {/* <p className="text-sm text-gray-400">ERP</p> */}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-8">
          <h2 className="text-xl text-center font-bold text-white mb-6">Iniciar Sesión</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Usuario</label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-gray-700 transition"
                placeholder="Juan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
              <input
                type="password"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-gray-700 transition"
                placeholder="Pérez"
              />
            </div>
            <div className="flex">
              <ButtonSubmitForm
                handleSubmit={() => handleLogin()}
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