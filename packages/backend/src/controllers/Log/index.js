const LogModel = require('../../models/Log')

const controller = {
  async create(req, status) {
    await LogModel.create({
      request: {
        url: req.originalUrl,
        method: req.method,
        body: req.body
      },
      responseStatus: status,
      user: req.user
    })
  }
}

module.exports = controller
