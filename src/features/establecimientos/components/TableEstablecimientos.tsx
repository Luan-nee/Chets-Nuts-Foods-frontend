import { 
  Edit2, 
  Eye, 
  Building2 
} from "lucide-react";
import Table from "../../../components/ui/Table";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import type { ResponseGetAll } from "../../../types/establecimiento.type";

interface PropTableEstablecimiento {
  establecimientos: ResponseGetAll[];
  isLoading: boolean;
  isError: boolean;
  recargarEstablecimientos: () => Promise<void>;
  setShowFormUpdate: (p: boolean) => void;
  setShowDetallesEstablecimiento: (p: boolean) => void;
  setSelectEstablecimientoId: (p: number| null) => void;
}

export default function TableEstablecimientos({
  establecimientos,
  isLoading,
  isError,
  recargarEstablecimientos,
  setShowFormUpdate,
  setShowDetallesEstablecimiento,
  setSelectEstablecimientoId,
}: PropTableEstablecimiento) {
  const tableHeader: string[] = [
    "Establecimiento",
    "Ubicación",
    "Dirección",
    "Acciones",
  ];

  return (
    <ContentSectionProcess 
      isLoading={isLoading}
      isError={isError}
      textError="Error al cargar los establecimientos."
      textButtonError="Reintentar"
      fetchData={recargarEstablecimientos}
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

            {/* Ubicación */}
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <span className="text-sm text-gray-300">{establecimiento.distrito} / {establecimiento.provincia}</span>
              </div>
            </td>

            {/* Dirección */}
            <td className="px-6 py-4">
              <span className="text-sm text-gray-300">{establecimiento.direccion}</span>
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
