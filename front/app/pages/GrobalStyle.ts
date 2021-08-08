import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #app {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  html {
    font-size: clamp(8px, 62.5%, 14px);
    font-family: sans-serif;
  }

  body {
    min-width: 340px;
  }

  a {
  }

  #app {
    z-index: 0;
    position: relative;
  }
`;

export default GlobalStyle;
