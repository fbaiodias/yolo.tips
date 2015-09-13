const startsWith = require('lodash.startswith')

module.exports = function onPreResponse (request, reply) {
  if (startsWith(request.path, '/api/')) {
    return reply.continue()
  }

  const distHost = process.env.NODE_ENV === 'production' ? '' : '//localhost:8080'

  const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>yolo.tips</title>
      </head>
      <body>
        <div id="root" />
        <script type="application/javascript" src="${distHost}/bundle.js"></script>
      </body>
    </html>
  `

  reply(HTML)
}
