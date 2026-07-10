import { createContext, useContext, useState, type ReactNode } from 'react';
import type { EmitirGre } from '../types/gre.type';
import type { CreatePaquete } from '../types/paquete.type';
import type { ProductoEnPaquete, SalidaTransporteFormData } from '../types/constantes.type';

interface DataEmitirGre {
  emitir: EmitirGre;
  paquete: CreatePaquete;
  productosEnPaquete: ProductoEnPaquete[];
  salidaTransporte: SalidaTransporteFormData;
  idSalidaTransporte: number;
  idPaquete: number;
}

interface GreContextType {
  idSalidaTransporte: number | null;
  setIdSalidaTransporte: (id: number | null) => void;
  idPaquete: number | null;
  setIdPaquete: (id: number | null) => void;
  dataEmitirGre: DataEmitirGre;
  setDataEmitirGre: React.Dispatch<React.SetStateAction<DataEmitirGre>>;
}

const GreContext = createContext<GreContextType | undefined>(undefined);

interface GreProviderProps {
  children: ReactNode;
}

export const GreProvider = ({ children }: GreProviderProps) => {
  const [idSalidaTransporte, setIdSalidaTransporte] = useState<number | null>(null);
  const [idPaquete, setIdPaquete] = useState<number | null>(null);
  const [dataEmitirGre, setDataEmitirGre] = useState<DataEmitirGre>({
    emitir: {
      motivoTraslado: '',
      docDestinatario: '',
      modalidadTransporte: '',
      codigoTransporte: 0,
    },
    paquete: {
      clave: '',
      destino: 'sin definir',
      idSalidaTransporte: 0,
      idUsuario: 0,
      idUsuarioDestino: 0,
      montoCobrado: 0,
    },
    productosEnPaquete: [],
    salidaTransporte: {
      idChoferAcceso: 0,
      idOrigenEstablecimiento: 0,
      idDestinoEstablecimiento: 0,
      idVehiculo: 0,
      fechaSalida: '',
      horasalida: '',
    },
    idSalidaTransporte: 0,
    idPaquete: 0,
  });

  return (
    <GreContext.Provider
      value={{
        idSalidaTransporte,
        setIdSalidaTransporte,
        idPaquete,
        setIdPaquete,
        dataEmitirGre,
        setDataEmitirGre,
      }}
    >
      {children}
    </GreContext.Provider>
  );
};

export const useGreContext = (): GreContextType => {
  const context = useContext(GreContext);

  if (!context) {
    throw new Error('useGreContext debe ser utilizado dentro de un GreProvider');
  }

  return context;
};