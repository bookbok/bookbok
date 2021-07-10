import { lazy, Suspense, useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import {
  PageTypes,
  TopPageProps,
  AboutPageProps,
  EntitiesPageProps,
  EntityPageProps,
} from './types';

const About = lazy(() => import('./about'));
const Entities = lazy(() => import('./entities'));
const Entity = lazy(() => import('./entity'));
const Top = lazy(() => import('./top'));

export function PageRouter() {
  const path = useLocation().pathname;
  const pageProps = useMemo(() => calcPageProps(path), [path]);

  return (
    <Suspense fallback={<div>読み込み中</div>}>
      {pageProps?.pageType === PageTypes.About ? (
        <About {...pageProps} />
      ) : pageProps?.pageType === PageTypes.Entities ? (
        <Entities {...pageProps} />
      ) : pageProps?.pageType === PageTypes.Entity ? (
        <Entity {...pageProps} />
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

function calcPageProps(
  path: string
): AboutPageProps | EntitiesPageProps | EntityPageProps | TopPageProps | undefined {
  {
    const match = matchPath(path, {
      path: '/about',
      exact: true,
    });
    if (match !== null) {
      return { pageType: PageTypes.About };
    }
  }
  {
    const match = matchPath<{ id: string }>(path, {
      path: '/entities/:id([1-9][0-9]*)',
      exact: true,
    });
    if (match !== null) {
      return {
        pageType: PageTypes.Entity,
        id: parseInt(match.params.id, 10),
      };
    }
  }
  {
    const match = matchPath(path, {
      path: '/entities',
      exact: true,
    });
    if (match !== null) {
      return { pageType: PageTypes.Entities };
    }
  }
  {
    const match = matchPath(path, {
      path: '/',
      exact: true,
    });
    if (match !== null) {
      return { pageType: PageTypes.Top };
    }
  }
  return undefined;
}
