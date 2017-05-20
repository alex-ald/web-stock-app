import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router/lib/Router'
import match from 'react-router/lib/match'
import browserHistory from 'react-router/lib/browserHistory'
import { Provider } from 'react-redux'

import { configureStore } from '../common/store'

const initialState = {...window.INITIAL_STATE} || {}

// Set up Redux (note: this API requires redux@>=3.1.0):
const store = configureStore(initialState)

const container = document.getElementById('root')

const render = () => {
  const { pathname, search, hash } = window.location
  const location = `${pathname}${search}${hash}`

  // We need to have a root route for HMR to work.
  const routes = require('../common/routes').default

  // Pull child routes using match. Adjust Router for vanilla webpack HMR,
  // in development using a new key every time there is an edit.
  match({ routes, location }, () => {
    // Render app with Redux and router context to container element.
    // We need to have a random in development because of `match`'s dependency on
    // `routes.` Normally, we would want just one file from which we require `routes` from.
    ReactDOM.render(
      <Provider store={store}>
        <Router routes={routes} history={browserHistory} key={Math.random()} />
      </Provider>,
      container
    )
  })
}

const unsubscribeHistory = render()

if (module.hot) {
  module.hot.accept('../common/routes', () => {
    unsubscribeHistory()
    setTimeout(render)
  })
}
