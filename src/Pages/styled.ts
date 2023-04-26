import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body #root {
    width: 100vw;
    height: 100vh;
    background: #f0f0f0;
    overflow: hidden;
  }

`;
