const router = require('express').Router()
const sessionController = require('../controllers/sessionController')


router.post('/', sessionController.login)
router.post('/register', sessionController.register)

module.exports = router