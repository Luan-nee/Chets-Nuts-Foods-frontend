import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import AppRoutes from './routes/AppRoutes'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
    <Toaster 
      position="top-right" 
      richColors
      closeButton
      theme='dark'
    />
  </StrictMode>,
)