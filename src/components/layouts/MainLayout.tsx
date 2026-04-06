import NavBar from "./NavBar";
import { useAuth } from '../../context/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      { isAuthenticated && user ? <NavBar /> : <div>Usuario no identificado</div> }
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
