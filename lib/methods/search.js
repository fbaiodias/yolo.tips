'use strict'

const Boom = require('boom')
const yolo = require('yolo-tips')
const memoizee = require('memoizee')
const range = require('range').range
const async = require('async')

const MINUTE = 1000 * 60

const yoloJSON = (jsonDatas, cb) => {
  const datas = JSON.parse(jsonDatas)  // memoizee is better at memoizing strings
  yolo(datas, cb)
}

const yoloMemoizee = memoizee(yoloJSON, { async: true, maxAge: 30 * MINUTE, max: 2048 })

const yoloMemoized = (options, cb) => {
  async.mapSeries(
    range(options.weeks || 1),
    function fetchWeek (week, next) {
      const optionsCopy = JSON.parse(JSON.stringify(options))
      delete optionsCopy.weeks
      optionsCopy.specificNumberOfWeeksFromNow = week

      yoloMemoizee(JSON.stringify(optionsCopy), next)
    },
    function (err, results) {
      if (err) return cb(err)
      cb(null, results.reduce((accum, next) => accum.concat(next), []))
    }
  )
}

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
