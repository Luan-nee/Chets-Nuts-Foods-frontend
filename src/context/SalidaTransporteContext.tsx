import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ResponseGetAll } from '../types/salidaTransporte.type';
import { useFetchSalidasInicio } from '../features/gre/hooks/useFetchSalidasInicio';
import SalidaTransporteApi from '../api/SalidaTransporte.api';
import { useSocket } from './SocketContext';

interface SalidaTransporteContextType {
  salidaTransportes: ResponseGetAll[];
  isLoading: boolean;
  isError: boolean;
  refetchSalidas: () => Promise<void>;
  getSalidaDetails: (id: number) => Promise<any>;
  updateSalidaInList: (salida: ResponseGetAll) => void;
  addSalidaDetailsToCache: (id: number, details: any) => void;
}

const SalidaTransporteContext = createContext<SalidaTransporteContextType | undefined>(undefined);

export const SalidaTransporteProvider = ({ children }: { children: ReactNode }) => {
  const socket = useSocket();
  const {
    salidaTransportes: initialSalidas,
    isLoading,
    isError,
    execute: refetchSalidasApi
  } = useFetchSalidasInicio();

  const [salidaTransportes, setSalidaTransportes] = useState<ResponseGetAll[]>([]);
  const [detailsCache, setDetailsCache] = useState<Record<number, any>>({});

  useEffect(() => {
    setSalidaTransportes(initialSalidas);
  }, [initialSalidas]);

  const refetchSalidas = async () => {
    await refetchSalidasApi();
  };

  const addSalidaDetailsToCache = (id: number, details: any) => {
    setDetailsCache(prev => ({
      ...prev,
      [id]: details
    }));
    localStorage.setItem(`salida_detalle_${id}`, JSON.stringify(details));
  };

  const getSalidaDetails = async (id: number): Promise<any> => {
    if (detailsCache[id]) {
      return detailsCache[id];
    }

    const cached = localStorage.getItem(`salida_detalle_${id}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setDetailsCache(prev => ({ ...prev, [id]: parsed }));
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }

    try {
      const api = new SalidaTransporteApi();
      const response = await api.getByID<any>(id);
      if (response.status === "success" && response.data) {
        addSalidaDetailsToCache(id, response.data);
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  const updateSalidaInList = (salida: ResponseGetAll) => {
    setSalidaTransportes(prev => {
      const exists = prev.some(s => s.idsalidatransporte === salida.idsalidatransporte);
      if (exists) {
        return prev.map(s => s.idsalidatransporte === salida.idsalidatransporte ? salida : s);
      }
      return [...prev, salida];
    });
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewSalidaTransporte = (data: any) => {
      if (data && data.salidaTransporte) {
        const t = data.salidaTransporte;
        const listItem: ResponseGetAll = {
          idsalidatransporte: t.idsalidatransporte,
          estadotransporte: t.estadotransporte,
          fechasalida: t.fechasalida
        };
        updateSalidaInList(listItem);
        addSalidaDetailsToCache(t.idsalidatransporte, data);
      }
    };

    socket.on("server::newSalidaTransporte", handleNewSalidaTransporte);

    return () => {
      socket.off("server::newSalidaTransporte", handleNewSalidaTransporte);
    };
  }, [socket]);

  return (
    <SalidaTransporteContext.Provider
      value={{
        salidaTransportes,
        isLoading,
        isError,
        refetchSalidas,
        getSalidaDetails,
        updateSalidaInList,
        addSalidaDetailsToCache
      }}
    >
      {children}
    </SalidaTransporteContext.Provider>
  );
};

export const useSalidaTransporteContext = () => {
  const context = useContext(SalidaTransporteContext);
  if (!context) {
    throw new Error("useSalidaTransporteContext must be used within a SalidaTransporteProvider");
  }
  return context;
};
