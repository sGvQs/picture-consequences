import { useStoreState } from '../../Context/StoreStateProvider';
import CanvasDraw from 'react-canvas-draw';
import React from 'react';
import { useWindowHeight } from '../../Hooks/useWindowHeight';
import { useWindowWidth } from '../../Hooks/useWindowWidth';
import {
  StyledCommentsWrap,
  StyledGameWrap,
  StyledHeaderWrap,
  StyledPlayerParagraph,
} from './styled';
import { Typography } from '../../Components/Common/Typography';
import { useRandomAnimal } from '../../Hooks/useRandomAnimal';
import { Delete } from '@styled-icons/fluentui-system-filled';
import { Send } from '@styled-icons/boxicons-solid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { SocketIOContext } from '../../Context/SocketIOProvider';
import { CircularTimer } from '../../Components/Common/Timer';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Game = () => {
  const navigate = useNavigate();
  const height = useWindowHeight();
  const width = useWindowWidth();
  const {
    sectionNum,
    clientLists,
    clientId,
    clientName,
    roomId,
    canvasData,
    timeLeft,
    animal,
    painterName,
    clientsMessages,
    isFinishedGame,
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
    sendTypedData,
  } = React.useContext(SocketIOContext);
  const canvasRef = React.useRef<CanvasDraw>(null);
  const [typedAnswer, setTypedAnswer] = React.useState<string | undefined>();

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
        clientName: clientName,
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
      handleClear();
    }
  }, [randomAnimal, animal, sectionNum]);

  React.useEffect(() => {
    if (!isFinishedGame) return;
    navigate(`/result/${roomId}`);
  }, [isFinishedGame]);

  const handleClear = () => {
    canvasRef.current?.clear();
    if (clientLists[sectionNum - 1] !== clientId) return;
    const request = {
      canvasData: canvasRef.current?.getSaveData(),
      roomId: roomId,
    };
    sendDrawingData(request);
  };

  const handleSend = () => {
    sendTypedData(typedAnswer);
    setTypedAnswer(undefined);
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
        <StyledHeaderWrap>
          <CircularTimer value={timeLeft} />
          <Typography text={animal} fontSize={30} isBold />
        </StyledHeaderWrap>
      )}
      {clientLists[sectionNum - 1] !== clientId && painterName && (
        <StyledHeaderWrap>
          <CircularTimer value={timeLeft} />
          <StyledPlayerParagraph>
            <Typography text={painterName} fontSize={30} isBold />
            <Typography text={'is drawing'} fontSize={20} />
          </StyledPlayerParagraph>
        </StyledHeaderWrap>
      )}
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
          {clientsMessages &&
            clientsMessages.map((item) => {
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
            onChange={(event) => {
              setTypedAnswer(event.target.value);
            }}
          />
          <Button
            variant="outlined"
            color={'inherit'}
            startIcon={<Send size={20} />}
            onClick={handleSend}
          >
            send
          </Button>
        </Stack>
      )}
    </StyledGameWrap>
  );
};
