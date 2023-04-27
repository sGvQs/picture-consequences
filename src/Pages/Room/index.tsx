import { useStoreState } from '../../Context';
import React from 'react';
import io from 'socket.io-client';
import { StyledRoom, StyledRoomId, StyledRoomWrap } from './styled';
import { Typography } from '../../Components/Common/Typography';
import { Lottie } from '../../Components/Common/Lottie';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { CopyButton } from '../../Components/Common/CopyButton';

const endPoint =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'http://picture-consequences-backend.com/';

const socket = io(endPoint);

export const Room = () => {
  const { roomId, playersNum, isHost } = useStoreState();

  const navigate = useNavigate();

  socket.on('started_game', () => {
    navigate(`/game/${roomId}`);
  });

  return (
    <StyledRoomWrap>
      <Badge badgeContent={playersNum} color="secondary">
        <StyledRoom>
          <>
            <Lottie path={'/Lottie/rocket-in-space.json'} onClick={() => {}} />
            {isHost ? (
              <>
                <Typography
                  text={'Please copy room ID'}
                  fontSize={16}
                  isBold={true}
                />
                {roomId && (
                  <>
                    <StyledRoomId>
                      <Typography text={roomId} fontSize={16} isBold={true} />
                      <CopyButton text={roomId} />
                    </StyledRoomId>
                  </>
                )}
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    socket.emit('start_game');
                  }}
                >
                  START
                </Button>
              </>
            ) : (
              <Typography
                text={'We are waiting untile host begins'}
                fontSize={16}
                isBold={true}
              />
            )}
          </>
        </StyledRoom>
      </Badge>
    </StyledRoomWrap>
  );
};
