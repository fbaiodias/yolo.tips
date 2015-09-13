'use strict'

let config = {
  port: process.env.YOLO_TIPS_PORT || 3000,
  host: process.env.YOLO_TIPS_HOST || 'localhost'
}

module.exports = config
