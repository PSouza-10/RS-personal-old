const router = require('express').Router()
const Controller = require('../controllers/User')
const auth = require('../middleware/auth')
router.post('/', Controller.login)
router.post('/register', Controller.register)
router.delete('/', auth, Controller.delete)

module.exports = router
