// Interfaz (Sin cambios)
export interface Product {
  id: number;
  sku: string;
  nombre: string;
  stock_actual: number;
  stock_minimo: number;
  precio_venta: number;
  descripcion: string;
}

// Componente de Presentación
function ProductCard( product : Product) {
  // Función de utilidad para formatear el precio a moneda (Sin cambios)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(amount);
  };

  // --- LÓGICA DE LA BARRA DE STOCK ---
  const { stock_actual, stock_minimo } = product;
  
  // 1. Determinar el color de la barra (Sin cambios, esta lógica es para el estado)
  let barColorClass = '';
  
  if (stock_actual <= 1) {
    // Si el stock es 1 o menos
    barColorClass = 'bg-red-500'; 
  } else if (stock_actual < stock_minimo) {
    // Si el stock actual es menor al mínimo (pero mayor a 1)
    barColorClass = 'bg-yellow-500';
  } else {
    // Si el stock actual es mayor o igual al mínimo
    barColorClass = 'bg-green-500';
  }

  // 2. Determinar el ANCHO de la barra basado en el stock_actual
  // Calculamos el porcentaje del stock_actual respecto al stock_minimo.
  // Usamos Math.max(0, ...) para asegurarnos de que el porcentaje nunca sea negativo.
  // Usamos Math.min(..., 100) para asegurarnos de que la barra no exceda el 100% de su contenedor.
  const stockPercentage = Math.min(Math.max(0, (stock_actual / stock_minimo) * 100), 100);
  const barWidthStyle = { width: `${stockPercentage}%` };

  // 3. Estilo condicional para el texto de stock (Sin cambios)
  const stockTextClass = stock_actual <= 1
    ? 'text-red-600 font-extrabold' 
    : stock_actual < stock_minimo
      ? 'text-yellow-600 font-semibold'
      : 'text-green-600';

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl m-4 p-6 border border-gray-200 transition duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
        {product.nombre}
      </h2>
      <p className="text-sm font-mono text-gray-500 mb-4">
        SKU: <span className="font-semibold text-indigo-600">{product.sku}</span>
      </p>

      {/* --- Indicador de Stock (Barra Proporcional) --- */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex justify-between items-center">
          <span>Nivel de Stock 📦</span>
          <span className={`text-xl ${stockTextClass}`}>
            {stock_actual} / {stock_minimo}
          </span>
        </h3>
        {/* Contenedor de la barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-3 relative"> {/* Añadido 'relative' para el tooltip */}
          {/* Barra de progreso con estilo condicional y ancho dinámico */}
          <div 
            className={`h-3 rounded-full transition-all duration-500 ease-out ${barColorClass}`}
            style={barWidthStyle}
            title={`Stock al ${stockPercentage.toFixed(0)}% del mínimo`} // Tooltip al pasar el mouse
          ></div>
        </div>
        <p className={`text-xs mt-1 italic ${stockTextClass}`}>
          {stock_actual <= 1 
            ? '¡PELIGRO! Stock crítico o agotado.' 
            : stock_actual < stock_minimo
              ? 'Advertencia: Stock por debajo del mínimo.'
              : 'Stock adecuado.'
          }
        </p>
      </div>
      {/* ------------------------------------------- */}

      {/* --- Detalles del Producto (Ajustado) --- */}
      <div className="grid grid-cols-2 gap-4 mb-4 border-t border-b py-4">
        {/* Precio */}
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wider">Precio de Venta</p>
          <p className="text-2xl font-bold text-indigo-700">
            {formatCurrency(product.precio_venta)}
          </p>
        </div>
        
        {/* Stock Mínimo */}
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wider">Stock Mínimo Requerido</p>
          <p className="text-2xl font-bold text-gray-700">
            {product.stock_minimo} unidades
          </p>
        </div>
      </div>

      {/* --- Descripción (Sin cambios) --- */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
        <p className="text-gray-600 leading-relaxed italic">
          {product.descripcion}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;