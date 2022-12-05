const { Router } = require("express");
const router = Router()
const favoritesController = require('./../Controllers/FavoritesController');

router.post('/', favoritesController.postFavorite)
router.delete('/:id', favoritesController.removeFavorite)

module.exports = router;