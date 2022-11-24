const axios = require("axios");
const { Op } = require("sequelize");
const { User } = require("../db.js");

const getUser = async (req, res) => {
	const { name } = req.query;
	let userTable = await User.findAll({
		order: [['id', 'ASC']],
	});
	if (userTable.length > 1) return res.send(userTable);

	if (userTable.length === 0) {
		try {
			let apiInfo = await axios.get(`https://fakestoreapi.com/users`);
			const users = apiInfo.data.map((u) => {
				return {
					firstname: u.name['firstname'],
					lastname: u.name['lastname'],
					email: u.email,
					username: u.username,
					password: u.password,
				};
			});
			await User.bulkCreate(users);

			userTable = await User.findAll({
				order: [['id', 'ASC']],
			});

			return res.send(userTable);
		} catch (error) {
			res.status(404).send(error);
		}
	} else {
		if (name) {
			const specificUser = await Product.findAll({
				where: {
					name: { [Op.iLike]: `%${name}%` },
				},
			});

			if (specificUser.length > 0) return res.status(200).send(specificUser);

			return res.status(404).send('No such User');
		}
	}
}

const getUserByID = async (req, res) => {
  const selectedUser = await User.findOne({
      where: {
          id: req.params.id
      }
  })
  if (selectedUser) {
      res.status(200).send(selectedUser)
  } else {
      res.sendStatus(404)
  }
}

const putUser = async (req, res) => {
  const selectedUser = await User.findOne({
      where: {
          id: req.params.id
      }
  });
  if (selectedUser) {
      let data = { ...req.body }

      let keys = Object.keys(data);

      keys.forEach(k => {
          selectedUser[k] = data[k]
      });

      await selectedUser.save()

      res.sendStatus(200)
  } else {
      res.sendStatus(404)
  }
}

const postUser = async (req, res) => {
	const {
		firstname,
		lastname,
		email,
		profile_image,
		username,
		password,
		admin,
	} = req.body;

	try {
		if (
			!firstname ||
			!lastname ||
			!email ||
			!profile_image ||
			!username ||
			!password
		) {
			return res.status(404).send('Missing parameters');
		}

		const newUser = await User.create({
			firstname,
			lastname,
			email,
			profile_image,
			username,
			password,
			admin,
		});

		return res.status(200).send(newUser);
	} catch (error) {
		console.log('Error en el post User', error);
	}
}

module.exports = {
  getUser,
  getUserByID,
  putUser,
  postUser
}