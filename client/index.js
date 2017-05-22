import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router/lib/Router'
import match from 'react-router/lib/match'
import browserHistory from 'react-router/lib/browserHistory'
import { Provider } from 'react-redux'

import { configureStore } from '../common/store'

const initialState = {...window.INITIAL_STATE} || {}

// Set up Redux
const store = configureStore(initialState)

// obtain container for React components
const container = document.getElementById('root')

const render = () => {
  const { pathname, search, hash } = window.location
  const location = `${pathname}${search}${hash}`

  // We need to have a root route for HMR to work.
  const routes = require('../common/routes').default

  // Renders the appropriate view from our routes and the requested location
  match({ routes, location }, () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router routes={routes} history={browserHistory} key={Math.random()} />
      </Provider>,
      container
    )
  })
}

const unsubscribeHistory = render()

// needed for hot loading on React routes
if (module.hot) {
  module.hot.accept('../common/routes', () => {
    unsubscribeHistory()
    setTimeout(render)
  })
}
