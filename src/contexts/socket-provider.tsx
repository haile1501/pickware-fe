import { createContext } from 'react';
import { Socket, io } from 'socket.io-client';

export const WebsocketContext = createContext<Socket | undefined>(undefined);

interface WebsocketProviderProps {
  children: React.ReactNode;
}

export function WebsocketProvider({ children }: WebsocketProviderProps) {
  const socket = io('http://localhost:4000');

  return <WebsocketContext.Provider value={socket}>{children}</WebsocketContext.Provider>;
}
