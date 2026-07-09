import { useState } from "react";
import InputSearch from "../components/ui/InputSearch";

interface Product {
  idproductdefect: number;
  nombre: string;
  descripcion: string;
  fechacreation: string;
}

const products: Product[] = [
  { idproductdefect: 1, nombre: "castaña", descripcion: "Producto de castaña", fechacreation: "2026-07-08T04:28:05.000Z" },
  { idproductdefect: 2, nombre: "nuez", descripcion: "Producto de nuez", fechacreation: "2026-07-08T04:28:05.000Z" },
  { idproductdefect: 3, nombre: "almendra", descripcion: "Producto de almendra", fechacreation: "2026-07-08T04:28:05.000Z" },
];

export default function Test() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-[#1a1f2e] flex items-center justify-center p-8">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-100">Buscar producto</h1>
          <p className="text-sm text-slate-500 mt-1">
            Selecciona el campo de referencia y escribe para filtrar.
          </p>
        </div>

        <InputSearch<Product>
          objets={products}
          atributes={["nombre", "descripcion", "idproductdefect", "fechacreation"]}
          setObjetSelected={(p) => setSelectedProduct(p)}
          placeholder="Buscar"
        />

        {selectedProduct && (
          <pre className="text-xs text-slate-400 bg-[#1e2535] border border-[#2d3748] rounded-xl p-4 overflow-auto">
            {JSON.stringify(selectedProduct, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}