const startsWith = require('lodash.startswith')

module.exports = function onPreResponse (request, reply) {
  if (startsWith(request.path, '/api/') || request.response.statusCode === 200) {
    return reply.continue()
  }

  const distHost = process.env.NODE_ENV === 'production' ? '' : '//localhost:8080'

  const HTML = `
    <!DOCTYPE html>
    <head>
      <meta charset="utf-8">
      <title>yolo.tips</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="/favicon.ico" type="image/x-icon" rel="shortcut icon">
      <meta name="description" content="Cheap Flight Suggester, that suggests you weekend trips based on the cheapest deals it finds using SkyScanner." />
    </head>
    <body>
      <a href="https://github.com/xicombd/yolo.tips" target="_blank">
        <img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png">
      </a>
      <div id="root" />
      <script src="${distHost}/bundle.js"></script>
    </body>
  `.replace(/^\s+/gm, '')

  reply(HTML)
}
