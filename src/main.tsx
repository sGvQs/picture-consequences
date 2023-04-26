import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './Pages/App';
import { StoreStateProvider } from './Context/index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreStateProvider>
    <App />
  </StoreStateProvider>
);
