import io from 'socket.io-client';
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
import { useStoreState } from '../../Context';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import { TitleText } from '../../Components/TitleText';

const endPoint =
  process.env.NODE_ENV === 'development'
    ? import.meta.env.VITE_LOCAL_URL
    : process.env.PRD_URL;

const socket = io(endPoint);

export const Introduction = () => {
  const { setRoomId, setIsHost } = useStoreState();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [rommNotFound, setRoomNotFound] = React.useState<boolean>(false);
  const [joinRoomId, setJoinRoomId] = React.useState<string>();
  const navigate = useNavigate();

  socket.on('created_roomId', (data) => {
    setRoomId(data);
    setIsHost(true);
    const id = data;
    socket.emit('join_room', id);
    navigate(`/roomId/${id}`);
  });

  socket.on('found_room', (data) => {
    socket.emit('join_room', data);
    navigate(`/roomId/${data}`);
  });

  socket.on('notFound_room', () => {
    setRoomId(undefined);
    setRoomNotFound(true);
  });

  const createNewRoom = () => {
    socket.emit('create_room');
  };

  const joinRoom = () => {
    setRoomId(joinRoomId);
    socket.emit('serch_room', joinRoomId);
    setRoomNotFound(false);
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
            onClick={() => joinRoom()}
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
