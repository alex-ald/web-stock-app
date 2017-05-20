import React from 'react'
import { IndexRoute, Route } from 'react-router'

/* Containers */
import { App } from './containers'

/* Dashboard Views */
import { NotFound, Home } from './views'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='*' component={NotFound} />
  </Route>
)

export default routes
