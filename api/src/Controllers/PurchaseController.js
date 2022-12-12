const { Purchase, User, Product } = require('../db.js');

const getPurchaseAll = async (req, res) => {
	let purchaseTable = await Purchase.findAll({
		include: [
			{
				model: User,
				attributes: ['id', 'username'],
				through: {
					attributes: [],
				},
			},
		],

		order: [['id', 'DESC']],
	});

	res.send(purchaseTable);
};

const postPurchase = async (req, res) => {
	try {
		const { products, totalPrice, idUser } = req.body.purchase;
		const { amounts } = req.body;

		let allData = [];

		for (let i = 0; i < products.length; i++) {
			let id = products[i];
			let product = await Product.findOne({
				where: { id: id },
				attributes: ['id', 'name', 'price', 'image', 'stock'],
				through: {
					attributes: [],
				},
			});
			product.stock -= Number(amounts[i]);
			await product.save();
			allData.push(product);
		}
		let newTry = [];
		for (let i = 0; i < allData.length; i++) {
			let product = allData[i];
			let { id, name, price, image } = product;
			let amount = amounts[i];
			let newObj = {
				id,
				name,
				price,
				image,
				amount,
			};
			newTry.push(newObj);
		}
		const newPurchase = await Purchase.create({
			products: newTry,
			totalPrice,
		});
		const searchUser = await User.findOne({
			where: { id: idUser },
		});
		if (searchUser) {
			await newPurchase.addUser(searchUser);
		} else {
			return res.send('Missing Id');
		}
		res.status(200).send(newPurchase);
	} catch (error) {
		res.sendStatus(404);
	}
};

const getPurchaseId = async (req, res) => {
	let { id } = req.params;

	let purchaseTable = await Purchase.findAll({
		include: [
			{
				model: User,
				where: { id: id },
				attributes: ['username'],
				through: {
					attributes: [],
				},
			},
		],

		order: [['id', 'DESC']],
	});

	res.send(purchaseTable);
};

module.exports = {
	getPurchaseAll,
	postPurchase,
	getPurchaseId,
};
