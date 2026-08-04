import { User, X, Check } from "lucide-react";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";
import { useFetchAccesos } from "../../accesos/hooks/useFetchAccesos";
import type { ResponseGetAllColaboradores } from "../../../types/accesos.type";

interface ModalSelectEmpleadoProps {
  setShowModal: (value: boolean) => void;
  onSelect: (idSelect: number) => void;
  objectSelected?: (acceso: ResponseGetAllColaboradores) => void;
  selectedId?: number;
}

export default function ModalSelectEmpleado({
  setShowModal,
	onSelect,
	selectedId = 0,
  objectSelected,
}: ModalSelectEmpleadoProps) {
	const {
		accesos,
		isLoading: cargandoAccesos,
		isError: errorAccesos,
		execute: recargarAccesos,
		setPagina,
		infoPaginacion,
	} = useFetchAccesos();

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex justify-center items-center">
      <div className="bg-gray-900 rounded-lg p-6 max-w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-row items-center gap-2">
            <User className="w-8 h-8 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Seleccionar Responsable</h3>
            {accesos.find((acceso) => acceso.idacceso === selectedId)?.estado === false && (
              <p className="text-sm text-red-400">No puedes seleccionar un responsable inactivo.</p>
            )}
          </div>
          
          <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* List of accesses (staggered items) */}
        <ContentSectionProcess 
          fetchData={() => recargarAccesos(infoPaginacion.pagina_actual)}
          isError={errorAccesos}
          isLoading={cargandoAccesos}
          textButtonError="Reintentar"
          textError="Error al cargar los datos"
        > 
          <ButtonsPagination
            total_paginas={infoPaginacion.total_paginas}
            pivote={infoPaginacion.pagina_actual}
            fetchData={setPagina}
            datos_por_pagina={infoPaginacion.datos_por_pagina}
            total_data={infoPaginacion.total_data}
          />
          <div className="flex flex-col gap-2">
            { accesos.map((acceso, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    onSelect(acceso.idacceso);
                    objectSelected && objectSelected(acceso);
                    setShowModal(false);
                  }}
                  className="w-full flex justify-between items-center gap-2 p-4 rounded-lg bg-gray-950 hover:bg-gray-900 transition-colors border border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-400"/>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">{acceso.nombres}</p>
                      <div className="flex flex-row gap-2">
                        <p className="text-xs text-gray-500">
                          <span className="font-bold text-gray-400">
                            DNI:
                          </span>
                          {" " + acceso.dniuser}
                        </p>
                        <p className="text-xs text-gray-500">
                          <span className="font-bold text-gray-400" >
                            ROL:
                          </span>
                          {" " + acceso.tipos}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={
                      `px-2 py-0.5 rounded-full text-xs font-semibold 
                        ${ 
                          acceso.estado ? 
                          "bg-green-500/10 text-green-400 border border-green-500/20" : 
                          "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`
                      }>
                      {acceso.estado ? "Activo" : "Inactivo"}
                    </span>
                    {selectedId === acceso.idacceso && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white border border-blue-500 shadow-sm animate-scaleIn">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </ContentSectionProcess>
      </div>
    </div>
	);
}
