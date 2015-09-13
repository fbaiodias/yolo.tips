'use strict'

const routes = [{
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'dist',
      listing: false
    }
  }
}]

module.exports = routes
