const Router = require('express')
const router = new Router()
const articleController = require('../controllers/Artilce.controller');

router.get('/articles', articleController.getAllArticles)

router.get('/article/:id', articleController.getAtricleId)
router.post('/article', articleController.createArticle)
router.patch('/article/:id', articleController.updateArticle)
router.delete('/article/:id', articleController.deleteArticle)

module.exports = router