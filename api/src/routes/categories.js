const { Router } = require("express");
const { Category, Product } = require("../db.js");
const router = Router()
const axios = require("axios");

router.post('/', async (req, res) => {
    try {
        const { id, name, image, summary, healthScore, steps, diets } = req.body
        if (!name || !summary || !healthScore || !steps || !diets) {
            return res.status(422).send("Missing data")
        }

        const newRecipe = await Product.create({
            id,
            name,
            image,
            summary,
            healthScore,
            steps
        })

        diets.forEach(async c => {
            const searchDiet = await Category.findOne({
                where: { name: c }
            })
            newRecipe.addDiet(searchDiet)
        });
        res.status(200)
    } catch (error) {
        res.sendStatus(404)
    }
})

router.get('/', async (req, res) => {
    let categoryTable = await Category.findAll()

    if (categoryTable.length > 0) return res.send(categoryTable)

    let apiInfo = axios.get(`https://fakestoreapi.com/products/categories`)
    apiInfo.then( info => info.data.map(c => { return { name: c } }))
        .then(async info => {
            Category.bulkCreate(info)
            categoryTable = await Category.findAll()
            res.send(categoryTable);
        })
        .catch(error => console.error('Inside error:', error))
})

module.exports = router;