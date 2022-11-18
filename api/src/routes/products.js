const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { Product, Category } = require("../db.js");
const router = Router();
const {
    API_KEY
} = process.env;


router.get('/', async (req, res) => {
    const { name } = req.query
    let productTable = await Product.findAll({
        include: {
            model: Category,
            attributes: ["name"],
            through: {
                    attributes: []
                }
            }
        })
        
        let categoryTable = await Category.findAll({});
        if (productTable.length === 0) {
            try {
                let apiInfo = await axios.get(`https://fakestoreapi.com/products`)
                const products = apiInfo.data.map(p => {
                    return {
                        id: p.id,
                        name: p.title,
                        description: p.description,
                        image: p.image,
                        price: p.price
                    }
                });
                await Product.bulkCreate(products)
                
                let info = apiInfo.data.map(p => {
                    return {
                        id: p.id,
                        name: p.title,
                        description: p.description,
                        image: p.image,
                        price: p.price,
                        category: p.category
                    }
                });

                productTable = await Product.findAll();
                
                
                for (let i = 0; i < info.length; i++) {
                    let product = info[i];
                    let data = await productTable.find(r => r.id == product.id);
                    let category = await categoryTable.find(c => c.name == product.category)
                    data.addCategory(category)
                }
            return res.send(products)
        } catch (error) {
            res.status(404).send(error)
        }
    } else {
        if (name) {
            const specificProduct = await Product.findAll({
                where: {
                    name: { [Op.iLike]: `%${name}%` }
                }
            })

            if (specificProduct.length > 0) return res.status(200).send(specificProduct);

            return res.status(404).send("No such Product");
        }
    }
    res.status(200).send(productTable);
})

router.get('/:id', async (req, res) => {
    const selectedProduct = await Product.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Category,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    if (selectedProduct) {
        res.status(200).send(selectedProduct)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router