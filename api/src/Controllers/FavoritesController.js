const { User, Product } = require("../db.js");

const getComment = async (req, res) => {

	let id = req.params.id
	let commentTable = await Comment.findAll({
		include: [
			{
				model: User,
				attributes: ["username"],
				through: {
					attributes: []
				}
			},
			{
				model: Product,
				attributes: ["id", "name"],
				through: {
					attributes: []
				}
			}],
		order: [
			['id', 'ASC']
		]
	})

	res.send(commentTable);
}

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

const removeFavorite = async (req, res) => {
	const { product, id  } = req.params;
	try {
		const user = await User.findOne({
			where: {
				id: product
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
		if (!user) return 0;
		let newFav = user.favorites.filter((f) => f.id != id)
		let removed = user.favorites.filter((f) => f.id === Number(id))

		await user.removeFavorites(removed);

		return res.send(newFav);
	}
	catch (err) {
		return res.status(500).send(`Favorite could not be removed (${err})`);
	}
}

module.exports = {
	postFavorite,
	removeFavorite
}