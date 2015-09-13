'use strict'

const Boom = require('boom')
const goyolo = require('goyolo')

const search = function (options, cb) {
  goyolo(options, (err, results) => {
    if (err) {
      return cb(Boom.internal('error searching'))
    }

    console.log({ options: options, results: results }, 'got results')

    cb(results)
  })
}

module.exports = [
  { name: 'search', method: search }
]
