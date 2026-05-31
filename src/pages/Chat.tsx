import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from '../context/SocketContext';

interface Message {
  userId: string;
  text: string;
  timestamp: string;
}

export const Chat: React.FC = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Escuchar el evento del servidor de manera segura y tipada
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    // Importante: Limpiar el listener cuando el componente se desmonte
    return () => {
      socket.off('receiveMessage');
    };
  }, [socket]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;

    const text = inputRef.current.value;

    // Emitir evento al servidor con tipado estricto
    socket.emit('sendMessage', {
      text,
      roomId: 'general-room'
    });

    inputRef.current.value = '';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Sala de Chat Real-Time</h2>
      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll', marginBottom: '10px', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.userId}:</strong> {msg.text} <em style={{ fontSize: '0.8rem' }}>({msg.timestamp})</em>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input ref={inputRef} type="text" placeholder="Escribe un mensaje..." />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};