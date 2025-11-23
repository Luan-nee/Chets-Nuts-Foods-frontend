import { useState, useEffect } from 'react';
import { Package, DollarSign, TrendingUp, AlertCircle, Save, X, Info } from 'lucide-react';

interface ProductFormData {
  id: number;
  sku: string;
  nombre: string;
  stock_actual: number;
  stock_minimo: number;
  porcentaje_ganancia: number;
  precio_compra_proveedor: number;
  descripcion: string;
  id_usuario_admin: number;
}

export default function ProductEditForm() {
  // Datos iniciales del producto
  const initialProduct: ProductFormData = {
    id: 1,
    sku: "P000001",
    nombre: "Nueces Mixtas Premium",
    stock_actual: 0,
    stock_minimo: 10,
    porcentaje_ganancia: 0.3000,
    precio_compra_proveedor: 20.00,
    descripcion: "Mezcla premium de nueces seleccionadas, ideal para snacks saludables.",
    id_usuario_admin: 1
  };

  const [formData, setFormData] = useState<ProductFormData>(initialProduct);
  const [precioVenta, setPrecioVenta] = useState(0);
  const [gananciaUnitaria, setGananciaUnitaria] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});
  const [isModified, setIsModified] = useState(false);

  // Calcular precio de venta y ganancia cuando cambien los valores relevantes
  useEffect(() => {
    const venta = formData.precio_compra_proveedor * (1 + formData.porcentaje_ganancia);
    const ganancia = venta - formData.precio_compra_proveedor;
    setPrecioVenta(venta);
    setGananciaUnitaria(ganancia);
  }, [formData.precio_compra_proveedor, formData.porcentaje_ganancia]);

  // Detectar cambios en el formulario
  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialProduct);
    setIsModified(hasChanges);
  }, [formData]);

  const handleChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar error del campo al modificarlo
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (formData.stock_actual < 0) {
      newErrors.stock_actual = "El stock actual no puede ser negativo";
    }

    if (formData.stock_minimo < 0) {
      newErrors.stock_minimo = "El stock mínimo no puede ser negativo";
    }

    if (formData.porcentaje_ganancia < 0) {
      newErrors.porcentaje_ganancia = "El porcentaje de ganancia no puede ser negativo";
    }

    if (formData.porcentaje_ganancia > 10) {
      newErrors.porcentaje_ganancia = "El porcentaje de ganancia parece muy alto (máx 1000%)";
    }

    if (formData.precio_compra_proveedor <= 0) {
      newErrors.precio_compra_proveedor = "El precio de compra debe ser mayor a 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Producto actualizado:", formData);
      alert("Producto actualizado exitosamente");
      setIsModified(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialProduct);
    setErrors({});
    setIsModified(false);
  };

  const stockBajo = formData.stock_actual <= formData.stock_minimo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Editar Producto</h1>
          <p className="text-gray-600">Modifica la información del producto seleccionado</p>
        </div>

        <div className="space-y-6">
          {/* Card principal del formulario */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            
            {/* SKU (Solo lectura) */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                SKU (Código del Producto)
              </label>
              <div className="flex items-center gap-2 text-gray-600">
                <Package size={18} />
                <span className="font-mono text-lg font-bold">{formData.sku}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Este código no se puede modificar</p>
            </div>

            {/* Nombre del producto */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingrese el nombre del producto"
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.nombre}
                </p>
              )}
            </div>

            {/* Stock y Stock Mínimo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock Actual *
                </label>
                <input
                  type="number"
                  value={formData.stock_actual}
                  onChange={(e) => handleChange('stock_actual', Number(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.stock_actual ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min="0"
                />
                {errors.stock_actual && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.stock_actual}
                  </p>
                )}
                {stockBajo && !errors.stock_actual && (
                  <p className="text-amber-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    Stock por debajo del mínimo
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock Mínimo *
                </label>
                <input
                  type="number"
                  value={formData.stock_minimo}
                  onChange={(e) => handleChange('stock_minimo', Number(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.stock_minimo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min="0"
                />
                {errors.stock_minimo && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.stock_minimo}
                  </p>
                )}
              </div>
            </div>

            {/* Precio de compra y Porcentaje de ganancia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Precio de Compra al Proveedor *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.precio_compra_proveedor}
                    onChange={(e) => handleChange('precio_compra_proveedor', Number(e.target.value))}
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                      errors.precio_compra_proveedor ? 'border-red-500' : 'border-gray-300'
                    }`}
                    min="0.01"
                  />
                </div>
                {errors.precio_compra_proveedor && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.precio_compra_proveedor}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Porcentaje de Ganancia *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={formData.porcentaje_ganancia}
                    onChange={(e) => handleChange('porcentaje_ganancia', Number(e.target.value))}
                    className={`w-full pr-12 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                      errors.porcentaje_ganancia ? 'border-red-500' : 'border-gray-300'
                    }`}
                    min="0"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                    ({(formData.porcentaje_ganancia * 100).toFixed(2)}%)
                  </span>
                </div>
                {errors.porcentaje_ganancia && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.porcentaje_ganancia}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Info size={12} />
                  Ejemplo: 0.30 = 30% de ganancia
                </p>
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => handleChange('descripcion', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                rows={4}
                placeholder="Ingrese una descripción del producto"
                maxLength={150}
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {formData.descripcion.length}/150 caracteres
              </p>
            </div>
          </div>

          {/* Card de Cálculos Automáticos */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 border border-blue-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp size={24} className="text-blue-600" />
              Cálculos Automáticos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Precio de Venta */}
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <DollarSign size={18} />
                  <span className="text-sm font-semibold">Precio de Venta</span>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  ${precioVenta.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Precio sugerido al cliente
                </p>
              </div>

              {/* Ganancia Unitaria */}
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <TrendingUp size={18} />
                  <span className="text-sm font-semibold">Ganancia por Unidad</span>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  ${gananciaUnitaria.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Ganancia neta por venta
                </p>
              </div>

              {/* Ganancia Total en Stock */}
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Package size={18} />
                  <span className="text-sm font-semibold">Ganancia Total en Stock</span>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  ${(gananciaUnitaria * formData.stock_actual).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Si vendes todo el stock
                </p>
              </div>
            </div>

            {/* Fórmula explicativa */}
            <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Fórmula:</span> Precio Venta = Precio Compra × (1 + Porcentaje Ganancia)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Ejemplo: ${formData.precio_compra_proveedor.toFixed(2)} × (1 + {formData.porcentaje_ganancia}) = ${precioVenta.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={!isModified}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-all ${
                isModified
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Save size={20} />
              Guardar Cambios
            </button>

            <button
              onClick={handleCancel}
              disabled={!isModified}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-all ${
                isModified
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <X size={20} />
              Cancelar
            </button>
          </div>

          {isModified && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-semibold text-amber-800">Cambios sin guardar</p>
                <p className="text-xs text-amber-700">Has modificado el producto. Recuerda guardar los cambios.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}