import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListaGre from '../pages/administrador/ListaGre';
import Establecimientos from '../pages/administrador/Establecimientos';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import MainLayout from '../components/layouts/MainLayout';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../context/AuthContext';
import Trabajadores from '../pages/administrador/Trabajadores';
import Vehiculos from '../pages/administrador/Vehiculos';
import Configuraciones from '../pages/administrador/Configuraciones';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout>
                  <ListaGre />
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
            path="/guias"
            element={
              <PrivateRoute>
                <MainLayout>
                  <ListaGre />
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

          <Route path="*" element={
              <PrivateRoute>
                <MainLayout>
                  <NotFound />
                </MainLayout>
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
