import PageRouter from 'app/pages/PageRouter';
import { createBrowserHistory } from 'history';
import { useMemo } from 'react';
import { Router } from 'react-router-dom';
import GlobalStyle from './GrobalStyle';
import ThemeProvider from './ThemeProvider';
import Meta from './Meta';

export default function Pages() {
  const history = useMemo(createBrowserHistory, []);

  return (
    <>
      <Meta />
      <ThemeProvider>
        <GlobalStyle />
        <Router history={history}>
          {/* TODO: ヘッダーやフッターなどのメインのレイアウトをここに書く */}
          あいうえお
          <PageRouter />
        </Router>
      </ThemeProvider>
    </>
  );
}
