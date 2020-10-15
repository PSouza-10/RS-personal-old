const router = require('express').Router()
const productController = require('../controllers/productController')

router.get('/', productController.index)
router.post('/', productController.create)
router.put('/:_id', productController.edit)
router.delete('/:_id', productController.delete)

module.exports = router