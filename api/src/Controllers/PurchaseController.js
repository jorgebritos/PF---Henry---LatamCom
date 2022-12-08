const { Purchase, User, Product } = require("../db.js");



const getPurchaseAll = async (req, res) => {

    let purchaseTable = await Purchase.findAll({
        include: [
            {
                model: User,
                attributes: ["username"],
                through: {
                    attributes: []
                }
            },
        ],

        order: [
            ['id', 'ASC']
        ]
    })

    res.send(purchaseTable);
}


const postPurchase = async (req, res) => {

    try {
        const { products, totalPrice, idUser } = req.body

        let realProducts = []

        for (let i = 0; i < products.length; i++) {
            let id = products[i];
            let product = await Product.findOne({
                where: { id: id }
            })
            realProducts.push(product)
        }

        const newPurchase = await Purchase.create({
            products: realProducts,
            totalPrice
        })
        const searchUser = await User.findOne({
            where: { id: idUser }
        })
        let id = newPurchase.id;

        if (searchUser) {
            await newPurchase.addUser(searchUser)
        } else {
            return res.send("Missing Id")
        }

        let purchaseTable = await Purchase.findAll({
            where: { id: id },
            include: [
                {
                    model: User,
                    attributes: ["id", "username"],
                    through: {
                        attributes: []
                    }
                },
            ],

            order: [
                ['id', 'ASC']
            ]
        })

        res.status(200).send(newPurchase)



    } catch (error) {
        res.sendStatus(404)
    }
}

const getPurchaseId = async (req, res) => {

    let { id } = req.params

    let purchaseTable = await Purchase.findAll({
        include: [
            {
                model: User,
                where: { id: id },
                attributes: ["username"],
                through: {
                    attributes: []
                }
            },
        ],

        order: [
            ['id', 'ASC']
        ]
    })

    res.send(purchaseTable);
}

module.exports = {
    getPurchaseAll,
    postPurchase,
    getPurchaseId
}