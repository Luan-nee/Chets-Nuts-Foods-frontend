import { Edit2, Eye, MapPin, Building2 } from "lucide-react";
import Table from "../../../components/ui/Table";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import { useFetchEstablecimientos } from "../hooks/useFetchEstablecimientos";

interface PropTableEstablecimiento {
  setShowFormUpdate: (p: boolean) => void;
  setShowDetallesEstablecimiento: (p: boolean) => void;
  setSelectEstablecimientoId: (p: number| null) => void;
}

export default function TableEstablecimientos({
  setShowFormUpdate,
  setShowDetallesEstablecimiento,
  setSelectEstablecimientoId,
}: PropTableEstablecimiento) {
  
  const {
    establecimientos,
    isLoading: establecimientosIsLoading,
    isError: establecimientosIsError,
    execute: recargarEstablecimientos,
  } = useFetchEstablecimientos();

  const tableHeader: string[] = [
    "Establecimiento",
    "Código SUNAT",
    "Ubicación",
    "Dirección",
    "Tipo",
    "Estado",
    "Acciones",
  ];

  return (
    <ContentSectionProcess 
      isLoading={establecimientosIsLoading}
      isError={establecimientosIsError}
      textError="Error al cargar los establecimientos."
      textButtonError="Reintentar"
      fetchData={() => recargarEstablecimientos()}
    >

    <div className="flex-1 overflow-auto px-8 py-6">
      <div className="p-4 flex justify-end gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => recargarEstablecimientos()}>
          Recargar
        </button>
      </div>

      <Table tableHeader={tableHeader} cantidadDatos={establecimientos.length}>
        {establecimientos?.map((establecimiento, index) => (
          <tr
            key={index}
            className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors"
          >
            {/* Establecimiento */}
            <td className="px-6 py-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-[#1f6feb]/15 p-2">
                  <Building2 className="w-5 h-5 text-[#1f6feb]" />
                </div>
                <div className="min-w-0">
                  <span className="block font-medium text-sm text-white truncate">
                    {establecimiento.nombreEst}
                  </span>
                  <span className="block text-xs text-gray-400 truncate">
                    {establecimiento.descripcion}
                  </span>
                </div>
              </div>
            </td>

            {/* Código SUNAT */}
            <td className="px-6 py-4">
              <span className="text-sm text-white">
                {establecimiento.codigoSunat ?? "No registrado"}
              </span>
            </td>

            {/* Ubicación */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{establecimiento.distrito}, {establecimiento.provincia}</span>
              </div>
            </td>

            {/* Dirección */}
            <td className="px-6 py-4">
              <span className="text-sm text-gray-300">{establecimiento.direccion}</span>
            </td>

            {/* Tipo */}
            <td className="px-6 py-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border bg-blue-500/20 text-blue-300 border-blue-500/30`}
              >
                {establecimiento.tipoestablecimiento}
              </span>
            </td>

            {/* Estado */}
            <td className="px-6 py-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border ${
                  establecimiento.estado
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                }`}
              >
                {establecimiento.estado ? "Activo" : "Inactivo"}
              </span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
              <div className="flex items-center justify-end gap-2">
                <button
                  className="p-2 hover:bg-[#21262d] rounded-lg transition-colors"
                  aria-label="Ver establecimiento"
                  onClick={() => {
                    setSelectEstablecimientoId(establecimiento.idEst);
                    setShowDetallesEstablecimiento(true);
                  }}
                >
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  className="p-2 hover:bg-[#21262d] rounded-lg transition-colors"
                  aria-label="Editar establecimiento"
                  onClick={() => {
                    setSelectEstablecimientoId(establecimiento.idEst);
                    setShowFormUpdate(true);
                  }}
                >
                  <Edit2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>

    </ContentSectionProcess>
  );
}
