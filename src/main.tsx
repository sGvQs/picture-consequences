import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './Pages/App';
import { StoreStateProvider } from './Context/StoreStateProvider';
import { SocketIOProvider } from './Context/SocketIOProvider';

ReactDOM.render(
  <StoreStateProvider>
    <SocketIOProvider>
      <App />
    </SocketIOProvider>
  </StoreStateProvider>,
  document.getElementById('root')
);
