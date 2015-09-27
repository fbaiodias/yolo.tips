'use strict'

const Boom = require('boom')
const yolo = require('yolo-tips')
const memoizee = require('memoizee')

const MINUTE = 1000 * 60

const yoloJSON = (jsonDatas, cb) => {
  const datas = JSON.parse(jsonDatas)
  yolo(datas, cb)
}

const yoloMemoized = memoizee(yoloJSON, { async: true, maxAge: 30 * MINUTE, max: 2048 })

const search = function (options, cb) {
  yoloMemoized(JSON.stringify(options), (err, results) => {
    if (err) {
      return cb(Boom.internal('error searching'))
    }

    cb(results)
  })
}

module.exports = [
  { name: 'search', method: search }
]
