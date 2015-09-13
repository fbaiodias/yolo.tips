const startsWith = require('lodash.startswith')

module.exports = function onPreResponse (request, reply) {
  if (startsWith(request.path, '/api/') || request.response.statusCode === 200) {
    return reply.continue()
  }

  const distHost = process.env.NODE_ENV === 'production' ? '' : '//localhost:8080'

  const HTML = `
    <!DOCTYPE html>
    <meta charset="utf-8">
    <title>yolo.tips</title>
    <body>
    <div id="root" />
    <script src="${distHost}/bundle.js"></script>
  `.replace(/^\s+/gm, '')

  reply(HTML)
}
