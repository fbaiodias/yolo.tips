const startsWith = require('lodash.startswith')

module.exports = function onPreResponse (request, reply) {
  if (startsWith(request.path, '/api/') || request.response.statusCode === 200) {
    return reply.continue()
  }

  const distHost = process.env.NODE_ENV === 'production' ? '' : '//localhost:8080'

  const ga = `
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-67757808-1', 'auto');
      ga('send', 'pageview');
    </script>`

  const mailchimp = `
    <link href="//cdn-images.mailchimp.com/embedcode/classic-081711.css" rel="stylesheet" type="text/css">
    <style type="text/css">
      #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
      /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
         We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
    </style>
  `

  const HTML = `
    <!DOCTYPE html>
    <head>
      <meta charset="utf-8">
      <title>YOLO.tips - Just go!</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="/favicon.ico" type="image/x-icon" rel="shortcut icon">
      <meta name="description" content="We suggest you weekend trips for you to go #YOLO!" />
      <meta property="og:title" content="YOLO.tips - Just go!" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://yolo.tips/" />
      <meta property="og:description" content="We suggest you weekend trips for you to go #YOLO!" />
      <meta property="og:image" content="https://raw.githubusercontent.com/xicombd/yolo.tips/master/static/logo.png" />
    </head>
    <body>
      <div id="root" />
      ${ga}
      <script src="${distHost}/bundle.js"></script>
      ${mailchimp}
    </body>
  `.replace(/^\s+/gm, '')

  reply(HTML)
}
