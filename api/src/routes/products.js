const { Router } = require("express");
const router = Router();
const productsController = require('./../Controllers/ProuctController');

router.get('/', productsController.getProduct)

router.post('/', productsController.postProduct)

router.get('/:id', productsController.getProductByID)

router.put('/:id', productsController.putProduct)

module.exports = router