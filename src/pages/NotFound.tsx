import { useNavigate } from "react-router-dom";
import ContentPageMain from "../components/layouts/contentPageMain";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <ContentPageMain>
      <div className="w-full h-screen flex flex-col items-center justify-center text-center">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          404 - Ruta no
          <br />
          encontrada
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Parece que el destino que buscas no existe.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Regresar al Inicio
          </button>
        </div>
      </div>
    </ContentPageMain>
  );
}
