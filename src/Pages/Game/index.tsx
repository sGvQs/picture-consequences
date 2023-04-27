import { useStoreState } from '../../Context';
import CanvasDraw, { CanvasDrawProps } from 'react-canvas-draw';
import React from 'react';
import io from 'socket.io-client';
import { useWindowHeight } from '../../Hooks/useWindowHeight';
import { useWindowWidth } from '../../Hooks/useWindowWidth';

const endPoint =
  process.env.NODE_ENV === 'development'
    ? import.meta.env.VITE_LOCAL_URL
    : process.env.PRD_URL;

const socket = io(endPoint);

export const Game = () => {
  const height = useWindowHeight();
  const width = useWindowWidth();
  const { isHost } = useStoreState();
  const canvasRef = React.useRef<CanvasDraw>(null);

  socket.on('drawing', (data) => {
    if (isHost) return;
    canvasRef.current?.loadSaveData(data, true);
  });

  socket.on('clear', () => {
    canvasRef.current?.clear();
  });

  const handleClear = () => {
    canvasRef.current?.clear();
    socket.emit('clear');
  };

  const handleDraw = () => {
    if (!isHost) return;
    socket.emit('drawing', canvasRef.current?.getSaveData());
  };

  return (
    <>
      <CanvasDraw
        ref={canvasRef}
        onChange={handleDraw}
        canvasHeight={height - 200}
        canvasWidth={width - 200}
        disabled={!isHost}
      />
      <button onClick={handleClear}>Clear</button>
    </>
  );
};
