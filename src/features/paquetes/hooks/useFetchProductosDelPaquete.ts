import { useState, useEffect } from "react";
import PaqueteApi from "../../../api/Paquete.api";

interface FetchState {
  productos: any[];
  resumen: { totalPesoPaquete: number } | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
  execute: (idPaquete: number) => Promise<void>;
}

export const useFetchProductosDelPaquete = (idPaquete?: number | null): FetchState => {
  const paquete_api = new PaqueteApi();
  const [productos, setProductos] = useState<any[]>([]);
  const [resumen, setResumen] = useState<{ totalPesoPaquete: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const getProductos = async (id: number): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessage("");

      const response = await paquete_api.obtenerProductosDelPaquete(id);

      if (response.status === "success" && response.data) {
        setMessage("Productos obtenidos exitosamente");
        setProductos(response.data.productos ?? []);
        setResumen(response.data.resumen ?? { totalPesoPaquete: 0 });
      } else {
        setIsError(true);
        setMessage("Error al obtener los productos");
      }
    } catch (error: unknown) {
      setIsError(true);
      setMessage("Se produjo un error al obtener los productos del paquete en el frontend");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (idPaquete !== undefined && idPaquete !== null && idPaquete !== 0) {
      getProductos(idPaquete);
    }
  }, [idPaquete]);

  return {
    productos,
    resumen,
    isLoading,
    isError,
    message,
    execute: getProductos,
  };
};
