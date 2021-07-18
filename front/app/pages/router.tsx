import { unreachable } from 'app/utils';
import { matchPath } from 'react-router-dom';

const pageTypes = ['top', 'about', 'entities', 'entity'] as const;
export type PageType = typeof pageTypes[number];

export interface AboutPageProps {
  pageType: 'about';
}

export interface EntitiesPageProps {
  pageType: 'entities';
}

export interface EntityPageProps {
  pageType: 'entity';
  id: number;
}

export interface TopPageProps {
  pageType: 'top';
}

export type PageProps = TopPageProps | AboutPageProps | EntitiesPageProps | EntityPageProps;

/**
 * matchPathのラッパー。exactは基本的につけるので毎回書かなくてもいいように
 */
function match<T>(pathname: string, path: string) {
  return matchPath<T>(pathname, { path, exact: true });
}

/**
 * pathから表示するページのデータ（表示するページやクエリパラメータ、urlパラメータなど）を算出して返す。
 */
export function calcPageProps(path: string): PageProps | undefined {
  // router
  //   .match('/', { pageType: 'top' })
  //   .match('/about', { pageType: 'about' })
  // みたいな感じできれいに定義できるようにしたい
  // いい感じにするライブラリがなければ自分で作る
  {
    if (match(path, '/') !== null) {
      return { pageType: 'top' };
    }
  }
  {
    if (match(path, '/about') !== null) {
      return { pageType: 'about' };
    }
  }
  {
    if (match(path, '/entities') !== null) {
      return { pageType: 'entities' };
    }
  }
  {
    const m = match<{ id: string }>(path, '/entities/:id([1-9][0-9]*)');
    if (m !== null) {
      return {
        pageType: 'entity',
        id: parseInt(m.params.id, 10),
      };
    }
  }
  return undefined;
}

export function reverseRoute(props: PageProps | Exclude<PageType, 'entity'>): string {
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
