const { Router } = require("express");
const router = Router()
const categoriesController = require('./../Controllers/CategoriesController');


router.get('/', categoriesController.getCategories)

module.exports = router;