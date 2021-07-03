import { lazy, Suspense, useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { PageTypes, TopPageProps, AboutPageProps } from './types';

const About = lazy(() => import('./about'));
const Top = lazy(() => import('./top'));

export function PageRouter() {
  const path = useLocation().pathname;
  const pageProps = useMemo(() => calcPageProps(path), [path]);

  return (
    <Suspense fallback={<div>読み込み中</div>}>
      {pageProps?.pageType === PageTypes.About ? (
        <About {...pageProps} />
      ) : pageProps?.pageType === PageTypes.Top ? (
        <Top {...pageProps} />
      ) : (
        (() => {
          throw new Error('TODO: ここに到達することはないと思う');
        })()
      )}
    </Suspense>
  );
}

function calcPageProps(path: string): AboutPageProps | TopPageProps | undefined {
  {
    const match = matchPath(path, {
      path: '/about',
      exact: true,
    });
    if (match !== null) {
      return {
        pageType: PageTypes.About,
      };
    }
  }
  {
    const match = matchPath(path, {
      path: '/',
      exact: true,
    });
    if (match !== null) {
      return {
        pageType: PageTypes.Top,
      };
    }
  }
  return undefined;
}
