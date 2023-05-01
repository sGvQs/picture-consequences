import React, { createContext } from 'react';
import io from 'socket.io-client';
import { useStoreState } from '../StoreStateProvider';

export const SocketIOContext = createContext(null);

const endPoint =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://picture-consequences-backend.herokuapp.com/';

const socket = io(endPoint);

export const SocketIOProvider = ({ children }) => {
  const {
    roomId,
    clientId,
    setRoomId,
    setIsHost,
    setClientId,
    setPlayersNum,
    setClientsLists,
  } = useStoreState();

  const createNewRoom = () => {
    socket.emit('create_room');
  };

  const sendNotificateJoiningEvent = () => {
    socket.emit('notificate_joining_event', {
      roomId: roomId,
      clientId: clientId,
    });
  };

  const startGame = () => {
    socket.emit('start_game', roomId);
  };

  const joinRoom = (typedRoomId) => {
    socket.emit('join_room', typedRoomId);
  };

  socket.on('created_room', (data) => {
    console.log(data);
    setRoomId(data.roomId);
    setClientId(data.clientId);
    setIsHost(true);
  });

  socket.on('joined_room', (data) => {
    if (roomId || clientId) return;
    setRoomId(data.roomId);
    setClientId(data.clientId);
  });

  socket.on('get_joining_event', (clientSize) => {
    setPlayersNum(clientSize);
  });

  socket.on('started_game', (clientsList) => {
    setClientsLists(clientsList);
  });

  return (
    <SocketIOContext.Provider
      value={{
        socket,
        createNewRoom,
        sendNotificateJoiningEvent,
        startGame,
        joinRoom,
      }}
    >
      {children}
    </SocketIOContext.Provider>
  );
};
