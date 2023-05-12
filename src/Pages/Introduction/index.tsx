import { Lottie } from '../../Components/Common/Lottie';
import { Typography } from '../../Components/Common/Typography';
import { useNavigate } from 'react-router-dom';
import {
  StyledIntroductionWrap,
  StyledIntroduction,
  StyledJoinRoomWrap,
  StyledCreateNewRoomWrap,
  StyledJoinRoomModal,
  StyledNameModal,
} from './styled';
import { useStoreState } from '../../Context/StoreStateProvider';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import { TitleText } from '../../Components/TitleText';
import { SocketIOContext } from '../../Context/SocketIOProvider';
import { Snackbar } from '@mui/material';

export const Introduction = () => {
  const { clientId, roomId, clientName, setClientName } = useStoreState();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [rommNotFound, setRoomNotFound] = React.useState<boolean>(false);
  const [joinRoomId, setJoinRoomId] = React.useState<string>();
  const navigate = useNavigate();
  const { createNewRoom, joinRoom } = React.useContext(SocketIOContext);

  const [typedClientName, setTypedClientName] = React.useState<
    string | undefined
  >();

  React.useEffect(() => {
    if (roomId && clientId) {
      navigate(`/roomId/${roomId}`);
    }
  }, [clientId, roomId]);

  const handleJoin = () => {
    setRoomNotFound(false);
    joinRoom(joinRoomId);
    setRoomNotFound(true);
  };

  return (
    <StyledIntroductionWrap>
      <Snackbar
        open={!!clientName}
        message={`Hello ${clientName} :)`}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClick={() => setClientName(undefined)}
      />
      <Modal open={!clientName} onClose={() => {}}>
        <StyledNameModal>
          <Lottie
            path={'/Lottie/run.json'}
            onClick={() => {
              createNewRoom();
            }}
          />
          <TextField
            id="demo-helper-text-misaligned"
            label="ENTER YOUR NAME"
            onChange={(event) => {
              setTypedClientName(event.target.value);
            }}
          />
          <Button
            variant="outlined"
            disabled={typedClientName ? false : true}
            onClick={() => setClientName(typedClientName)}
          >
            SUBMIT
          </Button>
        </StyledNameModal>
      </Modal>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setRoomNotFound(false);
        }}
      >
        <StyledJoinRoomModal>
          <TextField
            id="demo-helper-text-misaligned"
            label="ROOM ID"
            onChange={(event) => {
              setJoinRoomId(event.target.value);
            }}
          />
          <Button
            variant="outlined"
            disabled={joinRoomId ? false : true}
            onClick={() => handleJoin()}
          >
            SUBMIT
          </Button>
          {rommNotFound && (
            <Typography
              text={'THERE IS NO ROOM'}
              fontSize={20}
              isBold
              isError
            />
          )}
        </StyledJoinRoomModal>
      </Modal>
      <TitleText />
      <StyledIntroduction>
        <StyledCreateNewRoomWrap>
          <Typography text={'CREATE NEW ROOM'} fontSize={20} isBold={true} />
          <Lottie
            path={'/Lottie/drawing.json'}
            onClick={() => {
              createNewRoom();
            }}
          />
        </StyledCreateNewRoomWrap>
        <StyledJoinRoomWrap>
          <Typography text={'JOIN THE ROOM'} fontSize={20} isBold={true} />
          <Lottie
            path={'/Lottie/connection.json'}
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </StyledJoinRoomWrap>
      </StyledIntroduction>
    </StyledIntroductionWrap>
  );
};
