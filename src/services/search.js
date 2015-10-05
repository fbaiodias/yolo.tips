import yolo from 'yolo-tips'
import Joi from 'joi'

const schema = Joi.alternatives().try(
  Joi.object({
    weeks: Joi.number().default(1).min(1).max(8),
    origin: Joi.string().required(),
    destination: Joi.string().default('EVERYWHERE'),
    max: Joi.number().default(100).valid([ 50, 100, 150, 200, 300, 500 ]),
    ignore: Joi.string(),
    currency: Joi.string()
  }),
  Joi.object({
    search: Joi.string().required()
  })
)

export default function (options, cb) {
  Joi.validate(options, schema, (err, value) => {
    if (err) {
      return cb(err)
    }
    console.log(value)
    yolo(value, cb)
  })
}
