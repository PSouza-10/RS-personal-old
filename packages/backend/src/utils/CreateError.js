class AppError {
  constructor(ERROR_ID, message) {
    this._id = ERROR_ID
    this.msg = message
  }
}

module.exports = AppError
