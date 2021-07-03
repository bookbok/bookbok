import produce from 'immer';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface UiState {
  loadingStack: number;
}

const initialState: UiState = {
  loadingStack: 0,
};

const actionCreator = actionCreatorFactory('ui');

export const startLoading = actionCreator('startLoading');
export const finishLoading = actionCreator('finishLoading');

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
  .build();
