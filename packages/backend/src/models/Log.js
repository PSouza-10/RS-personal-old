const { Schema, model } = require('mongoose')

const LogSchema = new Schema(
  {
    request: {},
    responseStatus: String,
    user: {}
  },
  { timestamps: true, minimize: false }
)

module.exports = model('Log', LogSchema)
