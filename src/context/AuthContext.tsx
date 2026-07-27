import { createContext, useContext, useState } from 'react';
import type { UserRole } from '../types/constantes.type';
import { DIRACCESOSLOCAL } from '../const';

type AuthState = {
  user: string | null;
  token: string | null;
  rol: UserRole | null;
}

interface AuthContextType {
  auth: AuthState;
  isAuthenticated: boolean;
  logout: () => void;
  guardarInformacionLogin: (authData: AuthState) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => ({
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token'),
    rol: (localStorage.getItem('rol') as UserRole | null) ?? null
  }));

  const guardarInformacionLogin = ({ user, token, rol }: AuthState) => {
    setAuth({ user, token, rol });

    if (user) {
      localStorage.setItem('user', user);
    } else {
      localStorage.removeItem('user');
    }

    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    if (rol) {
      localStorage.setItem('rol', rol);
    } else {
      localStorage.removeItem('rol');
    }
  };

  const isAuthenticated = Boolean(auth.token);

  const logout = () => {
    setAuth({
      user: null,
      token: null,
      rol: null
    });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem(DIRACCESOSLOCAL);
  };

  return (
    <AuthContext.Provider value={{ auth, isAuthenticated, logout, guardarInformacionLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
