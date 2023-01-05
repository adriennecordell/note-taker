const router = require('express').Router()
const apiRoutes = require('./api.js')
const viewRoutes = require('./views.js')

router.use('/api', apiRoutes);
router.use(viewRoutes);

module.exports = router