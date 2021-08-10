import produce from 'immer';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface UiState {
  /** APIリクエストなどのユーザーの行動を阻害しないローディング処理が走っていることを示す */
  loadingStack: number;
  /** ページタイトルなどの情報。undefined になっているのは初期状態のみ */
  pageMeta: Required<PageMeta> | undefined;
  /** ページデータを読み込み中であることを示す。ページタイトルが「読み込み中」になる */
  pageLoading: boolean;
}

const initialState: UiState = {
  loadingStack: 0,
  pageMeta: undefined,
  pageLoading: false,
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

export const startPageLoading = actionCreator('startPageLoading');
export const finishPageLoading = actionCreator('finishPageLoading');

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
        // TODO: なんかいい感じに設定する
        ogType: meta.ogType ?? 'webpage',
        ogTitle: meta.ogTitle ?? meta.title,
        ogDescription: meta.ogDescription ?? meta.description,
        ogImage: meta.ogImage ?? 'http://example.com/example.png',
      };
    })
  )
  .case(startPageLoading, state =>
    produce(state, draft => {
      draft.pageLoading = true;
    })
  )
  .case(finishPageLoading, state =>
    produce(state, draft => {
      draft.pageLoading = false;
    })
  )
  .build();
