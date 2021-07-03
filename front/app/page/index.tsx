import { PageRouter } from 'app/pages';
import { useTheme } from 'app/theme';
import { createBrowserHistory } from 'history';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import Helmet from 'react-helmet';

export function Page() {
  const history = useMemo(createBrowserHistory, []);
  const theme = useTheme(false);
  const pageMeta = useSelector(state => state.ui.pageMeta);
  const [title, link, meta] = useMemo<
    [
      string | undefined,
      JSX.IntrinsicElements['link'][] | undefined,
      JSX.IntrinsicElements['meta'][] | undefined
    ]
  >(() => {
    if (pageMeta === undefined) {
      return [undefined, undefined, undefined];
    }
    if (pageMeta === null) {
      return ['読み込み中', undefined, undefined];
    }
    return [
      pageMeta.title,
      [{ rel: 'canonical', href: pageMeta.canonical }],
      [
        { name: 'description', content: pageMeta.description },
        { property: 'og:title', content: pageMeta.ogTitle },
        { property: 'og:type', content: pageMeta.ogType },
        { property: 'og:image', content: pageMeta.ogImage },
        { property: 'og:description', content: pageMeta.ogDescription },
      ],
    ];
  }, [pageMeta]);

  return (
    <>
      <Helmet title={title} link={link} meta={meta} />
      <ThemeProvider theme={theme}>
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
