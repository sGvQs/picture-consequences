import { useStoreState } from '../../Context/StoreStateProvider';
import CanvasDraw from 'react-canvas-draw';
import React from 'react';
import { useWindowHeight } from '../../Hooks/useWindowHeight';
import { useWindowWidth } from '../../Hooks/useWindowWidth';
import { StyledCommentsWrap, StyledGameWrap } from './styled';
import { Typography } from '../../Components/Common/Typography';
import { useRandomAnimal } from '../../Hooks/useRandomAnimal';
import { Delete } from '@styled-icons/fluentui-system-filled';
import { Send } from '@styled-icons/boxicons-solid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { SocketIOContext } from '../../Context/SocketIOProvider';
import { CircularTimer } from '../../Components/Common/Timer';
import { TextField } from '@mui/material';

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

  const mock = [
    {
      message: 'dog',
      name: '斉藤',
      isCorrect: false,
    },
    {
      message: 'dog',
      name: '斉藤',
      isCorrect: false,
    },
    {
      message: 'dog',
      name: '斉藤',
      isCorrect: false,
    },
    {
      message: 'dog',
      name: '斉藤',
      isCorrect: false,
    },
    {
      message: 'dog',
      name: '斉藤',
      isCorrect: false,
    },
    {
      message: 'dog',
      name: '斉藤',
      isCorrect: true,
    },
    {
      message: 'dog',
      name: '斉藤',
      isCorrect: false,
    },
  ];

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
    }, 1000);

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
      <Stack direction="row" spacing={2}>
        <CanvasDraw
          ref={canvasRef}
          style={{ borderRadius: '10px' }}
          onChange={handleDraw}
          canvasHeight={height - 300}
          canvasWidth={width - 500}
          disabled={clientLists[sectionNum - 1] !== clientId}
        />
        <StyledCommentsWrap>
          {mock.map((item) => {
            return (
              <div>
                <Typography
                  text={item.message}
                  fontSize={20}
                  isBold
                  isCorrect={item.isCorrect ? true : false}
                />
                <Typography
                  text={item.name}
                  fontSize={10}
                  isCorrect={item.isCorrect ? true : false}
                />
              </div>
            );
          })}
        </StyledCommentsWrap>
      </Stack>
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
      {clientLists[sectionNum - 1] !== clientId && (
        <Stack direction="row" spacing={0.2}>
          <TextField
            id="demo-helper-text-misaligned"
            label="Answer Here"
            onChange={() => {}}
          />
          <Button
            variant="outlined"
            color={'inherit'}
            startIcon={<Send size={20} />}
            onClick={handleClear}
          >
            send
          </Button>
        </Stack>
      )}
    </StyledGameWrap>
  );
};
