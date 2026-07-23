import { Hash, CalendarDays, Check, Plus, Edit } from 'lucide-react';
import Table from '../../../../components/ui/Table';

interface SalidaTransporteTableProps {
  salidaTransportes: any[];
  idSelected: number | null;
  isAdmin: boolean;
  onSelect: (id: number) => void;
  onDeselect: () => void;
  onCreateNew: () => void;
  onEdit: (salida: any) => void;
  onOpenDetails: (id: number) => void;
  formatFechaSalida: (fechaStr: string) => string;
}

export default function SalidaTransporteTable({
  salidaTransportes,
  idSelected,
  isAdmin,
  onSelect,
  onDeselect,
  onCreateNew,
  onEdit,
  onOpenDetails,
  formatFechaSalida,
}: SalidaTransporteTableProps) {
  const tableHeader = ["ID Salida", "Estado", "Fecha de salida", "Acciones"];

  return (
    <div className="px-6 py-6 bg-gray-900 mx-6 rounded-xl border border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">Salidas de Transporte Activas</h3>
          <p className="text-sm text-slate-400">Selecciona una salida en progreso para tu guía o registra una nueva.</p>
        </div>
        <button
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Crear nueva salida
        </button>
      </div>

      <Table tableHeader={tableHeader} cantidadDatos={salidaTransportes.length}>
        {salidaTransportes.map((salida, index) => {
          const isInicio = salida.estadotransporte === "INICIO";
          const canEdit = isAdmin && isInicio;

          return (
            <tr
              key={index}
              className={`border-b border-gray-800 hover:bg-gray-800/40 transition-colors ${idSelected === salida.idsalidatransporte ? 'bg-blue-900/10' : ''
                }`}
            >
              {/* ID */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${idSelected === salida.idsalidatransporte ? 'bg-blue-500/20' : 'bg-gray-800'
                    }`}>
                    <Hash className={`w-4 h-4 ${idSelected === salida.idsalidatransporte ? 'text-blue-400' : 'text-slate-400'
                      }`} />
                  </div>
                  <div>
                    <span className="block font-semibold text-sm text-slate-200">
                      Salida #{salida.idsalidatransporte}
                    </span>
                  </div>
                </div>
              </td>

              {/* Estado */}
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                  {salida.estadotransporte}
                </span>
              </td>

              {/* Fecha */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CalendarDays className="w-4 h-4 text-slate-500" />
                  <span>{formatFechaSalida(salida.fechasalida)}</span>
                </div>
              </td>

              {/* Acciones */}
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onOpenDetails(salida.idsalidatransporte)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all"
                  >
                    Detalles
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => onEdit(salida)}
                      disabled={!canEdit}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${canEdit
                        ? "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-400 cursor-pointer"
                        : "bg-gray-800/50 border-gray-800 text-slate-500 cursor-not-allowed"
                        }`}
                      title={!isInicio ? "Solo se pueden editar salidas en estado INICIO" : "Editar salida"}
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Editar
                    </button>
                  )}

                  {idSelected === salida.idsalidatransporte ? (
                    <button
                      onClick={onDeselect}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-xs font-semibold border border-green-500/30 transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Seleccionada
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelect(salida.idsalidatransporte)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-slate-300 rounded-lg text-xs font-medium transition-all"
                    >
                      Seleccionar
                    </button>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}
