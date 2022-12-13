const { Router } = require("express");
const router = Router()
const categoriesController = require('./../Controllers/CategoriesController');


router.get('/', categoriesController.getCategories)

router.post('/', categoriesController.postCategories)

module.exports = router;