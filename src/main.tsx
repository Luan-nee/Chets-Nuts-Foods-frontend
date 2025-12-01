import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NotFound from './pages/NotFound.tsx';
import EstadisticasView from './pages/estadisticas/EstadisticasView.tsx';
import GuiasRemisionView from './pages/guias-remision/GuiasRemisionView.tsx';
import Productos from './pages/productos/ProductosView.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import NavBar from './layouts/NavBar.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <NavBar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-800 p-6">
          <Routes>
            <Route path="/" element={<EstadisticasView />} />
            <Route path="/estadisticas" element={<EstadisticasView />} />
            <Route path="/guias-remision" element={<GuiasRemisionView />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  </StrictMode>,
)