const { Router } = require("express");
const router = Router();
const productsController = require('./../Controllers/ProductController');

router.get('/', productsController.getProduct)

router.post('/', productsController.postProduct)

router.get('/:id', productsController.getProductByID)

router.put('/:id', productsController.putProduct)

router.delete('/:id', productsController.deleteProduct)

module.exports = router