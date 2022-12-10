const { Product, Category } = require("../db.js");
const { Op } = require("sequelize");

const getProduct = async (req, res) => {
    const { name } = req.query;
    let productTable = await Product.findAll({
        include: [{
            model: Category,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }],
        order: [
            ['id', 'ASC']
        ]
    });

    if (productTable.length > 1) res.send(productTable);

    let categoryTable = await Category.findAll({});
    if (categoryTable.length === 0) return res.send("Please Create Categories First");

    if (productTable.length === 0 && categoryTable.length > 1) {
        try {
            let products = require("../JSON/products.json");


            let Bulkproducts = products.map(p => {
                return {
                    name: p.title,
                    description: p.description,
                    image: p.image,
                    price: p.price,
                    brand: p.brand ? p.brand : null,
                    category: p.category,
                    stock: p.stock ? p.stock : 0
                };
            });

            await Product.bulkCreate(Bulkproducts);

            let info = products.map(p => {
                return {
                    id: p.id,
                    name: p.title,
                    description: p.description,
                    image: p.image,
                    price: p.price,
                    category: p.category
                };
            });


            productTable = await Product.findAll();


            for (let i = 0; i < info.length; i++) {
                let product = info[i];
                let data = await productTable.find(r => r.id == product.id);
                let category = await categoryTable.find(c => c.name == product.category.name);
                data.addCategory(category);
            };

            productTable = await Product.findAll({
                include: {
                    model: Category,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                },
                order: [
                    ['id', 'ASC']
                ]
            });

            return res.send(productTable);
        } catch (error) {
            res.status(404).send(error);
        };
    } else {
        if (name) {
            const specificProduct = await Product.findAll({
                where: {
                    name: { [Op.iLike]: `%${name}%` }
                }
            });

            if (specificProduct.length > 0) return res.status(200).send(specificProduct);

            return res.status(404).send("No such Product");
        };
    };
};

const putProduct = async (req, res) => {
    const selectedProduct = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (selectedProduct) {
        let data = { ...req.body };

        let keys = Object.keys(data);

        keys.forEach(k => {
            selectedProduct[k] = data[k];
        });

        await selectedProduct.save();
        res.status(200);
    } else {
        res.status(404);
    };
};

const getProductByID = async (req, res) => {
    const selectedProduct = await Product.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Category,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }]
    });
    if (selectedProduct) {
        res.status(200).send(selectedProduct);
    } else {
        res.sendStatus(404);
    };
};

const postProduct = async (req, res) => {
    let {
        name,
        description,
        image,
        price,
        stock,
        brand,
        categories

    } = req.body;

    let exists = await Product.findOne({
        where: { name: name }
    })

    if (exists) return res.status(406).send("El producto ya existe")

    let productCreate = await Product.create({
        name,
        description,
        image,
        price,
        stock,
        brand,
    });

    let categoryDB = await Category.findAll({
        where: { name: categories }
    });

    await productCreate.addCategory(categoryDB);
    res.status(201);
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!deletedProduct) return 0;
        await Product.destroy({ where: { id: id } });

        return res.status(200);
    }
    catch (err) {
        return res.status(500).send(`Product could not be deleted (${err})`);
    }
};

module.exports = {
    getProduct,
    postProduct,
    getProductByID,
    putProduct,
    deleteProduct
};