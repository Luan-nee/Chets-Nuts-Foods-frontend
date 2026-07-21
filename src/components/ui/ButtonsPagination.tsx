import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropPagination {
  total_paginas: number;
  pivote: number;
  datos_por_pagina: number;
  total_data: number;
  fetchData: (pagina: number) => void;
}

export default function ButtonsPagination({
  total_paginas,
  pivote,
  fetchData,
  datos_por_pagina,
  total_data,
}: PropPagination) {
  /* El "pivote" es el número de página actual. */
  const clickArrows: (
    pivote: number,
    total_paginas: number,
    tipoArrow: "left" | "right",
  ) => number = (
    pivote: number,
    total_paginas: number,
    tipoArrow: "left" | "right",
  ) => {
    if (pivote - 1 >= 1 && pivote + 1 <= total_paginas) {
      if (tipoArrow === "left") {
        pivote = pivote - 1;
        fetchData(pivote);
      } else if (tipoArrow === "right") {
        pivote = pivote + 1;
        fetchData(pivote);
      }
    }
    return pivote;
  };
  const clickPage: (pivote: number) => void = (pivote: number) => {
    fetchData(pivote);
  };

  {
    /* 
    activado = bg-blue-600 text-white rounded-lg text-sm font-medium
    desactivado = hover:bg-gray-800 text-gray-400 rounded-lg text-sm font-medium transition-colors
  */
  }

  return (
    <div className="flex items-center justify-between px-4">
      <p className="text-sm text-gray-400 bg-gray-900 px-4 py-2 rounded-t-lg">
        Mostrando <span className="font-medium text-gray-300">{1}</span> a{" "}
        <span className="font-medium text-gray-300">{datos_por_pagina}</span> de{" "}
        <span className="font-medium text-gray-300">{total_data}</span>{" "}
        resultados
      </p>

      <div className="flex items-center gap-2 bg-gray-900 px-4 py-1 rounded-t-lg">
        <button
          className="p-1 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => clickArrows(pivote, total_paginas, "left")}
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>

        {Array.from({ length: total_paginas }, (_, i) => i + 1).map(
          (pagina) => (
            <button
              key={pagina}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                pagina === pivote
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 text-gray-400 transition-colors"
              }`}
              onClick={() => clickPage(pagina)}
            >
              {pagina}
            </button>
          ),
        )}

        <button
          className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
          onClick={() => clickArrows(pivote, total_paginas, "right")}
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
