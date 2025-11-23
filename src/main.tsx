import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css'
import NotFound from './pages/NotFound.tsx';
import EstadisticasView from './pages/estadisticas/EstadisticasView.tsx';
import GuiasRemisionView from './pages/guias-remision/GuiasRemisionView.tsx';
import ProductosView from './pages/productos/ProductosView.tsx';
import NavBar from './layouts/NavBar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <NavBar />

        {/* Main Content Area */}
        <main className="flex-1 p-2 bg-gradient-to-br from-gray-300 to-gray-100 overflow-y-auto">
          <Routes>
            <Route path="/" element={<EstadisticasView />} />
            <Route path="/estadisticas" element={<EstadisticasView />} />
            <Route path="/guias-remision" element={<GuiasRemisionView />} />
            <Route path="/productos" element={<ProductosView />} />
            <Route path="*" element={<NotFound />} />

            {/* ruta para probar componentes */}
            {/* <Route path="/pruebas" element={} /> */}
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  </StrictMode>,
)