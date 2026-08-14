import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

interface PropPagination {
  total_paginas: number;
  pagina_actual: number;
  datos_por_pagina: number;
  total_data: number;
  fetchData: (pagina: number) => void;
  reload?: () => void;
}

export default function ButtonsPagination({
  total_paginas,
  pagina_actual,
  fetchData,
  datos_por_pagina,
  total_data,
  reload
}: PropPagination) {
  /* El "pagina_actual" es el número de página actual. */
  const clickArrows: (
    pagina_actual: number,
    total_paginas: number,
    tipoArrow: "left" | "right",
  ) => number = (
    pagina_actual: number,
    total_paginas: number,
    tipoArrow: "left" | "right",
  ) => {
    if (pagina_actual - 1 >= 1 && pagina_actual + 1 <= total_paginas) {
      if (tipoArrow === "left") {
        pagina_actual = pagina_actual - 1;
        fetchData(pagina_actual);
      } else if (tipoArrow === "right") {
        pagina_actual = pagina_actual + 1;
        fetchData(pagina_actual);
      }
    }
    return pagina_actual;
  };
  const clickPage: (pagina_actual: number) => void = (pagina_actual: number) => {
    fetchData(pagina_actual);
  };

  {
    // No recuerdo cual es el propósito de 
    // este bloque de código, pero lo dejo por si acaso.
    /* 
    activado = bg-blue-600 text-white rounded-lg text-sm font-medium
    desactivado = hover:bg-gray-800 text-gray-400 rounded-lg text-sm font-medium transition-colors
  */
  }

  return (
    <div className="flex justify-between px-4 max-md:flex-col max-md:items-center">
      <p className="text-sm text-gray-400 bg-gray-900 px-4 py-2 rounded-t-lg">
        Mostrando <span className="font-medium text-gray-300">{1}</span> a{" "}
        <span className="font-medium text-gray-300">{datos_por_pagina}</span> de{" "}
        <span className="font-medium text-gray-300">{total_data}</span>{" "}
        resultados
      </p>

      <div className="flex items-center gap-2 bg-gray-900 px-4 py-1 rounded-t-lg">
        <button
          className="p-1 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => clickArrows(pagina_actual, total_paginas, "left")}
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>

        {Array.from({ length: total_paginas }, (_, i) => i + 1).map(
          (pagina) => (
            <button
              key={pagina}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                pagina === pagina_actual
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
          onClick={() => clickArrows(pagina_actual, total_paginas, "right")}
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        { reload && (
          <button
            className="
              bg-blue-600 hover:bg-blue-700
              flex flex-row items-center gap-2 p-2 rounded-lg transition-colors"
            onClick={() => reload()}
          >
            <span className="max-md:text-sm">Recargar</span>
            <RefreshCw className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
