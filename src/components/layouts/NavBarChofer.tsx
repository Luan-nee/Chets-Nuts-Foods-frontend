import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Navigation, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import UserInfo from '../ui/UserInfo';

type LabelType = '/guias' | '/transporte' | '/';

interface MenuItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  anchor: LabelType;
}

export default function NavBarChofer() {
  const { user, logout } = useAuth();
  const [active, setActive] = useState<LabelType>('/guias');

  const menuItems: MenuItem[] = [
    { icon: Truck, label: 'Mis Guías', anchor: '/guias' },
    { icon: Navigation, label: 'Transporte', anchor: '/transporte' },
  ];

  return (
    <div className="w-52 bg-gray-900 border-r border-gray-800 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm">LogiTrans ERP</h1>
            <p className="text-xs text-gray-400">Chofer</p>
          </div>
        </div>
      </div>

      <nav className="p-3 space-y-1 flex-1">
        {menuItems.map((item) => (
          <Link key={item.label} to={item.anchor}>
            <button
              onClick={() => setActive(item.anchor)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active === item.anchor
                  ? 'bg-green-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-800 space-y-2">
        <UserInfo nombreUser={user?.nombreUser || ''} rol={user?.rol || ''} />
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-red-900 hover:text-red-200 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}
