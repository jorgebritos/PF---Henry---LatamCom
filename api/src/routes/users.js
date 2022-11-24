const { Router } = require("express");
const router = Router();
const usersController = require('./../Controllers/UsersController');

router.get('/', usersController.getUser);

router.get('/:id', usersController.getUserByID);

router.put('/:id', usersController.putUser);

router.post('/', usersController.postUser);

router.delete('/:id', usersController.deleteUser)

module.exports = router

