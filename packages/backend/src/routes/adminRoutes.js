const router = require('express').Router()
const Controller = require('../controllers/Admin')

router.get('/', Controller.retrieve)
router.put('/', Controller.set)
router.delete('/:userId', Controller.deleteUser)

module.exports = router
