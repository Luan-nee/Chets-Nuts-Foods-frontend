import { useState } from "react";


interface Props{
    valores:string[],
    setValores: (p:string)=>void,
    setEstado:(p:boolean)=>void
}


export default function Desplegable({setValores,valores,setEstado}:Props){

    const [open, setOpen] = useState(false);
    const [valor,setValor] = useState<string>("");

    return (
      <div className="relative w-56">
        <button
          onClick={() => setOpen(!open)}
          className="
      w-full flex items-center justify-between
      bg-gray-950 border border-gray-800
      hover:border-gray-600
      text-gray-300 px-4 py-2.5
      rounded-xl text-sm transition-all
      shadow-sm
    "
        >
          <span className={valor ? "text-white" : "text-gray-500"}>
            {valor || "Seleccionar estado"}
          </span>

          <svg
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {open && (
          <div
            className="
      absolute z-50 mt-2 w-full
      bg-gray-900 border border-gray-800
      rounded-xl overflow-hidden
      shadow-lg
    "
          >
            {valores.map((e) => (
              <div
                key={e}
                onClick={() => {
                  setValores(e);
                  setValor(e)
                  setOpen(false);
                  setEstado(true);
                }}
                className="
            px-4 py-2 text-sm
            text-gray-300
            hover:bg-gray-800
            cursor-pointer
            transition-colors
          "
              >
                {e}
              </div>
            ))}
          </div>
        )}
      </div>
    );

}