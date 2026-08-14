import Table from "../../../components/ui/Table";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";
import { RefreshCw } from "lucide-react";

interface PropTable {
  tableHeader: string[];
  dataIsLoading: boolean;
  dataIsError: boolean;
  dataPagination?: {
    total_data: number;
    datos_por_pagina: number;
    pagina_actual: number;
    total_paginas: number;
  };
  reload: () => void;
  children: React.ReactNode;
  cantidadDatos: number;
  changePage?: (newPage: number) => void;
}

export default function TableVehiculos({
  tableHeader,
  dataIsLoading,
  dataIsError,
  reload,
  dataPagination,
  children,
  cantidadDatos,
  changePage
}: PropTable) {

  return (
    <ContentSectionProcess 
      isLoading={dataIsLoading}
      isError={dataIsError}
      textError="Error al cargar los datos."
      textButtonError="Reintentar"
      fetchData={reload}
    >

    <div className="flex flex-col">
      { (dataPagination && changePage) ? (
        <ButtonsPagination 
          total_paginas={dataPagination.total_paginas} 
          pagina_actual={dataPagination.pagina_actual} 
          datos_por_pagina={dataPagination.datos_por_pagina} 
          total_data={dataPagination.total_data} 
          fetchData={changePage}
          reload={reload}
        />
      ) : (
        <div className="flex justify-end px-4">
          <div className="flex items-center gap-2 bg-gray-900 px-4 py-1 rounded-t-lg">
            <button
              className="
                bg-blue-600 hover:bg-blue-700
                flex flex-row items-center gap-2 p-2 rounded-lg transition-colors"
              onClick={() => reload()}
            >
              <span className="max-md:text-sm">Recargar</span>
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <Table tableHeader={tableHeader} cantidadDatos={cantidadDatos}>
        {children}
      </Table>
    </div>
    </ContentSectionProcess>
  );
}
