'use strict'

const Joi = require('joi')

let routes = []

routes.push({
  method: 'GET',
  path: '/api/search',
  config: {
    tags: ['api'],
    validate: {
      query: Joi.alternatives().try(
        Joi.object({
          weeks: Joi.number().default(2),
          origin: Joi.string().required(),
          destination: Joi.string().default('EVERYWHERE'),
          max: Joi.number().default(100),
          ignore: Joi.string(),
          currency: Joi.string()
        }),
        Joi.object({
          search: Joi.string().required()
        })
      )
    },
    pre: [
      { method: 'search(query)', assign: 'results' }
    ],
    handler: function (request, reply) {
      reply(request.pre.results)
    },
    description: 'Search for flights'
  }
})

module.exports = routes
