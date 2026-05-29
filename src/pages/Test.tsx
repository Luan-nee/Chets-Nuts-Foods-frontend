import { useState } from 'react'

// Definimos la estructura de los datos para TypeScript
interface DataItem {
  id: number
  title: string
  description: string
  category: string
}

export default function Test() {
  // Estado simulado para la lista de datos
  const [items, setItems] = useState<DataItem[]>([
    { id: 1, title: 'Guía de Remisión 001', description: 'Traslado de mercancía a almacén central.', category: 'Logística' },
    { id: 2, title: 'Factura Electrónica E004', description: 'Validación pendiente por SUNAT.', category: 'Facturación' },
    { id: 3, title: 'Control de Stock', description: 'Inventario de materia prima actualizado.', category: 'Inventario' },
  ])

  // Estado para el formulario
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General'
  })

  // Manejador del cambio de inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Manejador del envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    const newItem: DataItem = {
      id: Date.now(),
      ...formData
    }

    setItems(prev => [newItem, ...prev])
    setFormData({ title: '', description: '', category: 'General' }) // Limpiar formulario
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Contenedor Principal en Grid: 1 columna en móvil, 2 en pantallas medianas/grandes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= SECCIÓN 1: FORMULARIO (4 columnas de 12) ================= */}
          <section className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-indigo-600"></span>
                Registro de Datos
              </h1>
              <p className="text-sm text-slate-500 mt-1">Completa los campos para agregar un nuevo registro.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Título o Código
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ej. Guía de Remisión, Item..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Categoría
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200"
                >
                  <option value="General">General</option>
                  <option value="Logística">Logística</option>
                  <option value="Facturación">Facturación</option>
                  <option value="Inventario">Inventario</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Detalles específicos del registro..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-xl text-sm shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
              >
                Enviar datos
              </button>
            </form>
          </section>

          {/* ================= SECCIÓN 2: VISTA DE DATOS (7 columnas de 12) ================= */}
          <section className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col min-h-[500px]">
            
            {/* Cabecera de la sección de Datos con acciones */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Panel de Datos</h1>
                <p className="text-sm text-slate-500 mt-1">Registros actuales en el sistema.</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Datos recargados')}
                  className="inline-flex items-center justify-center bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-medium h-9 px-3 rounded-lg transition-all duration-150 active:bg-slate-50"
                >
                  Recargar datos
                </button>
                <button 
                  onClick={() => alert('Cambiando de página...')}
                  className="inline-flex items-center justify-center bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-medium h-9 px-3 rounded-lg transition-all duration-150 active:bg-slate-50"
                >
                  Cambiar página
                </button>
              </div>
            </div>

            {/* Lista de tarjetas para mostrar los datos */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px] pr-1">
              {items.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  No hay datos registrados todavía.
                </div>
              ) : (
                items.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/70 transition-all duration-200 flex items-start justify-between gap-4 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {item.description || 'Sin descripción proporcionada.'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}