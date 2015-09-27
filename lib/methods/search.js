'use strict'

const Boom = require('boom')
const yolo = require('yolo-tips')
const memoizee = require('memoizee')

const MINUTE = 1000 * 60

const yoloMemoized = memoizee(yolo, { async: true, primitive: true, maxAge: 30 * MINUTE, max: 2048 })

const search = function (options, cb) {
  yoloMemoized(options, (err, results) => {
    if (err) {
      return cb(Boom.internal('error searching'))
    }

    cb(results)
  })
}

module.exports = [
  { name: 'search', method: search }
]
