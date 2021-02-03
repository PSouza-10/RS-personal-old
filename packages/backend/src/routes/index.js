const router = require('express').Router()
const contentRoutes = require('./contentRoutes')
const userRoutes = require('./userRoutes')
const adminRoutes = require('./adminRoutes')
const auth = require('../middleware/auth')
router.use('/workshop', auth, contentRoutes)
router.use('/account', userRoutes)
router.use('/admin', auth, adminRoutes)

module.exports = router
