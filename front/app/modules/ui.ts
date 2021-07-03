import produce from 'immer';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface UiState {
  loadingStack: number;
  /** undefinedならなにも触らない。nullなら読み込み中 */
  pageMeta: Required<PageMeta> | null | undefined;
}

const initialState: UiState = {
  loadingStack: 0,
  pageMeta: undefined,
};

interface PageMeta {
  title: string;
  canonical: string;
  description: string;

  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

const actionCreator = actionCreatorFactory('ui');

export const startLoading = actionCreator('startLoading');
export const finishLoading = actionCreator('finishLoading');

export const setMeta = actionCreator<PageMeta>('setMeta');
export const setLoadingMeta = actionCreator('setLoadingMeta');

export const uiReducer = reducerWithInitialState(initialState)
  .case(startLoading, state =>
    produce(state, draft => {
      draft.loadingStack += 1;
    })
  )
  .case(finishLoading, state =>
    produce(state, draft => {
      draft.loadingStack -= 1;

      if (draft.loadingStack < 0) {
        console.error('ローディングスタックがマイナスになった');
        draft.loadingStack = 0;
      }
    })
  )
  .case(setMeta, (state, meta) =>
    produce(state, draft => {
      draft.pageMeta = {
        title: meta.title,
        canonical: meta.canonical,
        description: meta.description,
        ogType: meta.ogType ?? 'webpage',
        ogTitle: meta.ogTitle ?? meta.title,
        ogDescription: meta.ogDescription ?? meta.description,
        ogImage: meta.ogImage ?? 'http://example.com/example.png',
      };
    })
  )
  .case(setLoadingMeta, state =>
    produce(state, draft => {
      draft.pageMeta = null;
    })
  )
  .build();
