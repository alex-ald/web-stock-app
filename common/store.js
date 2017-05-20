import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'
import createReducer from './createReducer'

const composeEnhancers = composeWithDevTools({})

export function configureStore (initialState) {
  let store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument({ axios }))
    )
  )

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./createReducer', () => store.replaceReducer(require('./createReducer').default))
    }
  }

  return store
}
