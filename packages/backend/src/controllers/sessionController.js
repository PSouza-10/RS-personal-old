const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const sessionController = {
    async login(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send('Nenhum usuário encontrado')
        }

        const isEqual = await bcrypt.compare(password, user.password)

        const { _id, name, phoneNumber } = user

        if (!isEqual) {
            return res.status(401).send('Credenciais invalidas')
        } else {
            const requested = {
                token: await jwt.sign({ _id }, config.get('jwtSecret'), { expiresIn: '8 hours' }),
                name: name,
                email: email,
                phoneNumber: phoneNumber
            }
            return res.status(200).json(requested)
        }
    },
    async register(req, res) {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).send('Preencha todos os campos')
        }
        const userAlreadyExists = await User.findOne({ email })
        if (userAlreadyExists) {
            return res.status(400).send('Email já cadastrado')
        }

        const newUser = await User.create(req.body)

        const requested = {
            token: await jwt.sign({ _id: newUser._id }, config.get('jwtSecret'), { expiresIn: '8 hours' }),
            name: name,
            email: email,
            phoneNumber: phoneNumber
        }
        return res.status(201).json(requested)
    }

}

module.exports = sessionController