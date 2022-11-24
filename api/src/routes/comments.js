const { Router } = require("express");
const commentController = require('./../Controllers/CommentController') 
const router = Router();


router.get('/', commentController.getComment)

router.post('/', commentController.postComment)

router.put('/:id', commentController.putComment)

router.delete('/:id', commentController.deleteComment);

module.exports = router