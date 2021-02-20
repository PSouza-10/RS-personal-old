const errorTypes = require('../errorTypes')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const permission = require('../utils/permissions')
async function auth(req, res, next) {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).send(errorTypes.INVALID_CREDENTIALS)
  }
  try {
    const decoded = jwt.verify(token, config.get('JwtSecret'))
    req.user = await User.findById(decoded, (err, user) => {
      console.log({
        err,
        user
      })
      if (err) throw err

      return user
    })

    if (!req.user) {
      return res.status(404).send(errorTypes.USER_NOT_FOUND)
    }

    const hasPermission = await permission.verify(req)

    if (hasPermission) {
      next()
    } else {
      return res.status(401).send(errorTypes.ACCESS_DENIED)
    }
  } catch (e) {
    console.error(e)
    return res.status(500).send(errorTypes.SERVER_ERROR)
  }

  return false
}

module.exports = auth
