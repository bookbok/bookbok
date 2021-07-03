import { PageRouter } from 'app/pages';
import { useTheme } from 'app/theme';
import { createBrowserHistory } from 'history';
import { useMemo } from 'react';
import { Router } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';

export function Page() {
  const history = useMemo(createBrowserHistory, []);
  const theme = useTheme(false);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router history={history}>
        {/* TODO: ヘッダーやフッターなどのメインのレイアウトをここに書く */}
        あいうえお
        <PageRouter />
      </Router>
    </ThemeProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  ${reset}

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
    background-color: ${({ theme }) => theme.color.background.base};
    color: ${({ theme }) => theme.color.text.primary};
  }

  a {
    color: ${({ theme }) => theme.color.text.link};
  }

  #app {
    z-index: 0;
    position: relative;
  }
`;