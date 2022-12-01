const { Router } = require("express");
const router = Router()
const CartController = require('../Controllers/CartController');

router.post('/', CartController.addToCart)

module.exports = router;