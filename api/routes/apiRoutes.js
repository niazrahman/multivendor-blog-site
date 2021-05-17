const router = require('express').Router()
const {isAuthenticated} = require('../../middleware/authMiddleware')

const {
    commentPostController,
    replyCommentPostController
} = require('../controllers/commentController')

router.post('/comments/:postId', isAuthenticated,commentPostController)

router.post('/comments/replies/:commentId', isAuthenticated,replyCommentPostController)


module.expports = router