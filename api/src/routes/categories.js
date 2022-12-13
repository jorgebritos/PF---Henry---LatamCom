const { Router } = require("express");
const router = Router()
const categoriesController = require('./../Controllers/CategoriesController');


router.get('/', categoriesController.getCategories)

router.post('/', categoriesController.postCategories)

router.delete('/:id', categoriesController.deleteCategory)

router.put('/:id', categoriesController.putCategory)

module.exports = router;