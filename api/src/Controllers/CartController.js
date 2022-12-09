const { User, Product } = require("../db.js");

const addToCart = async (req, res) => {
    let { idUser, idProduct } = req.body;

    let user = await User.findOne({
        where: { id: idUser }
    })
    
    let product = await Product.findOne({
        where: { id: idProduct }
    })
    
    await user.addCart(product)

    return res.send(201);
}

module.exports = {
    addToCart
}