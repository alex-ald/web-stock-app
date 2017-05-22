import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'
import createReducer from './createReducer'

// Same as compose function in Redux but also allows for Redux Dev Tools in broswer for development
const composeEnhancers = composeWithDevTools({})

export function configureStore (initialState) {
  // create the Redux store
  let store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(
      // add axios module into redux so can pass it to Redux actions and not import it
      applyMiddleware(thunk.withExtraArgument({ axios }))
    )
  )

  // needed for hot loading on Redux reducers
  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./createReducer', () => store.replaceReducer(require('./createReducer').default))
    }
  }

  return store
}
