const { User, Product } = require("../db.js");

const postFavorite = async (req, res) => {
    let { idUser, idProduct } = req.body;


    let user = await User.findOne({
        where: { id: idUser }
    })

    let product = await Product.findOne({
        where: { id: idProduct }
    })
    
    await user.addFavorites(product)


    user = await User.findOne({
		where: {
			id: idUser
		},
		include: {
			model: Product,
			as: "favorites",
			attributes: ["id", "name", "price", "image"],
			through: {
				attributes: []
			}
		}
	})
    res.send(user);
}

module.exports = {
    postFavorite
}