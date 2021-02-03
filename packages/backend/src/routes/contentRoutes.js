const router = require('express').Router()
const Controller = require('../controllers/Content')
const auth = require('../middleware/auth')

router.post('/', auth, Controller.create)
router.get('/', auth, Controller.retrieve)
router.put('/:contentId', auth, Controller.update)
router.delete('/:contentId', auth, Controller.delete)

module.exports = router
