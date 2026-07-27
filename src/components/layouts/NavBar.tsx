import { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Package, Users, LogOut, Settings, MapPin, CarIcon } from "lucide-react";
import type { UserRole } from "../../types/constantes.type";
import { useAuth } from "../../context/AuthContext";
import UserInfo from "../ui/UserInfo";

type LabelType =
  | "/guias"
  | "/productos"
  | "/establecimientos"
  | "/trabajadores"
  | "/vehiculos"
  | "/configuraciones"
  | "/seguimiento"
  | "/clientes"
  | "/transporte"
  | "/test";

interface MenuItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  anchor: LabelType;
  userRol: UserRole[];
}

export default function NavBarAdministrador() {
  const { auth, logout } = useAuth();
  const [active, setActive] = useState<LabelType>("/guias");

  // la propiedad "useRol" indica que roles de usuario pueden ver ese item del menu, por ejemplo, el item "Productos" solo lo pueden ver los usuarios con rol "ADMIN"

  const menuItems: MenuItem[] = [
    { icon: Package, label: "Guías de Remisión", anchor: "/guias", userRol: ["ADMIN", "COLABORADOR"] },
    { icon: Users, label: "Trabajadores", anchor: "/trabajadores", userRol: ["ADMIN"] },
    { icon: Package, label: "Productos", anchor: "/productos", userRol: ["ADMIN"] },
    { icon: Truck, label: "Vehículos", anchor: "/vehiculos", userRol: ["ADMIN"] },
    { icon: Settings, label: "Configuraciones", anchor: "/configuraciones", userRol: ["ADMIN"] },
    { icon: MapPin, label: "Seguimiento", anchor: "/seguimiento", userRol: ["ADMIN", "CHOFER", "CLIENTE"] },
    { icon: Package, label: "Clientes", anchor: "/clientes", userRol: ["ADMIN", "COLABORADOR"] },
    { icon: MapPin, label: "Establecimientos", anchor: "/establecimientos", userRol: ["ADMIN"] },
    { icon: CarIcon, label: "Transporte", anchor: "/transporte", userRol: ["CHOFER"] },
    { icon: Package, label: "Test", anchor: "/test", userRol: ["ADMIN"] },
  ];

  return (
    <div className="w-52 bg-gray-900 border-r border-gray-800 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm">Chets Nuts Foods</h1>
            <p className="text-xs text-gray-400">dashboard</p>
          </div>
        </div>
      </div>

      <nav className="p-3 space-y-1 flex-1">
        {menuItems.map((item) => (
          auth.rol && item.userRol.includes(auth.rol) && (
            <Link key={item.label} to={item.anchor}>
              <button
                onClick={() => setActive(item.anchor)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active === item.anchor
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </Link>
          )
        ))}
      </nav>

      <div className="p-3 border-t border-gray-800 space-y-2">
        <UserInfo nombreUser={auth.user || "Anónimo"} rol={auth.rol || "Sin asignar"} />
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
