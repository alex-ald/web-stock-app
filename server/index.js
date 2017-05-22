// imports associated to the server
import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import http from 'http'

// import socket.io for socket integration
import socketIO from 'socket.io'

// imports for development configurations
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../tools/webpack.client.dev'
import { compileDev, startDev } from '../tools/dx'

// imports for rendering server side React
import React from 'react'
import ReactDOM from 'react-dom/server'
import { createMemoryHistory, RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import Helm from 'react-helmet' // because we are already using helmet
import { configureStore } from '../common/store'
import reducer from '../common/createReducer'
import routes from '../common/routes'

import config from './config'
import db from '../database/models'
import scheduledJobs from './scheduledJobs'
import socketListener from './api/socketListener'

// define environment
const isProd = config.nodeEnv === 'production'
const isTest = config.nodeEnv === 'test'

// create the server object
const app = express()
const server = http.Server(app)

// create the socket.io object and pass it to socketListener function to separate socket functionality
export const io = socketIO(server)
socketListener(io)


// activate all scheduled jobs
scheduledJobs(db, io)

// define server configurations
let assets = null
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.set('view engine', 'ejs')

// define server configurations based on environment
if (isProd || isTest) {
  app.use(morgan('combined'))
  app.use(helmet())
  if (isProd) {
    assets = require('../assets.json')
  }
} else {
  app.use(morgan('dev'))
  const compiler = compileDev((webpack(webpackConfig)), config.port)
  app.use(webpackDevMiddleware(compiler, {
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }))
  app.use(webpackHotMiddleware(compiler, { log: console.log }))
}

// ensure the server is communicating with the server
db.sequelize.authenticate()
  .then((result) => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database: ');
    throw(err);
  })

// api routes for data requests
app.use('/api', require('./api'))

// global get request to allow react to decide the front-end result
app.get('*', (req, res) => {

  // configure redux store to initial state
  const store = configureStore({
    sourceRequest: {
      protocol: req.headers['x-forwarded-proto'] || req.protocol,
      host: req.headers.host
    }
  })
  const history = createMemoryHistory(req.originalUrl)

  match({ routes, history}, (err, redirectLocation, renderProps) => {
    // present error to the client if there is one
    if (err) {
      console.error(err)
      return res.status(500).send('Internal server error')
    }

    // present not found page if url is unknown
    if (!renderProps) {
      return res.status(404).send('Not found')
    }

    // obtain initial state of reducer(s)
    const initialState = store.getState()

    // obtain initial react view
    const InitialView = (
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    )

    // obtain html markup of react markup
    const data = ReactDOM.renderToString(InitialView)
    // obtain head information from helmet
    const head = Helm.rewind()

    // send client information
    res.status(200).render(
      'index',
      {
        title: head.title.toString(),
        metaData: head.meta.toString(),
        links: head.link.toString(),
        markup: data.html,
        initialState: JSON.stringify(initialState),
        vendorJs: (isProd ? assets.vendor.js : '/vendor.js' ),
        mainJs: (isProd ? assets.main.js : '/main.js'),
        socketIO: '/socket.io/socket.io.js'
      })
  })
})

// start server
server.listen(config.port, (err) => {
  if (config.nodeEnv === 'production' || config.nodeEnv === 'test') {
    if (err) console.log(err)
    console.log(`server ${config.id} listening on port ${config.port}`)
  } else {
    // open browser window
    startDev(config.port, err)
  }
})
