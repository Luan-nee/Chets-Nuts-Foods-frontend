import { createContext, useContext, useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { url_base_production } from '../config/url_base';
import { ClientToServerEvents, ServerToClientEvents } from '../types/socket.types';

// Tipamos el Socket con nuestras interfaces personalizadas
type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const SocketContext = createContext(
  io(
    url_base_production, 
    { autoConnect: false }
  )
);

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const socket: TypedSocket = useMemo(() => {
    return io(url_base_production, {
      autoConnect: false,
    });
  }, []);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{  }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket debe ser usado dentro de un SocketProvider');
  }
  return context.socket;
};