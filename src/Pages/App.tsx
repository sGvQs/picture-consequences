import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styled';
import { Introduction } from './Introduction';
import { Room } from './Room';
import { useStoreState } from '../Context';
import io from 'socket.io-client';
import { Game } from './Game';

const endPoint =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : process.env.PRD_URL;

const socket = io(endPoint);

export const App = () => {
  const { roomId, setPlayersNum } = useStoreState();

  socket.on('join_new_member', (data) => {
    setPlayersNum(data);
  });

  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Introduction />} />
          <Route path={`/roomId/${roomId}`} element={<Room />} />
          <Route path={`/game/${roomId}`} element={<Game />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
