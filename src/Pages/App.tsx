import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styled';
import { Introduction } from './Introduction';
import { Room } from './Room';
import { useStoreState } from '../Context/StoreStateProvider';
import { Game } from './Game';
import React from 'react';

export const App = () => {
  const { roomId } = useStoreState();

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
