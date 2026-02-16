import type { JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import ListaGre from "../pages/administrador/ListaGre";
import Establecimientos from "../pages/administrador/Establecimientos";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import MainLayout from "../components/layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import Trabajadores from "../pages/administrador/Trabajadores";
import Vehiculos from "../pages/administrador/Vehiculos";
import Configuraciones from "../pages/administrador/Configuraciones";

type AppRouteType = {
  path: string;
  element: JSX.Element;
};

const appRoutes: AppRouteType[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/configuraciones",
    element: <Configuraciones />,
  },
  {
    path: "/guias",
    element: <ListaGre />,
  },
  {
    path: "/establecimientos",
    element: <Establecimientos />,
  },
  {
    path: "/trabajadores",
    element: <Trabajadores />,
  },
  {
    path: "/vehiculos",
    element: <Vehiculos />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {
            appRoutes.map(({ path, element }, index) => (
              <Route
                key={index}
                path={path}
                element={
                  <PrivateRoute>
                    <MainLayout>
                      {element}
                    </MainLayout>
                  </PrivateRoute>
                }
              />
            ))
          }
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
