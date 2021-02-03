const LogController = require('../controllers/Logs')

class AppError {
  constructor(ERROR_ID, message, request = {}) {
    this._id = ERROR_ID
    this.msg = message

    if (request) {
      LogController.logError({
        ERROR_ID,
        request
      })
    }
  }
}

module.exports = AppError
