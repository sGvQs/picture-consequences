import { useStoreState } from '../../Context/StoreStateProvider';
import React from 'react';
import { StyledRoom, StyledRoomId, StyledRoomWrap } from './styled';
import { Typography } from '../../Components/Common/Typography';
import { Lottie } from '../../Components/Common/Lottie';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { CopyButton } from '../../Components/Common/CopyButton';
import { SocketIOContext } from '../../Context/SocketIOProvider';

export const Room = () => {
  const { roomId, playersNum, isHost, clientLists } = useStoreState();

  const navigate = useNavigate();

  const { sendNotificateJoiningEvent, startGame } =
    React.useContext(SocketIOContext);

  React.useEffect(() => {
    sendNotificateJoiningEvent();
  }, []);

  React.useEffect(() => {
    if (clientLists) {
      navigate(`/game/${roomId}`);
    }
  }, [clientLists]);

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
                    startGame();
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
