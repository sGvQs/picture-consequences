import { useStoreState } from '../../Context/StoreStateProvider';
import CanvasDraw from 'react-canvas-draw';
import React from 'react';
import { useWindowHeight } from '../../Hooks/useWindowHeight';
import { useWindowWidth } from '../../Hooks/useWindowWidth';
import { StyledGameWrap } from './styled';
import { Typography } from '../../Components/Common/Typography';
import { useRandomAnimal } from '../../Hooks/useRandomAnimal';
import { Delete } from '@styled-icons/fluentui-system-filled';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { SocketIOContext } from '../../Context/SocketIOProvider';
import { CircularTimer } from '../../Components/Common/Timer';

export const Game = () => {
  const height = useWindowHeight();
  const width = useWindowWidth();
  const {
    sectionNum,
    clientLists,
    clientId,
    roomId,
    canvasData,
    timeLeft,
    animal,
    setTimeLeft,
    setIsDone,
    setAnimal,
  } = useStoreState();

  const {
    sendDrawingData,
    sendTimeLeft,
    sendDoneDrawingEvent,
    sendDoneGameEvent,
    sendAnimal,
  } = React.useContext(SocketIOContext);
  const canvasRef = React.useRef<CanvasDraw>(null);

  // NOTE: 絵が描かれるときのイベント
  React.useEffect(() => {
    if (canvasData === null) {
      canvasRef.current?.clear();
    } else {
      canvasRef.current?.loadSaveData(canvasData, true);
    }
  }, [canvasData]);

  // NOTE: タイマーのイベント
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (clientLists[sectionNum - 1] !== clientId) return;
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 50);

    if (timeLeft === 0) {
      clearInterval(intervalId);
      if (clientLists[sectionNum - 1] === clientId) {
        sendDoneDrawingEvent();
        if (sectionNum === clientLists.length) {
          console.log('finished');
          sendDoneGameEvent();
        }
      }
    }

    if (clientLists[sectionNum - 1] === clientId) {
      const request = {
        time: timeLeft,
        roomId: roomId,
      };
      sendTimeLeft(request);
    }

    if (timeLeft === 50) {
      setIsDone(false);
    }

    return () => clearInterval(intervalId);
  }, [timeLeft, sectionNum]);

  const randomAnimal = useRandomAnimal();

  // NOTE: 答えのデータを保存する処理
  React.useEffect(() => {
    setAnimal(randomAnimal);
    if (animal && clientLists[sectionNum - 1] === clientId) {
      sendAnimal();
    }
  }, [randomAnimal, animal, sectionNum]);

  const handleClear = () => {
    canvasRef.current?.clear();
    if (clientLists[sectionNum - 1] !== clientId) return;
    const request = {
      canvasData: canvasRef.current?.getSaveData(),
      roomId: roomId,
    };
    sendDrawingData(request);
  };

  const handleDraw = () => {
    if (clientLists[sectionNum - 1] !== clientId) return;
    const request = {
      canvasData: canvasRef.current?.getSaveData(),
      roomId: roomId,
    };
    sendDrawingData(request);
  };

  return (
    <StyledGameWrap>
      {clientLists[sectionNum - 1] === clientId && (
        <Typography text={animal} fontSize={30} isBold />
      )}
      <CircularTimer value={timeLeft} />
      <CanvasDraw
        ref={canvasRef}
        style={{ borderRadius: '10px' }}
        onChange={handleDraw}
        canvasHeight={height - 300}
        canvasWidth={width - 500}
        disabled={clientLists[sectionNum - 1] !== clientId}
      />
      {clientLists[sectionNum - 1] === clientId && (
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color={'inherit'}
            startIcon={<Delete size={20} />}
            onClick={handleClear}
          >
            Clear
          </Button>
        </Stack>
      )}
    </StyledGameWrap>
  );
};
