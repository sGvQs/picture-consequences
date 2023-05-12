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
    sectionNum,
    isDone,
    animal,
    clientName,
    setRoomId,
    setIsHost,
    setClientId,
    setPlayersNum,
    setClientsLists,
    setCanvasData,
    setTimeLeft,
    setSectionNum,
    setIsDone,
    setPainterName,
    setClientsMessages,
    setIsFinishedGame,
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

  const sendDrawingData = (request) => {
    socket.emit('drawing', request);
  };

  const sendDoneDrawingEvent = () => {
    socket.emit('done_drawing', roomId);
  };

  const sendDoneGameEvent = () => {
    socket.emit('done_game', roomId);
  };

  const sendAnimal = () => {
    socket.emit('send_animal', animal);
  };

  const sendTimeLeft = (request) => {
    socket.emit('sending_time', request);
  };

  const sendTypedData = (clientAnswer) => {
    const request = {
      clientId: clientId,
      clientName: clientName,
      clientAnswer: clientAnswer,
      roomId: roomId,
    };
    socket.emit('sending_client_answer', request);
  };

  socket.on('created_room', (data) => {
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

  socket.on('not_found', (roomId) => {
    setRoomId(undefined);
    console.error({
      message: '404 error: room is not exist',
      status: 404,
      roomId,
    });
  });

  socket.on('drawing', (canvasData) => {
    setCanvasData(canvasData);
  });

  socket.on('getting_time', (response) => {
    setTimeLeft(response.time);
    setPainterName(response.clientName);
  });

  socket.on('done_drawing', () => {
    if (isDone) return;
    setIsDone(true);
    setSectionNum(sectionNum + 1);
    setTimeLeft(100);
  });

  socket.on('done_game', (point) => {
    console.log(point);
    setIsFinishedGame(true);
  });

  socket.on('recieving_clients_answers', (args) => {
    setClientsMessages(args);
  });

  return (
    <SocketIOContext.Provider
      value={{
        socket,
        createNewRoom,
        sendNotificateJoiningEvent,
        startGame,
        joinRoom,
        sendDrawingData,
        sendTimeLeft,
        sendDoneDrawingEvent,
        sendDoneGameEvent,
        sendAnimal,
        sendTypedData,
      }}
    >
      {children}
    </SocketIOContext.Provider>
  );
};
