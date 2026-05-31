export interface ServerToClientEvents {
  receiveMessage: (message: { userId: string; text: string; timestamp: string }) => void;
}

export interface ClientToServerEvents {
  sendMessage: (data: { text: string; roomId: string }) => void;
}
