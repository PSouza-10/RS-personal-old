const User = require('../../models/User')
const errorTypes = require('../../errorTypes')

const adminController = {
  async retrieve(req, res) {
    const requestedUsers = await User.find({ _id: { $ne: req.user._id } })

    return res.send(requestedUsers)
  },
  async set(req, res) {
    const { _id, isAdmin, permissions } = req.body

    const updatedPermissions = await User.findByIdAndUpdate(
      _id,
      {
        isAdmin: isAdmin,
        permissions: {
          ...req.user.permissions,
          ADMIN: isAdmin ? permissions : []
        }
      },
      { new: true }
    )
    if (!updatedPermissions)
      return res.status(404).send(errorTypes.USER_NOT_FOUND)
    return res.send(updatedPermissions)
  },
  async deleteUser(req, res) {
    const { userId } = req.params

    const deleted = await User.findByIdAndDelete(userId)
    if (!deleted) return res.status(404).send(errorTypes.USER_NOT_FOUND)
    return res.send(deleted)
  }
}

module.exports = adminController
