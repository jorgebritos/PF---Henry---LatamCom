const { Router } = require("express");
const commentController = require('./../Controllers/CommentController') 
const router = Router();


router.get('/:id', commentController.getComment)

router.post('/', commentController.postComment)

router.put('/', commentController.putComment)

router.delete('/:idUser/:idProduct', commentController.deleteComment)

module.exports = router