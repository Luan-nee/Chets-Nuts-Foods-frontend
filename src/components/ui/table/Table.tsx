import Table from "../../../components/ui/Table";
import ContentSectionProcess from "../../../components/layouts/ContentSectionProcess";
import ButtonsPagination from "../../../components/ui/ButtonsPagination";

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

    <div className="flex-1 overflow-auto">
      <div className="flex justify-end pb-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => void reload()}>
          Recargar
        </button>
      </div>

      { (dataPagination && changePage) && (
        <ButtonsPagination 
          total_paginas={dataPagination.total_paginas} 
          pivote={dataPagination.pagina_actual} 
          datos_por_pagina={dataPagination.datos_por_pagina} 
          total_data={dataPagination.total_data} 
          fetchData={changePage}
        />
      )}

      <Table tableHeader={tableHeader} cantidadDatos={cantidadDatos}>
        {children}
      </Table>
    </div>
    </ContentSectionProcess>
  );
}
