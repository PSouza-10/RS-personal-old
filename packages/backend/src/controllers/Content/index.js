const ContentModel = require('../../models/Content')
const handleMongoError = require('../../utils/handleMongoError')
const permissions = require('../../utils/permissions')

const controller = {
  async create(req, res) {
    let newContent
    try {
      newContent = await ContentModel.create(req.body)
    } catch (e) {
      handleMongoError(e, res)
    }
    permissions.grant(req.user, newContent._id)
    return res.status(201).send(newContent)
  },
  async retrieve(req, res) {
    let requestedContent

    requestedContent = await ContentModel.find({
      _id: { $in: req.user.permissions.READ }
    })

    return res.send(requestedContent)
  },
  async update(req, res) {
    return false
  },
  async delete(req, res) {
    return false
  }
}

module.exports = controller
