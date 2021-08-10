import { State } from 'app/modules';
import { uiReducer } from 'app/modules/ui';
import Pages from 'app/pages';
import { useIsProduction } from 'app/utils';
import { StrictMode, useMemo } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, compose, createStore } from 'redux';

function App() {
  const isProduction = useIsProduction();
  const store = useMemo(() => {
    // TODO: API呼ばずとも初期値を取得する方法を定義する。（domにjsonを埋め込んでおくとか）
    const initialState = {};
    return createStore(
      combineReducers<State>({
        ui: uiReducer,
      }),
      initialState,
      (isProduction || !(window as KNOW).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? compose
        : (window as KNOW).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StrictMode>
      <Provider store={store}>
        <Pages />
      </Provider>
    </StrictMode>
  );
}

render(<App />, document.getElementById('app'));
