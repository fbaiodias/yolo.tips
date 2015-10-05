'use strict'

const Hapi = require('hapi')
const config = require('../config')
const routes = require('./routes')
const onPreResponse = require('./extensions/on-pre-response')

const server = new Hapi.Server()
server.connection(config)

server.register([
  { register: require('inert') }
], function (err) {
  if (err) {
    return console.error('==> 🔴  Error registering server plugins')
  }
  server.ext('onPreResponse', onPreResponse)
  server.route(routes)

  server.start((err) => {
    if (err) {
      return console.error('==> 🔴  Error starting server')
    }

    console.info('==> ✅  Server is listening')
    console.info('==> 🌎  Go to ' + server.info.uri.toLowerCase())
  })
})
