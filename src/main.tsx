import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './Pages/App';
import { StoreStateProvider } from './Context/index';

ReactDOM.render(
  <StoreStateProvider>
    <App />
  </StoreStateProvider>,
  document.getElementById('root')
);
