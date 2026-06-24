// importación de componentes IU
import { Truck, Package, ChevronRight, Info, MapPin} from 'lucide-react';
import Loading from '../../../components/ui/Loading';
import Table from '../../../components/ui/Table';
// importación de custom hooks
import { useFetchDetallesGuiaRemision } from '../hooks/useFetchDetallesGuiaRemision';

interface DetallesGreProps {
  showDetallesGre: (p: boolean) => void;
  selectedGreId: number | null;
}

const headerTable: string[] = [
  'Nº',
  'Nombre',
  'Cantidad'
]

export default function DetallesGre({ showDetallesGre, selectedGreId }: DetallesGreProps) {
  // usa el hook personalizado para obtener los detalles de la guía de remisión
  const { data: detallesGre, isLoading, isError } = useFetchDetallesGuiaRemision(selectedGreId);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <span>Guías de Remisión</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Detalle</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {
              isLoading ? (
                <Loading w={10} h={10} color="blue" />
              ) : isError ? (
                <div className="flex justify-center items-center py-2">
                  <p className="text-red-500">Error al cargar.</p>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-white">{detallesGre?.numero}</h1>
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white border border-gray-700 ">
                    {detallesGre?.estado.toUpperCase()}
                  </span>
                </>
              )
            }
          </div>
          <div className="flex items-center gap-3">
            {/* botón para cerrar */}
            <button
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors border border-gray-700"
              title="Cerrar Detalles"
              onClick={() => showDetallesGre(false)}
            >
              <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
              Regresar
            </button>
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-sm text-gray-400">
            Código de Seguimiento: <span className={`text-gray-300 font-mono ${isError && 'text-red-500'}`}>
                { 
                  isLoading ? "cargando..." : isError ? "Error al cargar." : detallesGre?.clave
                }
              </span>
          </p>
        </div>
      </div>

      {
        isLoading ? (
          <div className="flex justify-center items-center py-14">
            <Loading w={10} h={10} color="blue" />
          </div>
        ) : isError ? (
          <div className="flex flex-col gap-4 justify-center items-center py-6">
            <p className="text-red-500">Error al cargar los detalles de la guía.</p>
            <button className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium ml-4 px-4 py-2 bg-red-600 text-white rounded" onClick={() => showDetallesGre(false)}>
              <ChevronRight className="w-5 h-5 text-white rotate-180" />
              Regresar
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-auto px-8 py-6">
            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {/* Información General */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Info className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">INFORMACIÓN GENERAL</h2>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Fecha de Emisión</p>
                    <p className="text-sm text-white font-medium">{detallesGre?.fecha_emision}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Hora de Registro</p>
                    <p className="text-sm text-white font-medium">{detallesGre?.hora}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Observaciones</p>
                    <p className="text-sm text-gray-300 italic">{detallesGre?.observacion}</p>
                  </div>
                </div>
              </div>

              {/* Remitente y Destinatario */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">REMITENTE Y DESTINATARIO</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Remitente</p>
                    <p className="text-sm text-white font-semibold">{detallesGre?.remitente.nombre_razonSocial}</p>
                    <p className="text-xs text-gray-400">{detallesGre?.remitente.tipo_documento}: {detallesGre?.remitente.numero_documento}</p>
                    <p className="text-xs text-gray-400">{detallesGre?.remitente.direccion_fiscal}</p>
                  </div>
                  <div className="border-t border-gray-800 pt-4">
                    <p className="text-xs text-gray-500 uppercase mb-1">Destinatario</p>
                    <p className="text-sm text-white font-semibold">{detallesGre?.destinatario.nombre_razonSocial}</p>
                    <p className="text-xs text-gray-400">{detallesGre?.destinatario.tipo_documento}: {detallesGre?.destinatario.numero_documento}</p>
                    <p className="text-xs text-gray-400">{detallesGre?.destinatario.direccion_fiscal}</p>
                  </div>
                </div>
              </div>

              {/* Detalles del Transporte */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">DETALLES DEL TRANSPORTE</h2>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Conductor</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold">
                          {
                            detallesGre &&
                            detallesGre?.transporte.conductor.nombres.charAt(0) + detallesGre?.transporte.conductor.apellidos.charAt(0)
                          }
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{detallesGre?.transporte.conductor.nombres} {detallesGre?.transporte.conductor.apellidos}</p>
                        <p className="text-xs text-gray-400">Licencia: {detallesGre?.transporte.conductor.numero_licencia}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Vehículo</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                        <Truck className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{detallesGre?.transporte.vehiculo.placa}</p>
                        <div className="flex gap-3 text-xs text-gray-400">
                          <span>Tipo: {detallesGre?.transporte.vehiculo.tipoVehiculo}</span>
                          <span>Cap: {detallesGre?.transporte.vehiculo.capacidadCarga} kg.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white">Detalle de Productos ({detallesGre?.productos.length} Items)</h2>
              </div>
              
              <div className="overflow-x-auto">
                <Table tableHeader={headerTable} cantidadDatos={detallesGre?.productos.length || 0}>
                  {detallesGre?.productos.map((producto, index) => (
                    <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-gray-400 font-medium">{index}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white">{producto.nombre}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">{producto.cantidad}</span>
                      </td>
                    </tr>
                  ))}
                </Table>
              </div>
            </div>

            {/* Summary Card */}
            <div className="flex justify-end">
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 w-96">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-semibold text-white uppercase">Resumen de Carga</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Cantidad Total:</span>
                    <span className="text-lg font-bold text-white">{detallesGre?.resumen_carga.cantidad_productos} Unidades</span>
                  </div>
                  <div className="border-t border-gray-800 pt-3 flex justify-between items-center">
                    <span className="text-sm text-gray-400">Peso Total:</span>
                    <span className="text-2xl font-bold text-blue-400">{detallesGre?.resumen_carga.peso_total.toFixed(2)} kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}