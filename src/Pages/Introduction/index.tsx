import { Lottie } from '../../Components/Common/Lottie';
import { Typography } from '../../Components/Common/Typography';
import { useNavigate } from 'react-router-dom';
import {
  StyledIntroductionWrap,
  StyledIntroduction,
  StyledJoinRoomWrap,
  StyledCreateNewRoomWrap,
  StyledJoinRoomModal,
} from './styled';
import { useStoreState } from '../../Context/StoreStateProvider';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import { TitleText } from '../../Components/TitleText';
import { SocketIOContext } from '../../Context/SocketIOProvider';

export const Introduction = () => {
  const { clientId, roomId } = useStoreState();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [rommNotFound, setRoomNotFound] = React.useState<boolean>(false);
  const [joinRoomId, setJoinRoomId] = React.useState<string>();
  const navigate = useNavigate();
  const { createNewRoom, joinRoom } = React.useContext(SocketIOContext);

  React.useEffect(() => {
    if (roomId && clientId) {
      navigate(`/roomId/${roomId}`);
    }
  }, [clientId, roomId]);

  const handleJoin = () => {
    setRoomNotFound(false);
    joinRoom(joinRoomId);
  };

  return (
    <StyledIntroductionWrap>
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
            <Typography text={'THERE IS NO ROOM'} fontSize={20} isBold={true} />
          )}
        </StyledJoinRoomModal>
      </Modal>
      <TitleText />
      <StyledIntroduction>
        <StyledCreateNewRoomWrap>
          <Typography text={'CREATE NEW ROOM'} fontSize={20} isBold={true} />
          <Lottie
            path={'/Lottie/earth-and-connections.json'}
            onClick={() => {
              createNewRoom();
            }}
          />
        </StyledCreateNewRoomWrap>
        <StyledJoinRoomWrap>
          <Typography text={'JOIN THE ROOM'} fontSize={20} isBold={true} />
          <Lottie
            path={'/Lottie/joinearth.json'}
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </StyledJoinRoomWrap>
      </StyledIntroduction>
    </StyledIntroductionWrap>
  );
};
