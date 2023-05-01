import { useStoreState } from '../../Context/StoreStateProvider';
import CanvasDraw, { CanvasDrawProps } from 'react-canvas-draw';
import React from 'react';
import { useWindowHeight } from '../../Hooks/useWindowHeight';
import { useWindowWidth } from '../../Hooks/useWindowWidth';
import { StyledGameWrap } from './styled';
import { Typography } from '../../Components/Common/Typography';

export const Game = () => {
  const height = useWindowHeight();
  const width = useWindowWidth();
  const { sectionNum, clientLists, clientId, setSectionNum, roomId } =
    useStoreState();
  const canvasRef = React.useRef<CanvasDraw>(null);

  // socket.on('drawing', (data) => {
  //   if (clientLists[sectionNum] === clientId) return;
  //   canvasRef.current?.loadSaveData(data, true);
  // });

  // socket.on('clear', () => {
  //   canvasRef.current?.clear();
  // });

  // socket.on('increment_section_num', () => {
  //   setSectionNum(sectionNum + 1);
  // });

  // const handleClear = () => {
  //   canvasRef.current?.clear();
  //   socket.emit('clear');
  // };

  // const handleDraw = () => {
  //   if (clientLists[sectionNum] !== clientId) return;
  //   console.log(roomId);
  //   socket.emit('drawing', [canvasRef.current?.getSaveData(), roomId]);
  // };

  // const handleDone = () => {
  //   setSectionNum(sectionNum + 1);
  //   socket.emit('increment_section_num');
  // };

  return (
    <StyledGameWrap>
      <Typography
        text={
          clientLists[sectionNum] === clientId
            ? 'あなたのターンです'
            : '別の人が書いています'
        }
        fontSize={30}
        isBold
      />
      {clientLists[sectionNum] === clientId && (
        <Typography text={'りんご'} fontSize={30} isBold />
      )}
      <CanvasDraw
        ref={canvasRef}
        // onChange={handleDraw}
        canvasHeight={height - 300}
        canvasWidth={width - 500}
        disabled={clientLists[sectionNum] !== clientId}
      />
    </StyledGameWrap>
  );
};
