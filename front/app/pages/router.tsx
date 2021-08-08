import { unreachable } from 'app/utils';
import { lazy } from 'react';
import { matchPath } from 'react-router-dom';

/**
 * TODO:特定の条件（例: ログイン済み）のときのみ一致するルートの表現
 */
export const routingMap = {
  top: {
    match: (path: string) =>
      match(path, '/') !== null ? ({ pageType: 'top' } as const) : undefined,
    component: lazy(() => import('./top')),
  },
  about: {
    match: (path: string) =>
      match(path, '/about') !== null ? ({ pageType: 'about' } as const) : undefined,
    component: lazy(() => import('./about')),
  },
  entities: {
    match: (path: string) =>
      match(path, '/entities') !== null ? ({ pageType: 'entities' } as const) : undefined,
    component: lazy(() => import('./entities')),
  },
  entity: {
    match: (path: string) => {
      const m = match<{ id: string }>(path, '/entities/:id([1-9][0-9]*)');
      if (m !== null) {
        return {
          pageType: 'entity',
          id: parseInt(m.params.id, 10),
        } as const;
      }
      return undefined;
    },
    component: lazy(() => import('./entity')),
  },
};

export type PageType = keyof typeof routingMap;
export type PageProp = NonNullable<
  typeof routingMap extends { [type: string]: { match(path: string): infer U } } ? U : never
>;

/**
 * matchPathのラッパー。exactは基本的につけるので毎回書かなくてもいいように
 */
function match<T>(pathname: string, path: string) {
  return matchPath<T>(pathname, { path, exact: true });
}

export function reverseRoute(props: PageProp | Exclude<PageType, 'entity'>): string {
  if (typeof props === 'string') {
    return props === 'top'
      ? '/'
      : props === 'about'
      ? '/about'
      : props === 'entities'
      ? '/entities'
      : unreachable(props);
  }

  return props.pageType === 'top'
    ? '/'
    : props.pageType === 'about'
    ? '/about'
    : props.pageType === 'entities'
    ? '/entities'
    : props.pageType === 'entity'
    ? `/entities/${props.id}`
    : unreachable(props);
}
