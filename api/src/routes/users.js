const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { User } = require("../db.js");
const router = Router();
const {
    API_KEY
} = process.env;


router.get('/', async (req, res) => {
    const { name } = req.query
    let userTable = await User.findAll({})

    if (userTable.length === 0) {
        try {
            let apiInfo = await axios.get(`https://fakestoreapi.com/users`)
            const users = apiInfo.data.map(u => {
                return {
                    id: u.id,
                    firstname: u.name['firstname'],
                    lastname: u.name['lastname'],
                    email: u.email,
                    username: u.username,
                    password: u.password
                }
            });
            await User.bulkCreate(users)

            return res.send(users)
        } catch (error) {
            res.status(404).send(error)
        }
    } else {
        if (name) {
            const specificUser = await Product.findAll({
                where: {
                    name: { [Op.iLike]: `%${name}%` }
                }
            })

            if (specificUser.length > 0) return res.status(200).send(specificUser);

            return res.status(404).send("No such User");
        }
    }
    res.status(200).send(userTable);
})

router.get('/:id', async (req, res) => {
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
})

router.put('/:id', async (req, res) => {
    const selectedUser = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if(selectedUser) {
        let data = {...req.body}
        res.send(data)
        let cont = 0;
        for (const i in data) {
            if (Object.hasOwnProperty.call(data, i)) {
                let items = Object.keys(data);
                const element = data[i];
                let item = items[cont++];

                if(selectedUser[item] == data[item]) {
                    console.log("son iguales")
                } else {
                    console.log("son distintas")
                }
            }
        }
    } else {
        res.sendStatus(404)
    }
})
module.exports = router