import { Suspense, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { routingMap } from './router';

export default function PageRouter() {
  const path = useLocation().pathname;
  const [props, Component] = useMemo(() => {
    for (const [, data] of Object.entries(routingMap)) {
      const props = data.match(path);
      if (props !== undefined) {
        return [props, data.component];
      }
    }
    return [undefined, undefined];
  }, [path]);

  if (props === undefined || Component === undefined) {
    throw new Error(
      'バグなどによってここに到達する可能性がある。ただ基本的にはここにはたどり着かない'
    );
  }

  return (
    <Suspense fallback={<div>読み込み中</div>}>
      <Component {...props} />
    </Suspense>
  );
}
