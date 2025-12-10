import {
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Box,
} from "lucide-react";
import type { PropProduct } from "../../types/Product";

interface ProductCardActions {
  getIdProducto: (id: number) => void;
  showEditForm: (isOpen: boolean) => void;
  selectProduct: (product: PropProduct) => void | undefined;
}

type ProductCardProps = PropProduct & ProductCardActions;

export default function ProductCard({
  id,
  sku,
  nombre,
  stock_actual,
  stock_minimo,
  porcentaje_ganancia,
  precio_compra_proveedor,
  descripcion,
  id_usuario_admin,
  getIdProducto,
  showEditForm,
  selectProduct,
}: ProductCardProps) {
  // Calcular precio de venta
  const precioVenta: number =
    precio_compra_proveedor * (1 + porcentaje_ganancia);
  const gananciaTotal: number = precioVenta - precio_compra_proveedor;

  // Verificar si el stock está bajo
  const stockBajo: boolean = stock_actual <= stock_minimo;
  const porcentajeStock: number = (stock_actual / stock_minimo) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 max-w-sm">
      {/* Header con alerta de stock */}
      {stockBajo && (
        <div className="bg-red-500 text-white px-4 py-2 flex items-center gap-2 text-sm font-semibold">
          <AlertTriangle size={16} />
          <span>Stock Bajo - Requiere Reposición</span>
        </div>
      )}

      <div className="p-6">
        {/* SKU y Nombre */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <span>SKU:</span>
            <span className="font-mono font-semibold">{sku}</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{nombre}</h3>
          {descripcion && (
            <p className="text-gray-600 text-sm leading-relaxed">
              {descripcion}
            </p>
          )}
        </div>

        {/* Stock */}
        <div className="mb-4 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Box size={18} />
              <span className="font-semibold">Stock Disponible</span>
            </div>
            <span
              className={`text-2xl font-bold ${
                stockBajo ? "text-red-600" : "text-green-600"
              }`}
            >
              {stock_actual}
            </span>
          </div>

          {/* Barra de progreso de stock */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full transition-all ${
                stockBajo ? "bg-red-500" : "bg-green-500"
              }`}
              style={{ width: `${Math.min(porcentajeStock, 100)}%` }}
            ></div>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Package size={12} />
            <span>Mínimo requerido: {stock_minimo} unidades</span>
          </div>
        </div>

        {/* Precios */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm flex items-center gap-2">
              <DollarSign size={14} />
              Precio Compra
            </span>
            <span className="text-gray-800 font-semibold">
              ${precio_compra_proveedor}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm flex items-center gap-2">
              <TrendingUp size={14} />
              Ganancia
            </span>
            <span className="text-blue-600 font-semibold">
              {porcentaje_ganancia * 100}%
            </span>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <span className="text-gray-800 font-semibold">Precio Venta</span>
            <span className="text-2xl font-bold text-green-600">
              ${precioVenta}
            </span>
          </div>

          <div className="bg-green-50 rounded-lg p-3 text-center">
            <span className="text-xs text-gray-600">Ganancia por unidad:</span>
            <p className="text-lg font-bold text-green-700">
              ${gananciaTotal.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              getIdProducto(id);
              showEditForm(true);
              selectProduct({
                id,
                sku,
                nombre,
                stock_actual,
                stock_minimo,
                porcentaje_ganancia,
                precio_compra_proveedor,
                descripcion,
                id_usuario_admin,
              });
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Editar
          </button>
          <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
            Ver Más
          </button>
        </div>
      </div>
    </div>
  );
}
