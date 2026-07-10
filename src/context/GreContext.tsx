import { createContext, useContext, useState, type ReactNode } from 'react';

interface GreContextType {
  idSalidaTransporte: number | null;
  setIdSalidaTransporte: (id: number | null) => void;
  idPaquete: number | null;
  setIdPaquete: (id: number | null) => void;
}

const GreContext = createContext<GreContextType | undefined>(undefined);

interface GreProviderProps {
  children: ReactNode;
}

export const GreProvider = ({ children }: GreProviderProps) => {
  const [idSalidaTransporte, setIdSalidaTransporte] = useState<number | null>(null);
  const [idPaquete, setIdPaquete] = useState<number | null>(null);

  return (
    <GreContext.Provider
      value={{
        idSalidaTransporte,
        setIdSalidaTransporte,
        idPaquete,
        setIdPaquete,
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