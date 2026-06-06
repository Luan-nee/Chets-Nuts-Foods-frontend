import { createContext, useContext, useState } from 'react';
import type { UserRole } from '../types/constantes.type';

interface AuthContextType {
  user: string | null;
  token: string | null;
  rol: UserRole | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(()=>{
    if (localStorage.getItem("user")) {
      return localStorage.getItem("user")
    } else {
      console.log("No se encontró usuario en localStorage");
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(()=>{
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token")
    } else {
      console.log("No se encontró token en localStorage");
      return null;
    }
  });

  const [rol, setRol] = useState<UserRole | null>(()=>{
    if (localStorage.getItem("rol")) {
      return localStorage.getItem("rol") as UserRole;
    } else {
      console.log("No se encontró rol en localStorage");
      return "SIN ROL" as UserRole;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(()=>{
    const token = localStorage.getItem("token");
    return token ? true : false; 
  });

  const logout = () => {
    setUser(null);
    setToken(null);
    setRol(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  };

  return (
    <AuthContext.Provider value={{ user, token, rol, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
