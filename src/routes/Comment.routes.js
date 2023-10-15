const Router = require('express')
const router = new Router()
const commentController = require('../controllers/Comment.controller');

router.get('/:articleId/comments', commentController.getAllComments)

router.get('/:articleId/comment/:id', commentController.getComment)
router.post('/:articleId/comment', commentController.createComment)

module.exports = router