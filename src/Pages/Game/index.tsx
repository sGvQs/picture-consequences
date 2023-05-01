import { useStoreState } from '../../Context/StoreStateProvider';
import CanvasDraw, { CanvasDrawProps } from 'react-canvas-draw';
import React from 'react';
import io from 'socket.io-client';
import { useWindowHeight } from '../../Hooks/useWindowHeight';
import { useWindowWidth } from '../../Hooks/useWindowWidth';

const endPoint =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://picture-consequences-backend.herokuapp.com/';

const socket = io(endPoint);

export const Game = () => {
  const height = useWindowHeight();
  const width = useWindowWidth();
  const { sectionNum, clientLists, clientId, setSectionNum, roomId } =
    useStoreState();
  const canvasRef = React.useRef<CanvasDraw>(null);

  console.log({
    sectionNum: sectionNum,
    clientLists: clientLists,
    clientId: clientId,
  });

  socket.on('drawing', (data) => {
    if (clientLists[sectionNum] === clientId) return;
    canvasRef.current?.loadSaveData(data, true);
  });

  socket.on('clear', () => {
    canvasRef.current?.clear();
  });

  socket.on('increment_section_num', () => {
    setSectionNum(sectionNum + 1);
  });

  const handleClear = () => {
    canvasRef.current?.clear();
    socket.emit('clear');
  };

  const handleDraw = () => {
    if (clientLists[sectionNum] !== clientId) return;
    console.log(roomId);
    socket.emit('drawing', [canvasRef.current?.getSaveData(), roomId]);
  };

  const handleDone = () => {
    setSectionNum(sectionNum + 1);
    socket.emit('increment_section_num');
  };

  return (
    <>
      <CanvasDraw
        ref={canvasRef}
        onChange={handleDraw}
        canvasHeight={height - 200}
        canvasWidth={width - 200}
        disabled={clientLists[sectionNum] !== clientId}
      />
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleDone}>done</button>
    </>
  );
};
