import memoizee from 'memoizee'
import yolo from 'yolo-tips'

const MINUTE = 1000 * 60
const jsonSearch = (jsonOptions, cb) => {
  const options = JSON.parse(jsonOptions)
  yolo(options, cb)
}

const search = memoizee(jsonSearch, { async: true, maxAge: 30 * MINUTE, max: 2048 })
export default function (options, cb) {
  search(JSON.stringify(options), (err, results) => {
    if (err) {
      return cb(err)
    }

    cb(null, results)
  })
}
