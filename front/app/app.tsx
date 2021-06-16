import { lazy, StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'

// Dynamic Import の例（ページコンポーネントごとにこれをして分割する）
const A = lazy(() => import('./A'))
const B = lazy(() => import('./B'))

const App = () => (
  <div>
    <Suspense fallback={<div>待ってね</div>}>
      <div>
        <A />
        <B />
      </div>
    </Suspense>
  </div>
)

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('app')
)
