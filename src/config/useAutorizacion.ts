import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/usuario.type';

interface Permisos {
  tienePermiso: (permiso: string) => boolean;
}

export function useAutorizacion (): Permisos {
  const { user } = useAuth();

  const PERMISOS: Record<string, UserRole[]> = {
    PUEDE_LISTAR_GUIAS_DE_REMISION: ['ADMIN', 'COLABORADOR'],  
    PUEDE_VER_DETALLES_DE_LA_GUIA_DE_REMISION: ['ADMIN', 'COLABORADOR'],
    PUEDE_CREAR_GUIA_DE_REMISION: ['COLABORADOR'],
    PUEDE_EDITAR_GUIA_DE_REMISION: ['COLABORADOR']
  };

  const tienePermiso = (permiso: string): boolean => {
    if (!user) return false;
    if (!PERMISOS[permiso]) return false;
    return PERMISOS[permiso].includes(user.rol);
  }

  return { tienePermiso };
}
