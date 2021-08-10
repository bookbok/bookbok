import { unreachable } from 'app/utils';
import { lazy } from 'react';
import { matchPath } from 'react-router-dom';

/**
 * TODO:特定の条件（例: ログイン済み）のときのみ一致するルートの表現
 *
 * - componentのimportの結果は必ずanyにする。さもないと各コンポーネントでPageProps等の型を使った時に循環参照になる
 */
export const routeConfig = {
  top: {
    match: (path: string) =>
      match(path, '/') !== null ? ({ pageType: 'top' } as const) : undefined,
    component: lazy(() => import('./top') as KNOW),
  },
  about: {
    match: (path: string) =>
      match(path, '/about') !== null ? ({ pageType: 'about' } as const) : undefined,
    component: lazy(() => import('./about') as KNOW),
  },
  entities: {
    match: (path: string) =>
      match(path, '/entities') !== null ? ({ pageType: 'entities' } as const) : undefined,
    component: lazy(() => import('./entities') as KNOW),
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
    component: lazy(() => import('./entity') as KNOW),
  },
} as const;

export type PageType = keyof typeof routeConfig;
export type PageProps<Type extends PageType = PageType> = NonNullable<
  ReturnType<typeof routeConfig[Type]['match']>
>;

/**
 * matchPathのラッパー。exactは基本的につけるので毎回書かなくてもいいように
 */
function match<T>(pathname: string, path: string) {
  return matchPath<T>(pathname, { path, exact: true });
}

export function makePath(_props: PageProps | Exclude<PageType, 'entity'>): string {
  const props: PageProps = typeof _props === 'string' ? { pageType: _props } : _props;
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
