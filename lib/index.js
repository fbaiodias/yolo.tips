'use strict'

const Hapi = require('hapi')
const config = require('../config')

const server = new Hapi.Server()
server.connection(config)

server.register([
  { register: require('inert') }
], function (err) {
  if (err) {
    return console.error('==> 🔴  Error registering server plugins')
  }
})

server.start(() => {
  console.info('==> ✅  Server is listening')
  console.info('==> 🌎  Go to ' + server.info.uri.toLowerCase())
})
