'use strict'

let routes = []

routes = routes.concat(require('./search'))
routes = routes.concat(require('./static'))

module.exports = routes
