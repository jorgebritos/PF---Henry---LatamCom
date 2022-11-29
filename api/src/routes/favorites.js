const { Router } = require("express");
const router = Router()
const favoritesController = require('./../Controllers/FavoritesController');

router.post('/', favoritesController.postFavorite)

module.exports = router;