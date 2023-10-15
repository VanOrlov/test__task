const Router = require('express')
const router = new Router()
const commentController = require('../controllers/Comment.controller');

router.get('/:articleId/comments', commentController.getAllComments)

router.post('/:articleId/comment', commentController.createComment)

module.exports = router