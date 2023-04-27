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
    : 'https://picture-consequences-backend.herokuapp.com/';

fetch('https://picture-consequences-backend.herokuapp.com/', {
  headers: {
    Origin: 'https://picture-consequences-app.vercel.app',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });

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
