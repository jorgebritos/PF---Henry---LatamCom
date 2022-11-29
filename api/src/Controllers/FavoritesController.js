const { User, Product } = require("../db.js");

const postFavorite = async (req, res) => {
    let { idUser, idProduct } = req.body;

    let user = await User.findOne({
        where: { id: idUser }
    })

    let product = await Product.findOne({
        where: { id: idProduct }
    })
    console.log(user.firstname)
    console.log(product.name)
    await user.addFavorite(product)

    res.sendStatus(201);
}

module.exports = {
    postFavorite
}