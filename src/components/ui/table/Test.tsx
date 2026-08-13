import { useState, useEffect } from "react";
import Table from "./Table";

function useEtc() {
  const [pagina, setPagina] = useState<number>(1);

  const reload = () => {
    console.log("Recargando datos...", pagina);
  }

  useEffect(() => {
    reload();
  }, [pagina]);

  return {
    data: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" }
    ],
    isLoading: false,
    isError: false,
    message: "Error al cargar los datos.",
    reload: reload,
    pagination: {
      total_data: 100,
      datos_por_pagina: 10,
      pagina_actual: 1,
      total_paginas: 10
    },
    setPagina
  }
}

const tableHeader: string[] = [
  "columna 1",
  "columna 2",
  "columna 3",
  "columna 4",
  "columna 5",
  "columna 6",
  "columna 7",
];


const {
  data,
  isLoading,
  isError,
  reload,
  pagination,
  setPagina
} = useEtc();


export default function TestTable () {
  return (
    <Table
      dataIsError={isError}
      dataIsLoading={isLoading}
      dataPagination={pagination}
      reload={reload}
      changePage={setPagina}
      tableHeader={tableHeader}
      cantidadDatos={data.length}
    > 
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
      </tr>
    </Table>
  );
}