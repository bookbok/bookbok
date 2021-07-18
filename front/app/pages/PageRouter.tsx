import { lazy, Suspense, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { calcPageProps } from './router';

const About = lazy(() => import('./about'));
const Entities = lazy(() => import('./entities'));
const Entity = lazy(() => import('./entity'));
const Top = lazy(() => import('./top'));

export default function PageRouter() {
  const path = useLocation().pathname;
  const pageProps = useMemo(() => calcPageProps(path), [path]);

  return (
    <Suspense fallback={<div>読み込み中</div>}>
      {pageProps?.pageType === 'top' ? (
        <Top {...pageProps} />
      ) : pageProps?.pageType === 'about' ? (
        <About {...pageProps} />
      ) : pageProps?.pageType === 'entities' ? (
        <Entities {...pageProps} />
      ) : pageProps?.pageType === 'entity' ? (
        <Entity {...pageProps} />
      ) : (
        (() => {
          throw new Error(
            'バグなどによってここに到達する可能性がある。ただ基本的にはここにはたどり着かない'
          );
        })()
      )}
    </Suspense>
  );
}
