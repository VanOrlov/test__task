const Router = require('express')
const router = new Router()
const analyticController = require('../controllers/analytic.controller');

router.get('/', analyticController.getCommentsAnalytics);

module.exports = router