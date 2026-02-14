import { useAuth } from '../../context/AuthContext';
import NavBarAdministrador from './NavBarAdministrador';
import NavBarChofer from './NavBarChofer';
import NavBarTrabajador from './NavBarTrabajador';

export default function MainNavBar() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <div>Usuario no identificado</div>;
  }

  if (user?.rol === 'ADMIN') {
    return <NavBarAdministrador />
  }

  if (user?.rol === 'CHOFER') {
    return <NavBarChofer />
  }
  
  if (user?.rol === 'COLABORADOR') {
    return <NavBarTrabajador />
  }

  return <div>Usuario no identificado {user?.rol}</div>;
}