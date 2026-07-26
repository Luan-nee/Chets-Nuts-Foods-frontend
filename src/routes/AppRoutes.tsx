import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import MainLayout from "../components/layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import Trabajadores from "../pages/Trabajadores";
import Vehiculos from "../pages/Vehiculos";
import Configuraciones from "../pages/Configuraciones";
import Productos from "../pages/Productos";
import Seguimiento from "../pages/Seguimiento";
import Clientes from "../pages/Clientes";
import Establecimientos from "../pages/Establecimientos";
import GuiasDeRemision from "../pages/GuiasDeRemision";
import Transporte from "../pages/Transporte";
import { SocketProvider } from "../context/SocketContext";
import { GreProvider } from "../context/GreContext";
import { SalidaTransporteProvider } from "../context/SalidaTransporteContext";
import { AccesosProvider } from "../context/AccesosContext";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GreProvider>
          <SocketProvider>
            <AccesosProvider>
              <SalidaTransporteProvider>
                <Routes>
                  <Route path="/login" element={<Login />} />

                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <MainLayout>
                          <GuiasDeRemision />
                        </MainLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/transporte"
                    element={
                      <PrivateRoute>
                        <MainLayout>
                          <Transporte />
                        </MainLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/guias"
                    element={
                      <PrivateRoute>
                        <MainLayout>
                          <GuiasDeRemision />
                        </MainLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/establecimientos"
                    element={
                      <PrivateRoute>
                        <MainLayout>
                          <Establecimientos />
                        </MainLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/clientes"
                    element={
                      <PrivateRoute>
                        <MainLayout>
                          <Clientes />
                        </MainLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/productos"
                    element={
                      <PrivateRoute>
                        <MainLayout>
                          <Productos />
                        </MainLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/seguimiento"
                    element={
                      <PrivateRoute>
                        <MainLayout>
                          <Seguimiento />
                        </MainLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/configuraciones"
                    element={
                      <PrivateRoute>
                        <MainLayout>
                          <Configuraciones />
                        </MainLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/trabajadores"
                    element={
                      <PrivateRoute>
                        <MainLayout>
                          <Trabajadores />
                        </MainLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/vehiculos"
                    element={
                      <PrivateRoute>
                        <MainLayout>
                          <Vehiculos />
                        </MainLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <PrivateRoute>
                        <MainLayout>
                          <NotFound />
                        </MainLayout>
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </SalidaTransporteProvider>
            </AccesosProvider>
          </SocketProvider>
        </GreProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
