const router = require('express').Router()
const sessionRoutes = require('./sessionRoutes')
const productRoutes = require('./productRoutes')

router.use('/user', sessionRoutes)
router.get('/', (req, res) => { return res.send("Ola Mundo") })
router.use('/product', productRoutes)
module.exports = router