const LogController = require('../controllers/Log')

function log(tokens, req, res) {
  const log = [
    tokens.status(req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    new Date().toLocaleTimeString()
  ]
  LogController.create(req, log[0])
  return log.join(' ')
}

module.exports = log
