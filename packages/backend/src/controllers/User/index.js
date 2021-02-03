const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const errorTypes = require('../../errorTypes')
const { send } = require('../../utils/mail')
const confirmRegister = require('../../mails/confirmRegister')
const sessionController = {
  async login(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).send(errorTypes.USER_NOT_FOUND)
    }

    const isEqual = await bcrypt.compare(password, user.password)

    const { _id } = user

    if (!isEqual) {
      return res.status(401).send(errorTypes.INVALID_CREDENTIALS)
    } else {
      const token = await jwt.sign(_id.toString(), config.get('JwtSecret'))

      var resObject = {
        token,
        user
      }

      resObject.user.password = null
      return res.send(resObject)
    }
  },
  async register(req, res) {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).send('Preencha todos os campos')
    }
    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
      return res.status(400).send({
        _id: errorTypes.RESOURCE_ALREADY_EXISTS._id,
        msg: 'Já existe um usuário cadastrado com esse e-mail'
      })
    }

    const newUser = await User.create(req.body)
    const token = await jwt.sign(
      newUser._id.toString(),
      config.get('JwtSecret')
    )
    var resObject = {
      token,
      user: newUser
    }

    resObject.user.password = null
    send(email, {
      subject: 'Teste',
      html: confirmRegister(name, 'https://google.com')
    })
    return res.status(201).send(resObject)
  },
  async delete(req, res) {
    const deleted = await User.findByIdAndDelete(req.user._id)
    return res.send(deleted)
  }
}

module.exports = sessionController
