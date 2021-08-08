import PageRouter from 'app/pages/PageRouter';
import { createBrowserHistory } from 'history';
import { useMemo } from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import GlobalStyle from './GrobalStyle';
import ThemeProvider from './ThemeProvider';

export default function Pages() {
  const history = useMemo(createBrowserHistory, []);
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
