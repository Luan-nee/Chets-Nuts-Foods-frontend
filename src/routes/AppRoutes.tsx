import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ListaGre from '../pages/ListaGre';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import MainLayout from '../components/layouts/MainLayout';
import PrivateRoute from './PrivateRoute';
import Trabajadores from '../pages/Trabajadores';
import Vehiculos from '../pages/Vehiculos';
import Configuraciones from '../pages/Configuraciones';
import Productos from '../pages/Productos';
import Seguimiento from '../pages/Seguimiento';
import InputSelectTest from '../components/ui/InputSelectTest';

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
            path="/InputSelect"
            element={
              <PrivateRoute>
                <MainLayout>
                  <InputSelectTest />
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