const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const errorTypes = require('../../errorTypes')
const { send } = require('../../utils/mail')
const AppError = require('../../utils/CreateError')
const confirmRegister = require('../../mails/confirmRegister')

const userController = {
  async login(req, res) {
    const { email, password } = req.body
    if (!email) {
      return res
        .status(400)
        .send(new AppError('MISSING_EMAIL', 'Insira o email'))
    } else if (!password) {
      return res
        .status(400)
        .send(new AppError('MISSING_PASSWORD', 'Insira a senha'))
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .send(
          new AppError(
            'NOT_FOUND_EMAIL',
            'Não foi encontrado um usuário com esse email'
          )
        )
    }

    const isEqual = await bcrypt.compare(password, user.password)

    const { _id } = user

    if (!isEqual) {
      return res
        .status(401)
        .send(
          new AppError(
            'CREDENTIALS_INCORRECT',
            'O email ou senha enviados estão incorretos'
          )
        )
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
    try {
      const { name, email, password } = req.body

      if (!name) {
        return res
          .status(400)
          .send(new AppError('MISSING_NAME', 'Insira o seu nome'))
      } else if (!email) {
        return res
          .status(400)
          .send(new AppError('MISSING_EMAIL', 'Insira o email'))
      } else if (!password) {
        return res
          .status(400)
          .send(new AppError('MISSING_PASSWORD', 'Insira a senha'))
      }

      const userAlreadyExists = await User.findOne({ email })
      if (userAlreadyExists) {
        return res
          .status(400)
          .send(
            new AppError(
              'USER_ALREADY_EXISTS',
              'O email enviado já foi cadastrado'
            )
          )
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
        subject: 'Confirmação de email',
        html: confirmRegister(name, token)
      })
      return res.status(201).send(resObject)
    } catch (e) {
      console.error(e)
      return res.status(500).send(errorTypes.SERVER_ERROR)
    }
  },
  async confirmEmail(req, res) {
    const { token } = req.params

    const userID = jwt.verify(token, config.get('JwtSecret'))
    const withConfirmed = await User.findByIdAndUpdate(
      userID,
      {
        emailConfirmed: true
      },
      { new: true }
    )
    if (!withConfirmed)
      return res
        .status(404)
        .send(
          new AppError(
            'USER_NOT_FOUND',
            'Não foi encontrado um usuário para processar a operação'
          )
        )

    return res.send('Email confirmado com sucesso')
  },
  async delete(req, res) {
    const deleted = await User.findByIdAndDelete(req.user._id)
    return res.send(deleted)
  }
}

module.exports = userController
