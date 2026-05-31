import { createContext, useContext, useState } from 'react';
import type { AuthResponse } from '../types/auth.type'

interface AuthContextType {
  user: AuthResponse | null;
  isAuthenticated: boolean;
  login: (userData: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(()=>{
    const stored = localStorage.getItem("user");
    if(!stored)return null;

    try {
      const parsed: AuthResponse = JSON.parse(stored);
      return parsed;
    } catch (error) {
      console.error("No se pudo leer usuario de localStorage", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(()=>{
    const stored = localStorage.getItem("user");

    return stored? true:false; 
  });

  const login = (userData: AuthResponse) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
