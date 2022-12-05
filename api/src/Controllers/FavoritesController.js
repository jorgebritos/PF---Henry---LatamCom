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

const deleteComment = async (req, res) => {
	const { id } = req.params;
	const {idProduct} = req.body;
	try {
		const user = await User.findOne({
			where: {
				id: id
			}
		})
		if (!user) return 0;
		await User.removeFavorite({ where: { id: idProduct } });
		// await User.removeFavorites({ where: { id: idProduct } });

		return res.status(200).json("Favorite removed");
	}
	catch (err) {
		return res.status(500).send(`Favorite could not be removed (${err})`);
	}
}

module.exports = {
	postFavorite
}