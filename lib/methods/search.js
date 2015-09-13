'use strict'

const Boom = require('boom')
const yolo = require('yolo-tips')

const search = function (options, cb) {
  yolo(options, (err, results) => {
    if (err) {
      return cb(Boom.internal('error searching'))
    }

    cb(results)
  })
}

module.exports = [
  { name: 'search', method: search }
]
