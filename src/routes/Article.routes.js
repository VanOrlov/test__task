const Router = require('express')
const router = new Router()
const articleController = require('../controllers/Artilce.controller');

router.get('/articles', articleController.getAllArticles)

router.get('/article/:id', articleController.getAtricleId)
router.post('/article', articleController.createArticle)

module.exports = router