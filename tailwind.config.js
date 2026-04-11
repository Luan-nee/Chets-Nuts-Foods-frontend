/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores de Marca y UI Principal
        'dark-deep': '#0b0f14', // Fondo oscuro profundo
        'dark-deep-slow': '#0b1e38', // Fondo oscuro profundo lento
        brand: {
          primary: '#137fec',   // Tu azul de hover
          secondary: '#94a393', // Tu verde apagado
        },
        // Superficies y Fondos
        surface: {
          layout: '#0b0f14',
          main: '#111821',
          line: '#1e293b',
        },
        // Tipografía e Iconos
        content: {
          base: '#94a3b8',    // Clasic
          strong: '#f8fafc',  // Strong
          inverse: '#0b0f14', // Select
        },
        // Estados Semánticos
        status: {
          success: {
            bg: '#081e15',
            content: '#4ade80',
          },
          info: {
            bg: '#111a34',
            content: '#60a5fa',
          },
          error: {
            bg: '#832a2a',
            content: '#ef4444',
          },
          warning: {
            bg: '#463f22',
            content: '#f09b0b',
          },
        },
      },
    },
  },
  plugins: [],
}